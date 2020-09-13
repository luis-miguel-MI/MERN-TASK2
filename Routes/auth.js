//Rutas para autenticar usuarios
const express = require ('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController')

//Importar el middleware
const auth = require('../middleware/auth');

//Iniciar sesion 
//api/auth
router.post('/', 
    [
        check('email','Agregar un email valido').isEmail(),
        check('password','El password debe ser de almenos 6 caracteres').isLength({min:6})
    ],
    authController.autenticarUsuario
);

//Obtener usuario autenticado
router.get('/',
    auth,
    authController.usuarioAutenticado
)

module.exports=router;