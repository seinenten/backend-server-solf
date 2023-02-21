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

const ActualizarLiga = async(req, res = response) => {

    const id = req.params.id
    //tenemos el uid por que pasamos por la verificacion de jwt
    const uid = req.uid;

    try {

        const liga = await Liga.findById( id );

        if( !liga ){
            return res.status(404).json({
                ok: true,
                msg: 'Liga no encontrado por id'
            });
        }

        const cambiosLiga = {
            ...req.body,
            usuario: uid
        }

        const ligaActualizado = await Liga.findOneAndUpdate( id, cambiosLiga, { new: true } );

        res.json({
            ok: true,
            liga: ligaActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }


}

const eliminarLiga = async (req, res = response) => {

    const id = req.params.id;

    try {

        //Si se encunetra existe un usuario con ese id
        const ligaDB = await Liga.findById( id );
        
        // Si no existe
        if( !ligaDB ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe una liga con ese id'
            });
        }

        await Liga.findByIdAndDelete(id);
        
        res.json({
            ok: true,
            msg: 'Liga  eliminada'
        });
        
    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }

}



module.exports = {
    getLigas,
    CrearLiga,
    ActualizarLiga,
    eliminarLiga
}