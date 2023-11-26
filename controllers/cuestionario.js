const { response } = require("express");

const CuestionarioPre = require('../models/encuestaPre');
const CuestionarioRes = require('../models/encuestaRes');

const getPreguntas = async (req, res = response) => {

    const desde = Number(req.query.desde ) || 0;
    const limite = Number(req.query.limite ) || 0;

    const preguntas = await CuestionarioPre.find()
        .skip(desde)
        .limit(limite);


    res.status(200).json({
        ok: true,
        preguntas: preguntas
    })

}

const getRespuestasPorIdPregunta = async(req, res = response) => {

    const id = req.params.id;

    try {
        const respuestas = await CuestionarioRes.find({ "preguntaId":id })
                    //obtener el nombre del usuario que creo el equipo, y sus otras propiedades
                    .populate('preguntaId', 'pregunta');

        res.status(200).json({
            ok: true,
            respuestas: respuestas
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }
}

const crearPregunta = async ( req, res = response) => {

    const uid = req.uid;

    try {

        // Crear pregunta
        const pregunta = new CuestionarioPre({
            usuario: uid,
            ...req.body
        });

        const preguntaDB = await pregunta.save();
    
        res.status(200).json({
            ok: true,
            pregunta: preguntaDB,
        });
    }catch (error) {
        console.log(error);
        res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador',
        });
    }

};


module.exports = {
    getPreguntas,
    getRespuestasPorIdPregunta,
    crearPregunta
}