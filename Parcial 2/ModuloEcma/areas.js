/*config de la extension>settings.json*/

function areaCuadrado(lado){
    return lado*lado;
    }
    
    function areaTriangulo(base,altura){
        return(base*altura/2);
    }
    exports.areaCuadrado=areaCuadrado;
    exports.areaTriangulo=areaTriangulo;
   /*1  console.log(__dirname);
    console.log(__filename)*/
    console.log(module) ;

    /* Subir a npm
    npm init -y
    package.json*/