const express =require('express');
const app=express();
const bodyParser=require('body-parser');

const botRoutes = require("./api/router/bot");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//CORES header for handling error 
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
  
    res.setHeader('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE');
    next(); 
});

//Routes which should handle requests
app.use('/bot',botRoutes);


//error handling
app.use((req,res,next)=>{
    const error=new Error('Not found'); 
    error.status=404;
    next(error);
})

//error handling
app.use((error,req,res,next)=>{         
    res.status(error.status||500);
    res.json({
        error:{
            message:error.message
        }
    })
})

module.exports = app;