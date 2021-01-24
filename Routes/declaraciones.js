//Router para proyectos

const express = require('express');
const router = express.Router();
const {check}=require('express-validator');

//Importar controllers 
const declaracionController = require ('../controllers/declaracionController');

//Importar el middleware
const auth = require('../middleware/auth');

// api/declaraciones

//Crear declaración
router.post('/',
    auth,
    [
        check('nombre','El nombre de la declaracion es obligatorio').not().isEmpty()
    ],
    declaracionController.crearDeclaracion
)


//Obtener declaraciones
router.get('/',
    auth,
    declaracionController.obtenerDeclaracion
)

//Actualizar una declaracion
router.put('/:id',
    auth,
    [
        check('nombre','El nombre de la declaracion es obligatorio').not().isEmpty()
    ],
    declaracionController.actualizarDeclaracion
);

//Eliminar una declaracion
router.delete('/:id',
    auth,
    declaracionController.eliminarDeclaracion
);


module.exports=router;