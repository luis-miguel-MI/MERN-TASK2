//Middleware de autenticacion 
/*
    Procedimiento intermedio que se utilizara para verificar si un usuario
    esta autenticado.
 */

const jwt = require('jsonwebtoken');


module.exports = function(req,res,next){
    
    //Leer el token del header
    const token = req.header('x-auth-token');
    
    //Revisar si no hay un token
    if (!token){
        return res.status(401).json({msg: 'No hay un Token, permisos no validos'});
    }

    //Validar el token 
    try {
        const cifrado = jwt.verify(token,process.env.SECRETA);
        req.usuario=cifrado.usuario;
        next(); //Para ir al siguiente middleware

    } catch (error) {
        res.status(401).json({msg:'Token no es valido'})
    }
}