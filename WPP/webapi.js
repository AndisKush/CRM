(()=>{var e={487:(e,t,s)=>{const n=s(121),{Client:o,LocalAuth:r}=s(55),i=s(572),a=new o({authStrategy:new r,userDataDir:"./.wwebjs_auth/session"});let u,c=!1;async function l(e){if(!e||""===e)return null;let t=null,s="";return e&&null!==e&&""!==e&&(s=i(e.toString(),"BR")?.format("E.164")?.replace("+",""),s&&parseFloat(s.substr(2,2))>=28&&13===s.length&&(s=s.substr(0,4)+s.substr(5,8)),s&&(s=s&&s.includes("@c.us")?s:`${s}@c.us`)),null===t&&(t=s),t}async function d(e){return!!e&&new Promise(((t,s)=>{a.isRegisteredUser(e).then((e=>{t(!!e)})).catch((e=>{console.error(e),s(e)}))}))}a.on("qr",(e=>{n.toDataURL(e,(function(e,t){console.log("Aguardando leitura QRCode"),u=t}))})),a.on("ready",(()=>{console.log("Cliente pronto"),c=!0,u=null})),a.on("disconnected",(()=>{console.log("Aparelho Desconectado"),c=!1,a.initialize()})),e.exports={initialize:()=>{a.initialize()},sendText:async function(e,t,s){if(!e||""===e)return s({status:!1,msg:"Mensagem Vazia - Verifique as configurações"});if(!t||t?.length<=0)return s({status:!1,msg:"Sem Destino de Envio - Verifique as configurações"});for(let e=0;e<t.length;e++)t[e]=await l(t[e]);let n=0;for(const s of t)await new Promise((e=>{setTimeout(e,1e3)})),await d(s)?await a.sendMessage(s,e).catch((e=>{console.log("erro:"),console.log(e)})):n+=1;return s({status:!0,msg:"Enviado Mensagem"+(n>0?`, Erros: ${n}`:"")})},qrCode:()=>u,isConnected:()=>c}},582:e=>{"use strict";e.exports=require("cors")},860:e=>{"use strict";e.exports=require("express")},572:e=>{"use strict";e.exports=require("libphonenumber-js")},121:e=>{"use strict";e.exports=require("qrcode")},55:e=>{"use strict";e.exports=require("whatsapp-web.js")}},t={};function s(n){var o=t[n];if(void 0!==o)return o.exports;var r=t[n]={exports:{}};return e[n](r,r.exports,s),r.exports}(()=>{const e=s(860),t=s(582),n=s(487),o=e();o.use(t()),o.use(e.urlencoded({extended:!1,limit:"50mb"})),o.use(e.json({limit:"50mb"}));try{n.initialize()}catch(e){console.log(e)}o.get("/status",((e,t)=>t.status(200).json({qrcode:n.qrCode(),connected:n.isConnected()}))),o.post("/enviamensagem",(async(e,t)=>{const{mensagem:s,destino:o}=e.body;await n.sendText(s,o,(function(e){return t.status(200).json(e)}))})),o.listen(5002,(()=>{console.log(">>> WebApi started <<<")}))})()})();