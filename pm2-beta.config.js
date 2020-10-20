module.exports = {
    apps : [{
        name      : "Frontend-Beta",
        script    : "server.js",
        watch     : false,
        increment_var : 'NODE_I',
        env: {
            "NODE_ENV": "beta",
            "PORT": 4000,
            "NODE_I": 1
        },
    }]
}