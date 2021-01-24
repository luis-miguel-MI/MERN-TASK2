//Modelo de un proyecto

const mongoose = require('mongoose');

const DeclaracionSchema = mongoose.Schema({
    nombre:{
        type: String,
        require: true,
        trim:true
    },
    creador:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Usuario'
    },
    fecha:{
        type: Date,
        default: Date.now()
    },
    cliente : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Usuario',
        require : true
    },
    rfc : {
        type: String,
        required: true,
        trim: true
    },
    file : {
        type : String
    }
});

module.exports = mongoose.model('Declaracion',DeclaracionSchema);