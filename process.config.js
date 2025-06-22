module.exports={
    apps: [{
        name:"Pawfect",
        cwd:"./",
        script:"./dist/server.js",
        watch:false,
        env_production: {
            NODE_ENV:"production"
        },
        env_development: {
            NODE_ENV:"development"
        },
        // instance:"max",
        // exec_mode:"cluster"
    }]
}