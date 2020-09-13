//Rutas para crear usuarios 
const express = require ('express');
const router = express.Router();
const usuarioController = require ('../controllers/usuarioController');
const { check } = require('express-validator');

//Agregando express validator 


//Crear un usuario 
// api/usuarios
//Recibe un request tipo post a la url
router.post('/', 
    [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('email','Agregar un email valido').isEmail(),
        check('password','El password debe ser de almenos 6 caracteres').isLength({min:6})
    ],
    usuarioController.crearUsuario  //Funcion que se va a ejecutar en el controlador 
);

module.exports=router;