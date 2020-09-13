//Controlador para crear un nuevo usuario

//Importar el modelo del usuario
const Usuario =require ('../models/Usuario');

//Importar la libreria para hacer un hash de la contraseña y no mostrarla en 
//texto plano, se uso npm install bcryptjs
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
    const {email, password} = req.body;

    try {
        let usuario = await Usuario.findOne({email});

        if (usuario) {
            return res.status(400).json({msg: 'El usuario ya existe'});
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