//Router para archivos

const express = require('express');
const router = express.Router();
const {check}=require('express-validator');

//Importar controllers 
const archivoController = require ('../controllers/archivoController');

//Importar el middleware
const auth = require('../middleware/auth');

// api/declaraciones

//Crear declaración
router.post('/',
    auth,
    /* [
        check('nombre','El nombre de la declaracion es obligatorio').not().isEmpty()
    ], */
    archivoController.crearArchivo
)

/
//Obtener declaraciones
router.get('/',
    auth,
    archivoController.obtenerArchivo
)

/*
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
); */


module.exports=router;