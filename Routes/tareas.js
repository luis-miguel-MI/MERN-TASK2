//Router para tareas

const express = require('express');
const router = express.Router();
const {check}=require('express-validator');

const proyectoController = require ('../controllers/proyectoController');

const tareaController = require('../controllers/tareaController');

const auth = require('../middleware/auth');

//Crear una tarea
//api/tareas
router.post('/',
    auth,
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('proyecto','El proyecto es obligatorio').not().isEmpty()
    ],
    tareaController.crearTarea
);

//Obtener tareas
//api/tareas
router.get('/',
    auth,
    tareaController.obtenerTareas
);


//Actualizar tarea
//api/tareas
router.put('/:id',
    auth,
    tareaController.actualizarTarea
);

//Eliminar una tarea
//api/tareas
router.delete('/:id',
    auth,
    tareaController.eliminarTarea
);

module.exports=router;