const {validationResult}= require('express-validator');
const Declaracion = require('../models/Declaracion');
const Usuario = require ('../models/Usuario');
const fs =require ("fs");


//Crear nuevas declaraciones
exports.crearArchivo = async (req,res) => {

    //Revisar si existen errores de los checks
    /* const errores = validationResult(req);
    if (!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()})
    }  */

    if (!req.files) {
        console.log("ARCHIVOS NO ENVIADOS");
        return res.status(500).send({ msg: "file is not found" })
    }

    console.log ("Archivo recibido");
    console.log (typeof(req.files));
    console.log (req.files); 
    

    try {
        //Crear nueva declaracion
        const archivo = req.files.file;

        //Guardar el creador del proyecto via JWT
        //declaracion.creador = req.usuario.id;

        //archivo.mv(`../../datos/${archivo.name}`)
        fs.appendFileSync(`../datos/${archivo.name}`,archivo.data,function() {
            
            console.log("ARCHIVO ALMACENADO");
            
        } );

        res.json({nombre: archivo.name, path: `/${archivo.name}`})
        //const cliente = await Usuario.findOne({rfc : req.body.rfc }); 

    } catch (error) {
        console.log("CAPTURADO EN EL CATCH")
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}



//Obtener las declaraciones
exports.obtenerArchivo = async (req,res)=>{
    
    //console.log (usuario)
    try {
        //Destructuring de la peticion
        const {nombre}=req.query;       
        if (!nombre)   
            res.status(404).send('FALTA NOMBRE DEL ARCHIVO');

        const src = fs.createReadStream(`../datos/${nombre}`); 
        
        if (!src)
            res.status(404).send('ARCHIVO NO LOCALIZADO');
        
        res.writeHead (200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=${nombre}`,
            'Content-Transfer-Encoding': 'Binary'
        });

        src.pipe(res);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

/*
//Actualizar declaracion
exports.actualizarDeclaracion = async(req,res)=>{
    
    //Revisar si existen errores de los checks
    const errores = validationResult(req);

    if (!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()})
    } 

    //Etraer la informacion de la declaracion
    const {nombre}= req.body;
    const nuevaDeclaracion={};

    if (nombre) {
        nuevaDeclaracion.nombre=nombre;
    }
    try {
        //Revisar el ID
        let declaracion = await Declaracion.findById(req.params.id); //Obtiene de los parametros el valor

        //Identificar si existe el proyecto
        if (!declaracion){
            return res.status(404).json({msg:'Declaracion no encontrado'});
        }

        //verificar el creador del proyecto
        if (declaracion.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg:'No authorizado'})
        }

        //Actualizar el proyecto
        declaracion = await Declaracion.findByIdAndUpdate ({_id:req.params.id},{$set:nuevaDeclaracion},{new:true});
        res.json({proyecto});


    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidor');
    }

}

//Eliminar declaración
exports.eliminarDeclaracion = async (req,res)=>{

    try {

        //Revisar el ID
        let declaracion = await Declaracion.findById(req.params.id); //Obtiene de los parametros el valor

        //Identificar si existe el proyecto
        if (!declaracion){
            return res.status(404).json({msg:'Declaración no encontrada'});
        }

        //verificar el creador del proyecto
        if (declaracion.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg:'No authorizado'})
        }

        //Eliminar el proyecto
        await Declaracion.findOneAndRemove({_id:req.params.id});
        res.json ({msg:'Declaración eliminada'})

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidro');
    }
} */