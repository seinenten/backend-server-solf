const { response } = require("express");

const Pregunta = require('../models/pregunta');


const getPreguntas = async(req, res = response) => {

    //preguntas?desde=10&limite=3

    const desde =  Number(req.query.desde)  || 0;
    const limite = Number(req.query.limite) || 0;

    const preguntas = await Pregunta.find()
                    //obtener el nombre del usuario que creo el equipo, y sus otras propiedades
                    .populate('usuario', 'nombre apellidoP apellidoM img')
                    .skip( desde )
                    .limit( limite );
                                
                                

    res.status(200).json({
        ok: true,
        preguntas: preguntas
    })
}

const getPreguntasPorId = async(req, res = response) => {

    const id = req.params.id;

    try {
        const pregunta = await Pregunta.findById(id)
                    //obtener el nombre del usuario que creo el equipo, y sus otras propiedades
                    .populate('usuario', 'nombre apellidoP apellidoM img')

        res.status(200).json({
            ok: true,
            preguntas: pregunta
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }
}

const crearPregunta = async(req, res = response) => {

    const uid = req.uid;

    const pregunta = new Pregunta({
        usuario: uid,
        ...req.body
    });


    try {

        const preguntaDB = await pregunta.save();
        
        res.status(200).json({
            ok: true,
            pregunta: preguntaDB
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        }) 
        
    }
    
}

const actualizarPregunta = async(req, res = response) => {

    const id = req.params.id
    //tenemos el uid por que pasamos por la verificacion de jwt
    const uid = req.uid;

    try {
        const pregunta = await Pregunta.findById( id );

        if( !pregunta ){
            return res.status(404).json({
                ok: true,
                msg: 'Pregunta no encontrada por id'
            });
        }

        const cambioStatus = {
            ...req.body
        }

        const preguntaActualizada = await Pregunta.findByIdAndUpdate( id, cambioStatus, { new: true } );

        res.json({
            ok: true,
            pregunta: preguntaActualizada
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
    getPreguntas,
    actualizarPregunta,
    getPreguntasPorId,
    crearPregunta
}