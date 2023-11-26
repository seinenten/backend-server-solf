require('dotenv').config();
const path = require('path');

const express = require('express');
var cors = require('cors');

const { dbConnection } = require('./database/config.js');
const fileUpload = require('express-fileupload');

//Crear el servidor de express
const app = express();

// Configurar CORS
app.use(cors());


//Carpeta publica
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json());



// Base de datos
dbConnection();


// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/ligas', require('./routes/ligas'));
app.use('/api/equipos', require('./routes/equipos'));
app.use('/api/jugadores', require('./routes/jugadores'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));
app.use('/api/posiciones', require('./routes/posicion'));
app.use('/api/resultados', require('./routes/resultados'))
app.use('/api/estadios', require(   './routes/estadios'))
app.use('/api/enfrentamientos', require('./routes/enfrentamientos'))
app.use('/api/estadisticas', require('./routes/estadisticasJugadores.js'))
app.use('/api/estadisticasEquipos/', require('./routes/estadisticasEquipos.js'))
app.use('/api/productos', require('./routes/productos.js'));
app.use('/api/tablaPosiciones/', require('./routes/tablaPosiciones.js'))
app.use('/api/comentarios', require('./routes/comentario.js'));
app.use('/api/payments', require('./routes/payments'));
//Cursos 
app.use('/api/cursos', require('./routes/cursos.js'));

//ruta carrusel 
app.use('/api/carruseles', require('./routes/carruseles'));
app.use('/api/preguntas', require('./routes/preguntas'));

// Lo ultimo

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})