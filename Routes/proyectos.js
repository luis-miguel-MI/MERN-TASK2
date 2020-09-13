//Router para proyectos

const express = require('express');
const router = express.Router();
const {check}=require('express-validator');

//Importar controllers 
const proyectoController = require ('../controllers/proyectoController');

//Importar el middleware
const auth = require('../middleware/auth');

//Crear proyectos
// api/proyectos
router.post('/',
    auth,
    [
        check('nombre','El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto
)

router.get('/',
    auth,
    proyectoController.obtenerProyectos
)

/*
    El router lo que hace es ejecutar primero auth para verificar que es valido 
    y despues realiza el  codigo del controller de crearProyecto
*/


//Actualizar un proyecto
router.put('/:id',
    auth,
    [
        check('nombre','El nombre del proyecto es obligatorio').not().isEmpty()
    ],
    proyectoController.actualizarProyecto
);

//Eliminar un proyecto
router.delete('/:id',
    auth,
    proyectoController.eliminarProyeco
);


module.exports=router;