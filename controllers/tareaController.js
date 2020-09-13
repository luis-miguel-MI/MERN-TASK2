//Controlador para tareas

const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const {validationResult} = require('express-validator');

exports.crearTarea = async (req,res)=>{

    //Revisar si existen errores de los checks
    const errores = validationResult(req);
    if (!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()})
    } 

    try {
        //Destructuring de la peticion
        const {proyecto}=req.body;          

        //Revisar que exite el proyecto
        const proyectoAux = await Proyecto.findById(proyecto);
        if (!proyectoAux){
            return res.status(404).json({msg:'Proyecto no encontrado'});
        }

        //Revisar si el proyecto actual le pertenece al usuario autenticado
        if (proyectoAux.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg:'No authorizado'})
        }

        //Creamos la tarea 
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({tarea});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


//Obtener las tareas por proyecto
exports.obtenerTareas = async (req,res) =>{
    try {
        //Destructuring de la peticion
        const {proyecto}=req.query;          

        //Revisar que exite el proyecto
        const proyectoAux = await Proyecto.findById(proyecto);
        if (!proyectoAux){
            return res.status(404).json({msg:'Proyecto no encontrado'});
        }

        //Revisar si el proyecto actual le pertenece al usuario autenticado
        if (proyectoAux.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg:'No authorizado'})
        }

        //Obtener las tareas por proyecto
        const tareas = await Tarea.find({proyecto}).sort({creado:-1});
        res.json(tareas);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


exports.actualizarTarea = async (req,res)=>{
    try {
        //Destructuring de la peticion
        const {proyecto,nombre,estado}=req.body;          

        //Revisar que exite la tarea
        const tareaExiste = await Tarea.findById(req.params.id);

        //Revisar que existe el proyecto
        const proyectoAux = await Proyecto.findById(proyecto)

        if (!tareaExiste){
            return res.status(404).json({msg:'No existe esa tarea'});
        }

        //Revisar si el proyecto actual le pertenece al usuario autenticado
        if (proyectoAux.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg:'No authorizado'})
        }

        //Crear un objeto con la nueva informacion
        const nuevaTarea={};

        if (nombre){
            nuevaTarea.nombre=nombre;
        }

        if (!estado){
            nuevaTarea.estado=false;
        }
        else if (estado) {
            nuevaTarea.estado=true;
        }
//
        //Guardar la tarea actualizada
        const tarea=await Tarea.findOneAndUpdate({_id : req.params.id},nuevaTarea,{new:true});
        
        res.json({tarea})

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


exports.eliminarTarea = async (req,res)=>{
    
    try {
        //Destructuring de la peticion
        const {proyecto}=req.query;          

        //Revisar que exite la tarea
        const tareaExiste = await Tarea.findById(req.params.id);

        //Revisar que existe el proyecto
        const proyectoAux = await Proyecto.findById(proyecto)

        if (!tareaExiste){
            return res.status(404).json({msg:'No existe esa tarea'});
        }

        //Revisar si el proyecto actual le pertenece al usuario autenticado
        if (proyectoAux.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg:'No authorizado'})
        }

        //Eliminar 
        await Tarea.findOneAndRemove({_id:req.params.id});
        res.json({msg:"Tarea eliminada"})

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}