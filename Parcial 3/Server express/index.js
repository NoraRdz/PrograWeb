const express= require('express');
const cors=require('cors');
const mysql=require('mysql2')
const app = express();
const {jsPDF}=require("jspdf");
const path =require("path");
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const connection=mysql.createConnection({
    host: 'localhost',
    port:3306,
   user: 'root',
   password: 'grachi0303',
   database: 'practica1'
});

app.get('/usuarios',(req, res)=>{

  console.log(req.query.idUsuario)

        let consulta='';
        if(typeof (req.query.idUsuario) =='undefined')
        {
           consulta='select * from usuarios';
        }
        else
        {
           consulta=`select * from usuarios where ID_USUARIO=${req.query.idUsuario}`;
        }

   connection.query(
        consulta,
        function(err, results, fields){
          console.log(results,"Error aqui"); 
          if(results.length==0)
          {
            console.log("Si entra")
            res.json({mensaje:"idUsuario no existe"});
          }
          else 
          {
            console.log("No entra")
            res.json(results);
          }
        });
});

app.get('/catalogo',(req, res)=>{

  console.log(req.query.Codigo)

        let consulta='';
        if(typeof (req.query.Codigo) =='undefined')
        {
           consulta='select * from pedido';
        }
        else
        {
           consulta=`select * from pedido where Codigo=${req.query.Codigo}`;
        }

   connection.query(
        consulta,
        function(err, results, fields){
          console.log(results); 
          if(results.length==0)
          {
            console.log("Si entra")
            res.json({
              status: 0,
                    mensaje: "Este Codigo no esta registrado, intente con otro codigo por favor",
                    datos: {}
          });
          }
          else 
          {
            console.log("No entra")
            res.json({
              status: 1,
              mensaje: "Codigo encontrada exitosamente",
              datos: (results.length == 1) ? results[0] : results
          });
          }
        });
});

app.get('/',(req,res)=>{
  res.json({mensaje:"Server express respondiendo a get"});
});


 //Insertar a tabla
app.post('/catalogo/insertar',(req, res)=>{
    let sentenciaSQL = '';
    if (!req.body) {
      return res.status(400).json({
          status: 0,
          mensaje: "Cuerpo de la solicitud no válido",
          datos: {}
      });
    }
    else {
      const {Material,Color,Categoria,Talla,Precio}=req.body;
      console.log(Material,Color,Categoria,Talla,Precio, "reqbody" ,req.body)
        sentenciaSQL = `INSERT INTO Pedido (Material, Color, Categoria, Talla, Precio) VALUES ('${Material}', '${Color}', '${Categoria}', '${Talla}', '${ Precio}')`;
        console.log(sentenciaSQL);
        connection.query(
            sentenciaSQL,
            function (err, results, fields) {
                console.log(results);
                if (results && results.affectedRows == 1) {
                    res.json({
                        status: 1,
                        mensaje: "Articulo agregado con exito",
                        datos: {}
                    });
                } else {
                    res.json({
                      status: 0,
                      mensaje: "Hubo un error al agregar el articulo, por favor intenta de nuevo",
                      datos: {}
                  });
              }
          }
      )
  }
  });

app.delete('/catalogo/eliminar',(req, res)=>{
  let consulta="";
  console.log(req.query.Codigo);
  if(typeof(req.query.Codigo)==="undefined")
  {
    res.json({
      mensaje:"No se coloco id para elininar"
    })
  }
  else {
    consulta=`delete from pedido where Codigo=${req.query.Codigo}`;
    connection.query(consulta,function (err, results,fields){
      if (results && results.affectedRows == 1) {
      res.json({mensaje:"Se elmino correctamente de la base de datos"})
      }
      else {
        res.json({mensaje:"No se encuentra o no existe el dato que desea eliminar"})
      }
    })
  }

});
     
app.put('/catalogo/modificar',(req, res)=>{
  let consulta='';
  //(Material, Color, Categoria, Talla, Precio) 
  const {Codigo,Material,Color,Categoria,Talla,Precio}=req.body;
  console.log(Material,Color,Categoria,Talla,Precio, "reqbody" ,req.body)
  if(Codigo!=''&&Material!=''&&Color!=''&&Categoria!=''&&Talla!=''&&Precio)       
  {
    consulta=`update pedido set Material='${Material}', Color='${Color}', Categoria='${Categoria}', Talla='${Talla}', Precio='${Precio}' where Codigo='${Codigo}'`
    console.log(consulta)
    connection.query(consulta,function(err,results,fields){
      if(err!=null)
      {
        res.json({mensaje:err.message})
      }
      else{res.json(results)}
    })
  }
});

app.listen(8082,(req,res)=>{
    console.log("servidor express corriendo en puerto 8082");
});