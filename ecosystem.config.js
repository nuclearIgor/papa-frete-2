module.exports = {
  apps : [{
    name   : "app",
    script : "./server/dist/src/server.js",
    exec_mode: "cluster",
    instances: 5,

    listen_timeout: 8000,

    env_production: {
      NODE_ENV: "production"
    },
    env_development: {
      NODE_ENV: "development"
    }
  }]
}