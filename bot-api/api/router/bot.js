const express =require('express');
const runSample = require('../../dialogflow');
const router =express.Router();


router.post('/sendMsg',(req,res) =>{
    let msg=req.body.msg;
    runSample(msg)
    .then(data =>{
        res.status(200).json({data})
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({err})
    })
   
})


module.exports=router;