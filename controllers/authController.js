//Controladore de la autenticacion en el sistema

const Usuario =require ('../models/Usuario');
const bcryptjs = require ('bcryptjs');
const {validationResult}=require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario =async(req,res)=>{
    
    const errores=validationResult(req);

    if ( !errores.isEmpty()){
        return res.status(400).json({errores:errores.array()})
    }

    //Etraer email y password
    const {email,password}=req.body;
    try {
        //Revisar que sea un usuario registrado
        let usuario = await Usuario.findOne({email});
        if (!usuario){
            return res.status(400).json({msg:'El usuario no exite'});
        } 
        //Revisar password
        const passwordCorrecto = await bcryptjs.compare(password,usuario.password)
        if (!passwordCorrecto){
            return res.status(400).json({msg: 'La contraseña es incorrecta'});
        }

        
        //Creat y firmar el JWT
        const payload = {
            usuario: {id:usuario.id}
        };
        //Firmar el jwt
        jwt.sign(payload,process.env.SECRETA, {
            expiresIn: 3600 //1 Hora 
        }, (error,token)=> {
            if (error) throw error;

            console.log(`User ${email} login successfull`);
            res.json ({token});
        });

    } catch (error) {
        console.log(error);
    }
}

//Obtiene al usuario autenticado
exports.usuarioAutenticado = async(req,res)=>{
    try {
        const usuario = await  Usuario.findById(req.usuario.id).select('-password');
        /* console.log(usuario); */
        res.json({usuario});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error'});
    }
}