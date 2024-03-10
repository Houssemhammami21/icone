const express=require('express');
const PORT=process.env.PORT||3001;
const app=express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const fs=require('fs');

const path=require('path');
const cors=require('cors');
const { isUtf8 } = require('buffer');


const respA=fs.readFileSync('./db/admin.json')
   
 const dataA=JSON.parse(respA) ;

 const respCom=fs.readFileSync('./db/comercial.json')
   
 const dataCom=JSON.parse(respCom) ;

 const respcli=fs.readFileSync('./db/client.json')
   
 const datac=JSON.parse(respcli) ;

 const respaffec=fs.readFileSync('./db/demande.json')
   
 const dataaffec=JSON.parse(respaffec) ;
 
 const respD=fs.readFileSync('./db/demande.json');
   
 const dataD=JSON.parse(respD) ;
   

 app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));
 app.options('*', cors());
 
 app.get('/',function(res,req){
  res.sendFile(path.join(__dirname,"../../recouvrement_front-end/src/index.js")),
  function(err){
    if(err){res.status(500).send(err);}
  }
 });

app.post('/NewAdmin',(req,res)=>{
    res.header= 'Access-Control-Allow-Methods','POST, GET, PUT, DELETE, OPTIONS'
   const NewAdmin= req.body;
   res.status(200).send({status :'recived'});
    var file = fs.readFileSync('./db/admin.json');
   let data =JSON.parse(file);
     data.push(NewAdmin); 
   let  json = JSON.stringify(data); 
   ree= fs.writeFileSync('./db/admin.json',json);   
});

app.post('/NewCom',(req,res)=>{
    const NewCom= req.body;
    res.status(200).send({status :'recived'});
   var file = fs.readFileSync('./db/comercial.json');
    let data =JSON.parse(file);
      data.push(NewCom); 
    let  json = JSON.stringify(data); 
     fs.writeFileSync('./db/comercial.json', json, 'utf8');  
 });
 app.post('/SupAdmin',(req,res)=>{
  const NewList= req.body;
  console.log(NewList)
  let data =JSON.stringify(NewList)
  res.status(200).send({status :'recived'});
   fs.writeFileSync('./db/admin.json', data, 'utf8');  
});
app.post('/SupCom',(req,res)=>{
  const NewList= req.body;
  console.log(NewList)
  let data =JSON.stringify(NewList)
  res.status(200).send({status :'recived'});
   fs.writeFileSync('./db/comercial.json', data, 'utf8');  
});
app.post('/SupClie',(req,res)=>{
  const NewList= req.body;
  console.log(NewList)
  let data =JSON.stringify(NewList)
  res.status(200).send({status :'recived'});
   fs.writeFileSync('./db/client.json', data, 'utf8');  
});
 app.post('/NewClie',(req,res)=>{
    const NewClient= req.body;
    console.log(NewClient)
    res.status(200).send({status :'recived'});
    var file = fs.readFileSync('./db/client.json');
    let data =JSON.parse(file);
      data.push(NewClient); 
    let  json = JSON.stringify(data); 
     fs.writeFileSync('./db/client.json', json, 'utf8');  
 });
  

 app.post('/validationClient',(req,res)=>{
  const ValidationClient= req.body;
  const jdata=JSON.stringify(ValidationClient);
  res.status(200).send({status :'recived'});
   var file=fs.writeFileSync('./db/demande.json',jdata,'utf-8');
});

app.post('/validationAdmin',(req,res)=>{
  const ValidationAdmin= req.body;
  res.status(200).send({status :'recived'});
  var file = fs.readFileSync('./db/valider.json');
  let data =JSON.parse(file);
    data.push(ValidationAdmin); 
  let  json = JSON.stringify(data); 
  var file=fs.writeFileSync('./db/valider.json', json, 'utf8');  
});

 app.post('/Newdemande',(req,res)=>{
  const Newdemande= req.body;
  res.status(200).send({status :'recived'});
  var file = fs.readFileSync('./db/demande.json');
  let data =JSON.parse(file);
    data.push(Newdemande); 
  let  json = JSON.stringify(data); 
   fs.writeFileSync('./db/demande.json', json, 'utf8');  
});

app.get('/lesDemandes',(req,res)=>{
  res.json(dataD);
});

app.get('/affec',(req,res)=>{
  res.json(dataaffec);
 
});



//login
app.get('/loginA',(req,res)=>{
  res.json(dataA);
});
app.get('/loginC',(req,res)=>{
    res.json(dataCom);
});
app.get('/loginCli',(req,res)=>{
    res.json(datac);
});
app.listen(PORT,()=>{
    console.log(`server listening on port :${PORT}`);
});