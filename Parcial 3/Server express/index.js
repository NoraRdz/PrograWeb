const express= require('express');

const app = express();

app.get('/',(req, res)=>{
res.json({mensaje:"Server express respondiendo a get"});
});

app.post('/',(req, res)=>{
res.json({mensaje:"Server express respondiendo a post"});
});

app.delete('/',(req, res)=>{
res.json({mensaje:"Server express respondiendo a delete"});
});

app.listen('/',(req, res)=>{
res.json({mensaje:"Server express respondiendo a listen"});
});
            
app.listen(8082,(req,res)=>{
    console.log("servidor express corriendo en puerto 8082");
})