//Controlador para proyectos

const {validationResult}= require('express-validator');
const Declaracion = require('../models/Declaracion');
const Usuario = require ('../models/Usuario');
const fs =require ("fs");


//Crear nuevas declaraciones
exports.crearDeclaracion = async (req,res) => {

    //Revisar si existen errores de los checks
    const errores = validationResult(req);
    if (!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()})
    } 
    
    /* fs.writeFileSync("../datos/example_file.txt", fs.createWriteStream(req.body.file), (err) => { 
    if (err) { 
        console.log(err); 
    } }); */


    
    try {
        //Crear nueva declaracion
        const declaracion = new Declaracion (req.body);

        //Guardar el creador del proyecto via JWT
        declaracion.creador = req.usuario.id;

        const cliente = await Usuario.findOne({rfc : req.body.rfc }); 
        declaracion.cliente = cliente.id;
        declaracion.rfc = cliente.rfc;

        declaracion.save();
        res.json(declaracion);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


//Obtener las declaraciones
exports.obtenerDeclaracion = async (req,res)=>{
    
    const usuario = await Usuario.findOne({ _id : req.usuario.id })
    //console.log (usuario)
    try {
        if (usuario.admin){
            const declaracion = await Declaracion.find().sort({fecha:-1});    
            //console.log ("ADMINISTRADOR SOLICITANDO TODAS LAS DECLARACIONES");
            res.json({declaracion})
        }
        else {
            const declaracion = await Declaracion.find({cliente: req.usuario.id}).sort({fecha:-1});
            res.json({declaracion})
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


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
}