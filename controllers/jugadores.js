const { response } = require("express");

const Jugador = require('../models/jugador');


const getJugadores = async (req, res = response) => {

    //jugadores?desde=10&limite=3

    const desde = Number(req.query.desde) || 0;
    const limite = Number(req.query.limite) || 0;

    const jugadores = await Jugador.find()
        //obtener el nombre del usuario que creo al jugador, y sus otras propiedades
        .populate('usuario', 'nombre apellidoP apellidoM img')
        .populate('equipo', 'nombre img descripcion liga')
        .skip(desde)
        .limit(limite);



    res.status(200).json({
        ok: true,
        jugadores: jugadores
    })
}


const getjugadoresPorNombre = async (req, res) => {
    const busqueda = req.params.nombre;
    const regex = new RegExp(busqueda, 'i');
    const limite = Number(req.query.limite) || 0;

    // tipoCategoria: 'libre'
    let jugador;
    jugador = await Jugador.find({ nombre: regex }, 'nombre apellidoP apellidoM img ')
        .limit(limite);





    res.json({
        ok: true,
        jugador
    })

}


const getJugadoresPorStatusTrue = async (req, res = response) => {

    //jugadores?desde=10&limite=3

    const desde = Number(req.query.desde) || 0;
    const limite = Number(req.query.limite) || 0;

    const jugadores = await Jugador.find({ "status": true })
        .populate('usuario', 'nombre apellidoP apellidoM img')
        .populate('equipo', 'nombre img liga')
        .skip(desde)
        .limit(limite);



    res.status(200).json({
        ok: true,
        jugadores: jugadores
    })
}

const getJugadoresPorStatusFalse = async (req, res = response) => {

    //jugadores?desde=10&limite=3

    const desde = Number(req.query.desde) || 0;
    const limite = Number(req.query.limite) || 0;

    const jugadores = await Jugador.find({ "status": false })
        .populate('usuario', 'nombre apellidoP apellidoM img')
        .populate('equipo', 'nombre img liga')
        .skip(desde)
        .limit(limite);



    res.status(200).json({
        ok: true,
        jugadores: jugadores
    })
}

const getJugadoresPorId = async (req, res = response) => {

    const id = req.params.id;

    try {

        const jugador = await Jugador.findById(id)
            //obtener el nombre del usuario que creo al jugador, y sus otras propiedades
            .populate('usuario', 'nombre apellidoP apellidoM img')
            .populate('equipo', 'nombre img descripcion liga')

        res.status(200).json({
            ok: true,
            jugador: jugador
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: true,
            msg: 'Hable con el administrador'
        })

    }
}

const CrearJugador = async (req, res = response) => {

    const uid = req.uid;

    const jugador = new Jugador({
        usuario: uid,
        ...req.body
    });


    try {

        const jugadorDB = await jugador.save();

        res.status(200).json({
            ok: true,
            jugador: jugadorDB
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }

}

const ActualizarJugador = async (req, res = response) => {

    const id = req.params.id
    //tenemos el uid por que pasamos por la verificacion de jwt
    const uid = req.uid;

    try {
        const jugador = await Jugador.findById(id);

        if (!jugador) {
            return res.status(404).json({
                ok: true,
                msg: 'Jugador no encontrado por id'
            });
        }

        const cambiosJugador = {
            ...req.body,
            usuario: uid
        }

        const jugadorActualizado = await Jugador.findByIdAndUpdate(id, cambiosJugador, { new: true });

        res.json({
            ok: true,
            jugador: jugadorActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const eliminarJugador = async (req, res = response) => {
    const id = req.params.id;

    try {

        //Si se encunetra existe un usuario con ese id
        const jugadorDB = await Jugador.findById(id);

        // Si no existe
        if (!jugadorDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un jugador con ese id'
            });
        }

        const cambioStatus = {
            ...req.body
        }

        await Jugador.findByIdAndUpdate(id, cambioStatus, { new: true });

        res.json({
            ok: true,
            msg: 'Jugador eliminado'
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
    getJugadores,
    getjugadoresPorNombre,
    getJugadoresPorId,
    CrearJugador,
    ActualizarJugador,
    eliminarJugador,
    getJugadoresPorStatusFalse,
    getJugadoresPorStatusTrue
}