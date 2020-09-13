//Controlador para proyectos

const {validationResult}= require('express-validator');
//Importar el modelo 
const Proyecto = require('../models/Proyecto');


//Funcion para crear nuevos proyectos
exports.crearProyecto = async (req,res) => {

    //Revisar si existen errores de los checks
    const errores = validationResult(req);
    if (!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()})
    } 

    try {
        //Crear un nuevo proyecto 
        const proyecto = new Proyecto (req.body);

        //Guardar el creador del proyecto via JWT
        proyecto.creador = req.usuario.id;

        //Guardar el proyecto
        proyecto.save();
        res.json(proyecto);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


//Funcion para obtener todos los proyectos del usuario actual 
exports.obtenerProyectos = async (req,res)=>{
    try {
        const proyectos = await Proyecto.find({creador: req.usuario.id}).sort({creado:-1});
        res.json({proyectos})
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


//Funcion para actualizar un proyecto
exports.actualizarProyecto = async(req,res)=>{
    
    //Revisar si existen errores de los checks
    const errores = validationResult(req);
    if (!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()})
    } 

    //Etraer la informacion del proyecto
    const {nombre}= req.body;
    const nuevoProyecto={};

    if (nombre) {
        nuevoProyecto.nombre=nombre;

    }
    try {
        //Revisar el ID
        let proyecto = await Proyecto.findById(req.params.id); //Obtiene de los parametros el valor

        //Identificar si existe el proyecto
        if (!proyecto){
            return res.status(404).json({msg:'Proyecto no encontrado'});
        }

        //verificar el creador del proyecto
        if (proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg:'No authorizado'})
        }

        //Actualizar el proyecto
        proyecto = await Proyecto.findByIdAndUpdate ({_id:req.params.id},{$set:nuevoProyecto},{new:true});
        res.json({proyecto});

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidro');
    }

}

//Elimina un proyecto por su ID
exports.eliminarProyeco = async (req,res)=>{

    try {

        //Revisar el ID
        let proyecto = await Proyecto.findById(req.params.id); //Obtiene de los parametros el valor

        //Identificar si existe el proyecto
        if (!proyecto){
            return res.status(404).json({msg:'Proyecto no encontrado'});
        }

        //verificar el creador del proyecto
        if (proyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg:'No authorizado'})
        }

        //Eliminar el proyecto
        await Proyecto.findOneAndRemove({_id:req.params.id});
        res.json ({msg:'Proyecto eliminado'})

    } catch (error) {
        console.log(error);
        res.status(500).send('Error en el servidro');
    }
}