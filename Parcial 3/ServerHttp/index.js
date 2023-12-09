const http=require('http')
const servidor= http.createServer((req, res)=>{
res.write("servidor  http node contestando a peticion get");
res.end();
});
servidor.listen(8082, ()=>{
console.log("Servidor node corriendo en el puerto 8082")
});