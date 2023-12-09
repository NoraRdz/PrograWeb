const http=require('http')
const servidor= http.CreateServer((req, res)=>{
res.write("servidor  http node contestando a peticion get");
res.end();
});
servidor.listener(8080, ()=>{
console.log("Servidor node corriendo en el puerto 8082")
});