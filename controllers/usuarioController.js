//Controlador para crear un nuevo usuario

//Importar el modelo del usuario
const Usuario =require ('../models/Usuario');

// npm install bcryptjs
const bcryptjs = require ('bcryptjs');

const {validationResult}=require('express-validator');

const jwt = require('jsonwebtoken');



exports.crearUsuario = async(req,res) =>{

    //Destructuring 
    const errores = validationResult(req);
    if (!errores.isEmpty()){
        return res.status(400).json({errores:errores.array()})
    }

    //Extraer Email y password
    const {email, password,rfc} = req.body;

    try {
        let usuario = await Usuario.findOne({email});
        let rfcUsuario = await Usuario.findOne({rfc});

        if (usuario) {
            return res.status(400).json({msg: 'El correo ya existe'});
        }

        if (rfcUsuario) {
            return res.status(400).json({msg: 'El RFC ya existe'});
        }

        //Crea el nuevo usuario
        usuario = new Usuario (req.body);

        //Hashear el password
        const salt =await bcryptjs.genSalt (10);  //Para hacer unica la contraseña 
        usuario.password=await bcryptjs.hash(password,salt); //Cifra el password

        //Guardar un nuevo usuario 
        await usuario.save();

        //Creat y firmar el JWT
        const payload = {
            usuario: {id:usuario.id}
        };
        //Firmar el jwt
        jwt.sign(payload,process.env.SECRETA, {
            expiresIn: 3600 //1 Hora 
        }, (error,token)=> {
            if (error) throw error;
            
            return res.status(200).json ({token});
        });


    } catch (error) {
        
        console.log (error);
        res.status(400).send('Algo salio mal :c');
    }
}

exports.obtenerUsuarios = async (req,res)=>{
    
    const usuario = await Usuario.findOne({ _id : req.usuario.id })
    //console.log (usuario)
    try {
        if (usuario.admin){
            const usuarios = await Usuario.find().sort({nombre:-1});    
            //console.log ("ADMINISTRADOR SOLICITANDO TODAS LAS DECLARACIONES");
            res.json({usuarios})
        }
        else {
            return res.status(401).json({msg:'No authorizado'})
        }

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}