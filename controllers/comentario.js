const { response } = require("express");

const Comentario = require('../models/comentarios');


const getComentarios = async(req, res = response) => {

    //?estadios?desde=10&limite=3

    const desde =  Number(req.query.desde)  || 0;
    const limite = Number(req.query.limite) || 0;

    const productos = await Comentario.find()
                    //obtener el nombre del usuario que creo el estadio, y sus otras propiedades
                   
                    .skip( desde )
                    .limit( limite );
                                
                                

    res.status(200).json({
        ok: true,
        comentarios: comentarios
    })

    
}


const crearComentarios = async(req, res = response) => {



    const comentario = new Comentario({
       
        ...req.body
    });


    try {

        const comentarioDB = await comentario.save();
        
        res.status(200).json({
            ok: true,
            producto: comentarioDB
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
    
    getComentarios,
    crearComentarios,
    
}


