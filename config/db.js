
//Configuracion de la base de datos 
const mongoose = require('mongoose');

//Archivo de configuracion de mongo
require('dotenv').config({path:'variables.env'});

const conectarDB = async() =>{
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser :true,
            useUnifiedTopology:true,
            useFindAndModify: false
        })
        console.log('Base de datos conectada')
    } catch (error) {
        console.log(erro);
        process.exit(1);
    }
}

module.exports = conectarDB; //Es el expor default de JS
