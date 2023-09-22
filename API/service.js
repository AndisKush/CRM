const pkg = require('node-windows')
const {Service} = pkg;
const {path} = require('path');

const svc =  new Service({
    name: "Arasol-API",
    description: "Api for CRM",
    script: "api.js",
    execPath: path
})

svc.on('install', function(){
    svc.start()
})

svc.install()