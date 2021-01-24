
//Importar express
const express = require('express');

//Importar archivo de configuracion de MONGO DB
const conectarDB = require('./config/db');

//Importacion de CORS para habilitar la comunicacion con otro dominio
const cors = require ('cors');

//Creacion del servidor de express
const app = express();

const fileUpload = require('express-fileupload')


//Concetar a la base de datos 
conectarDB();


app.use(express.json({extend : true}));

app.use(fileUpload());

app.use(express.static('public'));

//Habilitar Cors
app.use(cors())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//Asignacion de un puerto al servidor

const port = process.env.PORT || 4000;

//Importar rutas
app.use('/api/usuarios', require('./Routes/usuarios'));
app.use('/api/auth', require('./Routes/auth'));
app.use('/api/declaraciones', require('./Routes/declaraciones'));
app.use('/api/archivos',require ('./Routes/archivos'));


//Iniciar el servidor 
app.listen(port,'0.0.0.0', ()=> {
    console.log (`El servidor esta funcionando en el puerto: ${port}`)
})