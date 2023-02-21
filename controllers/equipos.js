const { response } = require("express");

const Equipo = require('../models/equipo');


const getEquipos = async(req, res = response) => {

    const equipos = await Equipo.find()
                    //obtener el nombre del usuario que creo el hospital, y sus otras propiedades
                    .populate('usuario', 'nombre apellidoP apellidoM img')
                    .populate('liga', 'nombre img');
                                
                                

    res.status(200).json({
        ok: true,
        equipos: equipos
    })
}

const CrearEquipo = async(req, res = response) => {

    const uid = req.uid;

    const equipo = new Equipo({
        usuario: uid,
        ...req.body
    });


    try {

        const equipoDB = await equipo.save();
        
        res.status(200).json({
            ok: true,
            equipo: equipoDB
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        }) 
        
    }
    
}

const ActualizarEquipo = (req, res = response) => {

    res.status(200).json({
        ok: true,
        msg: 'Actualizar Equipo'
    })
}

const eliminarEquipo = async (req, res = response) => {

    const id = req.params.id;

    try {

        //Si se encunetra existe un usuario con ese id
        const equipoDB = await Equipo.findById( id );
        
        // Si no existe
        if( !equipoDB ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un equipo con ese id'
            });
        }

        await Equipo.findOneAndDelete( id );
        
        res.json({
            ok: true,
            msg: 'Equipo eliminado'
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
    getEquipos,
    CrearEquipo,
    ActualizarEquipo,
    eliminarEquipo
}