
const express=require('express');
const app=express();
const Twitter=require('./API/helpers/twitter');
const tweets=new Twitter();
require('dotenv').config();

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    next();
})

app.get('/tweets',(req,res)=>{
    const query=req.query.q;
    const maxID=req.query.max_id;

    tweets.get(query,maxID).then((response)=>{
        res.status(200).send(response.data);
    }).catch((error)=>{
        res.status(400).send(error);
    })
})

const port=process.env.PORT || 3000

app.listen(port,()=>{console.log("Listening on Twitter's port 3000")});