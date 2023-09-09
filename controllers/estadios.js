const { response } = require("express");

const Estadio = require('../models/estadio');

const getEstadios = async(req, res = response) => {

    //?estadios?desde=10&limite=3

    const desde =  Number(req.query.desde)  || 0;
    const limite = Number(req.query.limite) || 0;

    const estadios = await Estadio.find()
                    //obtener el nombre del usuario que creo el estadio, y sus otras propiedades
                    .populate('usuario', 'nombre apellidoP apellidoM img')
                    .skip( desde )
                    .limit( limite );
                                
                                

    res.status(200).json({
        ok: true,
        estadios: estadios
    })

    
}

const getEstadiosPorId = async(req, res = response) => {

    const id = req.params.id;

    try {

        const estadio = await Estadio.findById(id)
                    //?obtener el nombre del usuario que creo el estadio, y sus otras propiedades
                    .populate('usuario', 'nombre apellidoP apellidoM img');
        
        res.status(200).json({
            ok: true,
            estadio: estadio
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
    
}

const crearEstadio = async(req, res = response) => {

    const uid = req.uid;

    const estadio = new Estadio({
        usuario: uid,
        ...req.body
    });


    try {

        const estadioDB = await estadio.save();
        
        res.status(200).json({
            ok: true,
            estadio: estadioDB
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        }) 
        
    }

}

const actualizarEstadio = async(req, res = response) => {

    const id = req.params.id
    //tenemos el uid por que pasamos por la verificacion de jwt
    const uid = req.uid;

    try {
        const estadio = await Estadio.findById( id );

        if( !estadio ){
            return res.status(404).json({
                ok: true,
                msg: 'Estadio no encontrado por id'
            });
        }

        const cambioStatus = {
            ...req.body
        }

        const estadioActualizado = await Estadio.findByIdAndUpdate( id, cambioStatus, { new: true } );

        res.json({
            ok: true,
            estadio: estadioActualizado
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
    actualizarEstadio,
    crearEstadio,
    getEstadios,
    getEstadiosPorId
}


