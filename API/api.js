(()=>{var o={347:(o,r,s)=>{const t=s(185).model("Anexo",{pid:String,anexos:Array});o.exports=t},621:(o,r,s)=>{const t=s(185).model("Cliente",{nome:String,cpf:String,telefone:String});o.exports=t},130:(o,r,s)=>{const t=s(185).model("Fluxograma",{nome:String,etapas:Array});o.exports=t},203:(o,r,s)=>{const t=s(185).model("Inversor",{modelo:String,fabricante:String,sistemamonitoramento:String,garantia:Number,tensao:Number,potencia:Number,foto:String});o.exports=t},826:(o,r,s)=>{const t=s(185).model("Kit",{nome:String,modulo:Object,quantidademodulos:Number,potenciacc:Number,inversor:Object,quantidadeinversores:Number,potenciainversor:Number,disjuntorminino:Object,descontomaximo:Number,custogerador:Number,geracaomedia:Array,precovenda:Array});o.exports=t},294:(o,r,s)=>{const t=s(185).model("Modulo",{nome:String,modelo:String,potencia:Number,garantiafabrica:Number,garantiaeficiencia:Number,marca:String,peso:Number,foto:String});o.exports=t},473:(o,r,s)=>{const t=s(185).model("OrientacaoTelhado",{nome:String});o.exports=t},829:(o,r,s)=>{const t=s(185).model("PotenciaDisjuntor",{valor:Number});o.exports=t},969:(o,r,s)=>{const t=s(185).model("Produto",{nome:String});o.exports=t},214:(o,r,s)=>{const t=s(185).model("Proposta",{produto:Object,fluxo:Object,etapa:Object,cliente:Object,localinstalacao:Object,orientacaotelhado:Object,disjuntorcliente:Object,faturas:Array,mediaconsumo:Number,mediaconsumoabatida:Number,modulo:Object,kit:Object,valor:Number,data:Date,user:Object,origem:Object,finalizado:Object,valorprojeto:Number,datainstalacao:Date,quantidadepaineis:Number,dataagendamento:Date,atividades:Array,backlog:Array});o.exports=t},255:(o,r,s)=>{const t=s(185).model("TipoDisjuntor",{nome:String});o.exports=t},381:(o,r,s)=>{const t=s(185).model("Usuarios",{name:String,email:String,password:String,ativo:Boolean,primeiroLogin:Boolean});o.exports=t},96:o=>{"use strict";o.exports=require("bcrypt")},582:o=>{"use strict";o.exports=require("cors")},142:o=>{"use strict";o.exports=require("dotenv")},860:o=>{"use strict";o.exports=require("express")},344:o=>{"use strict";o.exports=require("jsonwebtoken")},185:o=>{"use strict";o.exports=require("mongoose")}},r={};function s(t){var e=r[t];if(void 0!==e)return e.exports;var a=r[t]={exports:{}};return o[t](a,a.exports,s),a.exports}(()=>{s(142).config();const o=s(860),r=s(185),t=s(582),e=s(344),a=(s(96),o());a.use(o.json({limit:"50mb"})),a.use(o.urlencoded({limit:"50mb",extended:!0})),a.use(t()),a.use(((o,r,s)=>{r.header("Access-Control-Allow-Origin","*"),r.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE"),r.header("Access-Control-Allow-Headers","Content-Type, Authorization"),s()}));const n=s(381),i=s(294),u=s(203),c=s(826),d=s(255),m=s(829),l=s(214),g=s(969),j=s(621),p=s(130),b=s(473),y=s(347);a.get("/",((o,r)=>{r.status(200).json({msg:"Bem vindo ao kushapi"})})),a.post("/auth/register",(async(o,r)=>{const{name:s,email:t,password:e,ativo:a,primeiroLogin:i}=o.body;if(!s)return r.status(422).json({msg:"O nome é obrigatorio"});if(!t)return r.status(422).json({msg:"O email é obrigatorio"});if(!e)return r.status(422).json({msg:"A senha é obrigatória"});if(await n.findOne({email:t}))return r.status(422).json({msg:"Email já cadastrado utilize outro email"});const u=new n({name:s,email:t,password:e,ativo:a,primeiroLogin:i});try{await u.save(),r.status(201).json({msg:"Usuario criado com sucesso"})}catch(o){console.log(o),r.status(500).json({msg:"Aconteceu um erro no servidor"})}})),a.post("/auth/login",(async(o,r)=>{const{email:s,password:t}=o.body;if(!s)return r.status(422).json({msg:"O email é obrigatorio"});if(!t)return r.status(422).json({msg:"A senha é obrigatoria"});const a=await n.findOne({email:s});if(!a)return r.status(404).json({msg:"Usuário não encontrado"});if(!a.ativo)return r.status(404).json({msg:"Usuário inativo"});if(a.primeirologin)return r.status(404).json({msg:"Usuário sem senha, marque a opção primeiro login para definir sua senha"});if(a.password!==t)return r.status(422).json({msg:"Senha inválida"});try{const o=process.env.SECRET,s=e.sign({id:a._id},o);r.status(200).json({msg:"Logado com sucesso",token:s,id:a._id})}catch(o){console.log(o),r.status(500).json({msg:"Aconteceu um erro no servidor"})}})),a.get("/user/:id",(function(o,r,s){const t=o.headers.authorization,a=t&&t.split(" ")[1];if(!a)return r.status(401).json({msg:"Acesso Negado"});try{const o=process.env.SECRET;e.verify(a,o),s()}catch(o){r.status(400).json({msg:"Token invalido"})}}),(async(o,r)=>{const s=o.params.id,t=await n.findById(s,"-password");return t?r.status(200).json({user:t}):r.status(404).json({msg:"Usuário não encontrado"})})),a.get("/modulos",(async(o,r)=>{try{const o=await i.find();return r.status(200).json({resultado:o})}catch(o){return console.error("Erro ao buscar módulos:",o),r.status(500).json({error:"Erro interno do servidor"})}})),a.post("/modulo",(async(o,r)=>{try{const s=o.body;if(s._id)return(await i.updateOne({_id:s._id},{$set:s})).acknowledged?r.status(200).json({msg:"Registro atualizado com sucesso"}):r.status(500).json({msg:"Erro ao atualizar o módulo"});{const o=new i(s);return await o.save(),r.status(200).json({msg:"Registro inserido com sucesso"})}}catch(o){return console.error("Erro ao inserir ou atualizar o módulo:",o),r.status(500).json({error:"Erro interno do servidor"})}})),a.get("/inversores",(async(o,r)=>{try{const o=await u.find();return r.status(200).json({resultado:o})}catch(o){return console.error("Erro ao buscar módulos:",o),r.status(500).json({error:"Erro interno do servidor"})}})),a.post("/inversor",(async(o,r)=>{try{const s=o.body;if(s._id)return(await u.updateOne({_id:s._id},{$set:s})).acknowledged?r.status(200).json({msg:"Registro atualizado com sucesso"}):r.status(500).json({msg:"Erro ao atualizar o registro"});{const o=new u(s);return await o.save(),r.status(200).json({msg:"Registro inserido com sucesso"})}}catch(o){return console.error("Erro ao inserir ou atualizar o registro:",o),r.status(500).json({error:"Erro interno do servidor"})}})),a.get("/kits",(async(o,r)=>{try{const o=await c.find();return r.status(200).json({resultado:o})}catch(o){return console.error("Erro ao buscar módulos:",o),r.status(500).json({error:"Erro interno do servidor"})}})),a.post("/kit",(async(o,r)=>{try{const s=o.body;if(s._id)return(await c.updateOne({_id:s._id},{$set:s})).acknowledged?r.status(200).json({msg:"Registro atualizado com sucesso"}):r.status(500).json({msg:"Erro ao atualizar o registro"});{const o=new c(s);return await o.save(),r.status(200).json({msg:"Registro inserido com sucesso"})}}catch(o){return console.error("Erro ao inserir ou atualizar o registro:",o),r.status(500).json({error:"Erro interno do servidor"})}})),a.get("/tipodisjuntores",(async(o,r)=>{try{const o=await d.find();return r.status(200).json({resultado:o})}catch(o){return console.error("Erro ao buscar módulos:",o),r.status(500).json({error:"Erro interno do servidor"})}})),a.get("/potenciadisjuntores",(async(o,r)=>{try{const o=await m.find();return r.status(200).json({resultado:o})}catch(o){return console.error("Erro ao buscar módulos:",o),r.status(500).json({error:"Erro interno do servidor"})}})),a.get("/propostas",(async(o,r)=>{try{const o=await l.find();return r.status(200).json({resultado:o})}catch(o){return console.error("Erro ao buscar módulos:",o),r.status(500).json({error:"Erro interno do servidor"})}})),a.post("/proposta",(async(o,r)=>{try{let s,t;if(o.body.dado2?(s=o.body.dado1,t=o.body.dado2):s=o.body,s._id)return(await l.updateOne({_id:s._id},{$set:s})).acknowledged?r.status(200).json({msg:"Registro atualizado com sucesso"}):r.status(500).json({msg:"Erro ao atualizar o registro"});{const o=new l(s),e=await o.save(),a=new y({...t,pid:e._id});return await a.save(),r.status(200).json({msg:"Registro inserido com sucesso"})}}catch(o){return console.error("Erro ao inserir ou atualizar o registro:",o),r.status(500).json({error:"Erro interno do servidor"})}})),a.get("/produtos",(async(o,r)=>{try{const o=await g.find();return r.status(200).json({resultado:o})}catch(o){return console.error("Erro ao buscar módulos:",o),r.status(500).json({error:"Erro interno do servidor"})}})),a.get("/clientes",(async(o,r)=>{try{const o=await j.find();return r.status(200).json({resultado:o})}catch(o){return console.error("Erro ao buscar módulos:",o),r.status(500).json({error:"Erro interno do servidor"})}})),a.post("/cliente",(async(o,r)=>{try{const s=o.body,t=await j.findOne({cpf:s.cpf});if(t&&(!s._id||t._id.toString()!==s._id))return r.status(400).json({msg:`CPF já está em uso para o cliente: ${t.nome}`});if(s._id)return(await j.updateOne({_id:s._id},{$set:s})).acknowledged?r.status(200).json({msg:"Registro atualizado com sucesso"}):r.status(500).json({msg:"Erro ao atualizar o registro"});{const o=new j(s);return await o.save(),r.status(200).json({msg:"Registro inserido com sucesso"})}}catch(o){return console.error("Erro ao inserir ou atualizar o registro:",o),r.status(500).json({error:"Erro interno do servidor"})}})),a.get("/fluxogramas",(async(o,r)=>{try{const o=await p.find();return r.status(200).json({resultado:o})}catch(o){return console.error("Erro ao buscar módulos:",o),r.status(500).json({error:"Erro interno do servidor"})}})),a.get("/orientacaotelhados",(async(o,r)=>{try{const o=await b.find();return r.status(200).json({resultado:o})}catch(o){return console.error("Erro ao buscar módulos:",o),r.status(500).json({error:"Erro interno do servidor"})}})),a.post("/anexos",(async(o,r)=>{try{const s=o.body,t=await y.findOne({pid:s._id});return r.status(200).json({resultado:t})}catch(o){return console.error("Erro ao buscar módulos:",o),r.status(500).json({error:"Erro interno do servidor"})}})),a.post("/anexo",(async(o,r)=>{try{const s=o.body;if(s._id)return(await y.updateOne({_id:s._id},{$set:s})).acknowledged?r.status(200).json({msg:"Registro atualizado com sucesso"}):r.status(500).json({msg:"Erro ao atualizar o registro"});{const o=new y(s);return await o.save(),r.status(200).json({msg:"Registro inserido com sucesso"})}}catch(o){return console.error("Erro ao inserir ou atualizar o registro:",o),r.status(500).json({error:"Erro interno do servidor"})}})),r.connect("mongodb://127.0.0.1:27017/arasol").then((()=>{console.log("BANCO OK"),a.listen(5001),console.log("API ONLINE")})).catch((o=>console.log(o)))})()})();