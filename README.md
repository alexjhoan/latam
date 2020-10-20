#Pull in production

```
# Get new tags from remote
git fetch --tags

# Get latest tag name
latestTag=$(git describe --tags `git rev-list --tags --max-count=1`)

# Checkout latest tag
git checkout $latestTag

# Reload node workers
pm2 startOrGracefulReload pm2-production.config.js
```


#nginx.conf (with cache)

```
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    upstream nodejs_upstream {
        server 127.0.0.1:3000;
        keepalive 64;
    }

    sendfile            on;
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   65;
    types_hash_max_size 2048;

    #gzip  on;

     proxy_cache_path  /usr/local/data/nginx/cache  levels=1:2    keys_zone=STATIC:10m
     inactive=24h  max_size=1g;

server {
        listen       8080 default_server;
        listen       [::]:8080 default_server;
        server_name  _;

        # Load configuration files for the default server block.
    	set $bypass_cache 0;

    	if ($http_cookie ~ "sessionId") {
           set $bypass_cache   1;
        }


        location / {
	    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Real-IP $remote_addr;
    	proxy_set_header Host $http_host;

    	proxy_http_version 1.1;
    	proxy_set_header Upgrade $http_upgrade;
    	proxy_set_header Connection "upgrade";

    	proxy_pass http://nodejs_upstream/;
    	proxy_redirect off;
    	proxy_read_timeout 240s;



        #INTENTO DE CACHE

        add_header X-Cache-Status $upstream_cache_status; #https://www.nginx.com/blog/nginx-caching-guide/
        proxy_buffering        on;
        proxy_cache            STATIC;
        proxy_cache_bypass     $bypass_cache; #https://stackoverflow.com/questions/31694486/nginx-proxy-no-cache-and-proxy-cache-bypass/31724316
        proxy_no_cache         $bypass_cache; #https://stackoverflow.com/questions/31694486/nginx-proxy-no-cache-and-proxy-cache-bypass/31724316
        proxy_ignore_headers Set-Cookie Cache-Control Expires;
        proxy_cache_valid      200  1d;
        proxy_cache_use_stale  error timeout invalid_header updating
                               http_500 http_502 http_503 http_504;

        }
    }
}
```