//Rutas para crear usuarios 
const express = require ('express');
const router = express.Router();
const usuarioController = require ('../controllers/usuarioController');
const { check } = require('express-validator'); 
const auth = require('../middleware/auth');

//Crear un usuario 
// api/usuarios
router.post('/', 
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('email','Agregar un email valido').isEmail(),
        check('rfc','El rfc es obligatorio').not().isEmpty(),
        check('password','El password debe ser de almenos 6 caracteres').isLength({min:6})
    ],
    usuarioController.crearUsuario  
);

//api/usuarios
router.get('/',
    auth,
    usuarioController.obtenerUsuarios
)

module.exports=router;