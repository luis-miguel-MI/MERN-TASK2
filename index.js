
//Importar express
const express = require('express');

//Importar archivo de configuracion de MONGO DB
const conectarDB = require('./config/db');

//Importacion de CORS para habilitar la comunicacion con otro dominio
const cors = require ('cors');

//Creacion del servidor de express
const app = express();

//Concetar a la base de datos 
conectarDB();

//Habilitar Cors
app.use(cors());

//Habilitar express.json, el cual nos permite leer datos que los usuarios ingresen
app.use(express.json({extend : true}));
//Otra ocion es usar Bodyparser

//Asignacion de un puerto al servidor
//Es importante nombrarlo port por temas de despliegue
//Puerto de la app
const port = process.env.PORT || 4000;

//Importar rutas
app.use('/api/usuarios', require('./Routes/usuarios'));
app.use('/api/auth', require('./Routes/auth'));
app.use('/api/proyectos', require('./Routes/proyectos'));
app.use('/api/tareas',require('./Routes/tareas'));


//Deficion de la pagina principal 
app.get('/', (req,res)=>{
    res.send('HOLA MUNDOv3');
});

//Iniciar el servidor 
app.listen(port,'0.0.0.0', ()=> {
    console.log (`El servidor esta funcionando en el puerto: ${port}`)
})