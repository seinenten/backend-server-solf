

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

    const carrusel = new Carrusel({
        usuario: uid,
        ...req.body
    });


    try {

        const carruselDB = await carrusel.save();
        
        res.status(200).json({
            ok: true,
            carrusel: carruselDB
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        }) 
        
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
                msg: 'Carrusel no encontrado por id'
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