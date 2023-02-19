const { response } = require("express");

const Liga = require('../models/liga');


const getLigas = async(req, res = response) => {

    const ligas = await Liga.find()
                                //obtener el nombre del usuario que creo la liga, y sus otras propiedades
                                .populate('usuario', 'nombre apellidoP apellidoM img');

    res.status(200).json({
        ok: true,
        ligas: ligas
    });
}

const CrearLiga = async(req, res = response) => {

    const uid = req.uid;
    const liga = new Liga({
        usuario: uid,
        ...req.body
    } );

    try {

        const ligaDB = await liga.save();
        
        res.status(200).json({
            ok: true,
            hospital: ligaDB
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }


}

const ActualizarLiga = (req, res = response) => {

    res.status(200).json({
        ok: true,
        msg: 'Actualizar Liga'
    });
}

const eliminarLiga = (req, res = response) => {

    res.status(200).json({
        ok: true,
        msg: 'borrar Liga'
    });
}



module.exports = {
    getLigas,
    CrearLiga,
    ActualizarLiga,
    eliminarLiga
}