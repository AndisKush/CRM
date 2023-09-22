//import pkg from'node-windows'
//const {Service} = pkg;
const Service = require('node-windows').Service


const svc =  new Service({
    name: "Arasol-APP",
    description: "APP CRM Arasol",
    script: "init.js"
})

svc.on('install', function(){
    svc.start()
})

svc.install()
