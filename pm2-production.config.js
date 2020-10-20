module.exports = {
    apps : [{
        name      : "Frontend-Production",
        script    : "server.js",
        instances : "max",
        exec_mode : "cluster",
        watch     : false,
        increment_var : 'NODE_I',
        env: {
            "NODE_ENV": "production",
            "PORT": 5000,
            "NODE_I": 1
        },
    }]
}