//Modelo de la tabla de usuario 

const mongoose = require ('mongoose');

const UsuarioSchema = mongoose.Schema ({
    nombre : {
        type: String,
        required: true,
        trim: true
    },
    email : {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    rfc : {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password : {
        type: String,
        required: true,
        trim: true
    },
    registro : {
        type:Date,
        default :Date.now()
    },
    admin : { 
        type : Boolean,
        default : false
    }
});


module.exports = mongoose.model('Usuario',UsuarioSchema);