const { response } = require("express");

const Jugador = require('../models/jugador');


const getJugadores = async(req, res = response) => {

    const Jugadores = await Jugador.find()
                    //obtener el nombre del usuario que creo al jugador, y sus otras propiedades
                    .populate('usuario', 'nombre apellidoP apellidoM img')
                    .populate('liga', 'nombre img')
                    .populate('equipo', 'nombre img');
                                
                                

    res.status(200).json({
        ok: true,
        jugadores: Jugadores
    })
}

const CrearJugador = async(req, res = response) => {

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

const ActualizarJugador = (req, res = response) => {

    res.status(200).json({
        ok: true,
        msg: 'Actualizar Jugador'
    })
}

const eliminarJugador = (req, res = response) => {

    res.status(200).json({
        ok: true,
        msg: 'borrar Jugador'
    })
}



module.exports = {
    getJugadores,
    CrearJugador,
    ActualizarJugador,
    eliminarJugador
}