const path = require('path');
const fs = require('fs');

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-image");


const fileUpload = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['jugadores','equipos','ligas','usuarios'];

    if ( !tiposValidos.includes(tipo) ){
        return res.status(400).json({
            ok: false,
            msg: 'No es un jugador, equipo, liga u usuario (tipo) '
        });
    }

    // Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
    }

    // Procesar la imagen...
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.'); //wolerine.1.3.2.jpg
    const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ];

    // Validar extension
    const extensionesValidas = ['png','jpg','jpeg']; 
    if ( !extensionesValidas.includes(extensionArchivo) ){
        return res.status(400).json({
            ok: false,
            msg: 'No es una extension permitida'
        });
    }

    //Validar tamaño
    if( !file.size >= 3000000 ){
        return res.status(400).json({
            ok: false,
            msg: 'El archivo debe de tener un peso maximo de 3 mb'
        });
    }
    //Se termino de validar el tamaño

    // Generar el nombre del archivo 
    const nombreArchivo = `${ uuidv4()}.${ extensionArchivo }`;

    // Path para guardar la imagen
    const path = `./uploads/${ tipo }/${ nombreArchivo }`;

    // Mover la imagen
    file.mv( path , (err) => {
        if (err){
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        // Actualizar base de datos
        actualizarImagen( tipo, id, nombreArchivo );


        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        })
    });


}

const retornaImagen = ( req, res = response ) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const tiposValidos = ['jugadores','equipos','ligas','usuarios'];

    if ( !tiposValidos.includes(tipo) ){
        return res.status(400).json({
            ok: false,
            msg: 'No es un jugador, equipo, liga u usuario (tipo) '
        });
    }

    const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ foto }` );

    // imagen por defecto
    if( fs.existsSync( pathImg ) ){
        res.sendFile( pathImg );
    }else{
        const pathImg = path.join( __dirname, `../uploads/no-img.jpg` );
        res.sendFile( pathImg );
    }

}


module.exports = {
    fileUpload,
    retornaImagen
}