const { response } = require("express");


const Liga = require('../models/liga');
const usuario = require("../models/usuario");


const getLigas = async(req, res = response) => {

    //ligas?desde=10&limite=3

    const desde =  Number(req.query.desde)  || 0;
    const limite = Number(req.query.limite) || 0;

    const ligas = await Liga.find()
                                //obtener el nombre del usuario que creo la liga, y sus otras propiedades
                                .populate('usuario', 'nombre apellidoP apellidoM img')
                                    .skip( desde )
                                    .limit( limite )

    res.status(200).json({
        ok: true,
        ligas: ligas
    });
}
const getLigasPorStatusTrue = async(req, res = response) => {

    //ligas?desde=10&limite=3

    const desde =  Number(req.query.desde)  || 0;
    const limite = Number(req.query.limite) || 0;

    const ligas = await Liga.find({"status":true})
                                //obtener el nombre del usuario que creo la liga, y sus otras propiedades
                                .populate('usuario', 'nombre apellidoP apellidoM img')
                                    .skip( desde )
                                    .limit( limite );

    res.status(200).json({
        ok: true,
        ligas: ligas
    });
}
const getLigasPorStatusFalse = async(req, res = response) => {

    //ligas?desde=10&limite=3

    const desde =  Number(req.query.desde)  || 0;
    const limite = Number(req.query.limite) || 0;

    const ligas = await Liga.find({"status":false})
                                //obtener el nombre del usuario que creo la liga, y sus otras propiedades
                                .populate('usuario', 'nombre apellidoP apellidoM img')
                                    .skip( desde )
                                    .limit( limite );

    res.status(200).json({
        ok: true,
        ligas: ligas
    });
}

const getLigasPorId = async(req, res = response) => {

    const id = req.params.id
    try {

        const liga = await Liga.findById(id)
                                    //obtener el nombre del usuario que creo la liga, y sus otras propiedades
                                    .populate('usuario', 'nombre apellidoP apellidoM img');
    
        res.status(200).json({
            ok: true,
            liga: liga
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
        
        
    }

}

const getLigasPorNombre = async(req, res) => {
    const busqueda = req.params.liga;
    const regex = new RegExp( busqueda, 'i' );
    const limite = Number(req.query.limite) || 0;
    const tipocategoria = req.query.tipocategoria || '';
    const tipojuego = req.query.tipojuego || '';

    // tipoCategoria: 'libre'
        let ligas;
        if(tipocategoria === '' && tipojuego === ''){
            ligas= await Liga.find( { nombre: regex } , 'nombre tipoCategoria tipoJuego descripcion' )
                                                .limit( limite );

        }else if(tipocategoria !== '' && tipojuego === ''){
            ligas= await Liga.find( { nombre: regex, tipoCategoria: tipocategoria } , 'nombre tipoCategoria tipoJuego' )
                                                .limit( limite );

        }else if(tipocategoria === '' && tipojuego !== ''){
            ligas= await Liga.find( { nombre: regex, tipoJuego: tipojuego } , 'nombre tipoCategoria tipoJuego' )
                                                .limit( limite );
        }else if(tipocategoria !== '' && tipojuego !== ''){
            ligas= await Liga.find( { nombre: regex, tipoJuego: tipojuego, tipoCategoria: tipocategoria } , 'nombre tipoCategoria tipoJuego' )
                                                .limit( limite );
        }

        



    res.json( {
        ok: true,
        ligas
    })

}


const CrearLiga = async(req, res = response) => {

    const uid = req.uid;

    try {

        const user=  await usuario.findById(uid)
                                    .populate('usuario', 'nombre apellidoP apellidoM');
        
        //ToDos Verificar si el usuario tiene ligas disponibles
        if (!user || user.ligasDisp <= 0) {
            return res.status(500).json({
                ok: false,
                msg: 'No tiene ligas disponibles'
            });
        }

        //ToDos Restar 1 a ligasDisp
        user.ligasDisp -= 1;
        await user.save();

        const liga = new Liga({
            usuario: uid,
            ...req.body
        } );

        const ligaDB= await liga.save();
        
        res.status(200).json({
            ok: true,
            liga: ligaDB,
            nombreUsuario:user.nombre,
            apellido:user.apellidoP
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

        const ligaActualizado = await Liga.findByIdAndUpdate( id, cambiosLiga, { new: true } );

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

        const cambioStatus = {
            ...req.body
        }

        await Liga.findByIdAndUpdate( id, cambioStatus, { new: true } );
        
        res.json({
            ok: true,
            msg: 'Liga eliminada'
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
    getLigas,
    CrearLiga,
    ActualizarLiga,
    eliminarLiga,
    getLigasPorId,
    getLigasPorStatusTrue,
    getLigasPorStatusFalse,
    getLigasPorNombre
}