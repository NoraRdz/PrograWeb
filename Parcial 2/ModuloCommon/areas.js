/*config de la extension>settings.json*/

    function areaCuadrado(lado){
    return lado*lado;
    }
    
    function areaTriangulo(base,altura){
        return(base*altura/2);
    }

    function areaRectangulo(base,altura){
        return(base*altura);
    }

    function elevadoAlCuadrado(n){
        return(n*n);
    }

    function areaCirculo(r){
        return(3.1416*(r*r))
    }

    module.exports.areaCuadrado=areaCuadrado;
    module.exports.areaTriangulo=areaTriangulo;
    module.exports.areaRectangulo=areaRectangulo;
    module.exports.elevadoAlCuadrado=elevadoAlCuadrado;
    module.exports.areaCirculo=areaCirculo;


   /*1  console.log(__dirname);
    console.log(__filename)*/
    console.log(module) ;

    /* Subir a npm
    npm init -y
    package.json*/