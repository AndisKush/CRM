const pkg = require('node-windows')
const {Service} = pkg;
const {path} = require('path');

const svc =  new Service({
    name: "Arasol-WPP",
    description: "Whatsapp API for CRM",
    script: "webapi.js",
    execPath: path
})

svc.on('install', function(){
    svc.start()
})

svc.install()