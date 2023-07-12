const { response } = require("express");

const Equipo = require('../models/equipo');


const getEquipos = async(req, res = response) => {

    //equipos?desde=10&limite=3

    const desde =  Number(req.query.desde)  || 0;
    const limite = Number(req.query.limite) || 0;

    const equipos = await Equipo.find()
                    //obtener el nombre del usuario que creo el equipo, y sus otras propiedades
                    .populate('usuario', 'nombre apellidoP apellidoM img')
                    .populate('liga', 'nombre img descripcion tipoCategoria tipoJuego')
                    .skip( desde )
                    .limit( limite );
                                
                                

    res.status(200).json({
        ok: true,
        equipos: equipos
    })
}

const getEquiposPorliga = async(req, res = response) => {

    const id = req.params.id;

    //equipos?desde=10&limite=3

    const desde =  Number(req.query.desde)  || 0;
    const limite = Number(req.query.limite) || 0;

    const equipos = await Equipo.find({"liga":id,"status":true})
                    
                    .skip( desde )
                    .limit( limite );
                                
                                

    res.status(200).json({
        ok: true,
        equipos: equipos
    })
}

const getEquiposPorStatusTrue = async(req, res = response) => {

    //equipos?desde=10&limite=3

    const desde =  Number(req.query.desde)  || 0;
    const limite = Number(req.query.limite) || 0;

    const equipos = await Equipo.find({"status":true})
                    
                    .skip( desde )
                    .limit( limite );
                                
                                

    res.status(200).json({
        ok: true,
        equipos: equipos
    })
}

const getEquiposPorStatusFalse = async(req, res = response) => {

    //equipos?desde=10&limite=3

    const desde =  Number(req.query.desde)  || 0;
    const limite = Number(req.query.limite) || 0;

    const equipos = await Equipo.find({"status":false})
                    
                    .skip( desde )
                    .limit( limite );
                                
                                

    res.status(200).json({
        ok: true,
        equipos: equipos
    })
}

const getEquiposPorId = async(req, res = response) => {

    const id = req.params.id;

    try {
        const equipo = await Equipo.findById(id)
                    //obtener el nombre del usuario que creo el equipo, y sus otras propiedades
                    .populate('usuario', 'nombre apellidoP apellidoM img')
                    .populate('liga', 'nombre img');

        res.status(200).json({
            ok: true,
            equipo: equipo
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }
}

const getEquiposPorNombre = async (req, res) => {
    const busqueda = req.params.nombre;
    const regex = new RegExp(busqueda, 'i');
    const limite = Number(req.query.limite) || 0;

    let equipos;
    equipos = await Equipo.find({ nombre: regex }, 'nombre img descripcion')
        .populate('liga', 'nombre descripcion tipoCategoria img tipoJuego')
        .limit(limite);

    res.json({
        ok: true,
        equipos
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

const ActualizarEquipo = async(req, res = response) => {

    const id = req.params.id
    //tenemos el uid por que pasamos por la verificacion de jwt
    const uid = req.uid;

    try {
        const equipo = await Equipo.findById( id );

        if( !equipo ){
            return res.status(404).json({
                ok: true,
                msg: 'Equipo no encontrado por id'
            });
        }

        const cambioStatus = {
            ...req.body
        }

        const equipoActualizado = await Equipo.findByIdAndUpdate( id, cambioStatus, { new: true } );

        res.json({
            ok: true,
            equipo: equipoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
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

        const cambiosEquipo = {
            ...req.body,
            usuario: id
        }

        await Equipo.findByIdAndUpdate( id, cambiosEquipo, { new: true } );
        
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
    getEquiposPorId,
    CrearEquipo,
    ActualizarEquipo,
    eliminarEquipo,
    getEquiposPorStatusFalse,
    getEquiposPorStatusTrue,
    getEquiposPorliga,
    getEquiposPorNombre
}