

const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');


const Carrusel = require('../models/carrusel');


const getCarrusel = async(req, res = response) => {

    //ligas?desde=10&limite=3

    const desde =  Number(req.query.desde)  || 0;
    const limite = Number(req.query.limite) || 0;

    const carrusel = await Carrusel.find()
                                //obtener el nombre del usuario que creo la liga, y sus otras propiedades
                                .populate('usuario', 'nombre apellidoP apellidoM img')
                                    .skip( desde )
                                    .limit( limite )

    res.status(200).json({
        ok: true,
        carruseles: carrusel
    });
}

const getCarruselPorId = async(req, res = response) => {

    const id = req.params.id
    try {

        const carrusel = await Carrusel.findById(id)
                                    //obtener el nombre del usuario que creo la liga, y sus otras propiedades
                                    .populate('usuario', 'nombre apellidoP apellidoM img');
    
        res.status(200).json({
            ok: true,
            carrusel: carrusel
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
        
        
    }

}


const CrearCarrusel = async(req, res = response) => {

    const uid = req.uid;
    const img = req.files.imagen
   console.log(req.files)
   
    try {


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

//     // Validar extension
     const extensionesValidas = ['png','jpg','jpeg']; 
     if ( !extensionesValidas.includes(extensionArchivo) ){
         return res.status(400).json({
             ok: false,
             msg: 'No es una extension permitida'
         });
     }

//     //Validar tamaño
     if( !file.size >= 3000000 ){
         return res.status(400).json({
             ok: false,
             msg: 'El archivo debe de tener un peso maximo de 3 mb'
         });
     }
//     //Se termino de validar el tamaño

//     // Generar el nombre del archivo 
        let nombreArchivo ;
    
        
     
    
// //  // Path para guardar la imagen

    const path = toString(file.data);


//     // Path para guardar la imagen
        
        const{secure_url}= await cloudinary.uploader.upload(path,{folder:'carruseles'});
        nombreArchivo=secure_url;



        console.log(nombreArchivo)


//     // Mover la imagen
     file.mv( path , async (err) => {
         if (err){
             console.log(err);
             return res.status(500).json({
                 ok: false,
                 msg: 'Error al mover la imagen'
             });
         }
       

//         // Actualizar base de datos
//         actualizarImagen( tipo, id, nombreArchivo );


//         res.json({
//             ok: true,
//             msg: 'Archivo subido',
//             nombreArchivo
//         })
//     });
const carrusel = new Carrusel({
    img:nombreArchivo, 
    usuario: uid,
    
   

    ...req.body,
    
} );
        const carruselDB = await carrusel.save();
        
        res.status(200).json({
            ok: true,
            carrusel: carruselDB,
            img:nombreArchivo
        });
        
    })} catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }


}

const ActualizarCarrusel = async(req, res = response) => {

    const id = req.params.id
    //tenemos el uid por que pasamos por la verificacion de jwt
    const uid = req.uid;

    try {

        const carrusel = await Carrusel.findById( id );

        if( !carrusel ){
            return res.status(404).json({
                ok: true,
                msg: 'Liga no encontrado por id'
            });
        }

        const cambiosCarrusel = {
            ...req.body,
            usuario: uid
        }

        const carruselActualizado = await Carrusel.findByIdAndUpdate( id, cambiosCarrusel, { new: true } );

        res.json({
            ok: true,
            carrusel: carruselActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const eliminarCarrusel = async(req, res = response) => {

    const id = req.params.id

    try {
        const carrusel = await Carrusel.findById( id );

        if( !carrusel ){
            return res.status(404).json({
                ok: true,
                msg: 'Carrusel no encontrado por id'
            });
        }

        await Carrusel.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Carrusel Eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}




module.exports = {
    ActualizarCarrusel,
    CrearCarrusel,
    getCarrusel,
    getCarruselPorId,
    eliminarCarrusel
}