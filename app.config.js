module.exports = {
    apps : [{
      name        : "myapp-api",
      script      : "./backend/app.js",
      watch       : true,
      env: {
        "NODE_ENV": "development",
      },
      env_production : {
       "NODE_ENV": "production"
      }
    },
    {
      name       : "myapp-client",
      script     : "serve build",
      watch       : true,
      env: {
        "NODE_ENV": "development",
      },
      env_production : {
        "NODE_ENV": "production"
      }
    }]
}