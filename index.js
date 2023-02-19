require('dotenv').config();

const express = require('express');
var cors = require('cors');

const { dbConnection } = require('./database/config.js');

//Crear el servidor de express
const app = express();

// Configurar CORS
app.use( cors() );

// Lectura y parseo del body
app.use( express.json() );


// Base de datos
dbConnection();


// Rutas
app.use( '/api/usuarios', require( './routes/usuarios' ) );
app.use( '/api/login', require( './routes/auth' ) );
app.use( '/api/ligas', require( './routes/ligas' ) );
app.use( '/api/equipos', require( './routes/equipos' ) );
app.use( '/api/jugadores', require( './routes/jugadores' ) );
app.use( '/api/todo', require('./routes/busquedas')   );
app.use( '/api/upload', require('./routes/uploads')   );



app.listen( process.env.PORT , () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
} )