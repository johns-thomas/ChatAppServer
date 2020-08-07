const path = require('path');
const express = require('express');
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const app = express();
const routes=require('./routes/routes')

app.use(bodyparser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.use('/',routes);
app.use((error,req,res,next)=>{
  console.log(error);
  const status=error.status  || 500;
  const data=error.data;
  const message=error.message;
  res.status(status).json({message:message,data:data,status:status});
});


mongoose.connect(
 "mongodb db url"
).then((result) =>{

  const server=
  app.listen(8080);
const io =require("./socket").init(server);
  io.on('connection',socket =>{
   
   socket.on('room',id=>{
    socket.join(id)
   })
   
 })
}).catch((err) =>{
  console.log(err)
});