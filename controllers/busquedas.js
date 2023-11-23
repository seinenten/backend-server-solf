const { response } = require("express");

const Usuario = require('../models/usuario');
const Liga = require('../models/liga');
const Equipo = require('../models/equipo');
const Jugador = require('../models/jugador');
const Producto = require('../models/productos');
const Curso = require('../models/curso');


const busquedaTotal = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i' );

    
    const [ usuarios, ligas, equipos, jugadores, productos, cursos ] = await Promise.all([
        
        Usuario.find({ nombre: regex }),
        Liga.find({ nombre: regex }),
        Equipo.find({ nombre: regex }),
        Jugador.find({ nombre: regex }),
        Producto.find({ nombre: regex }),
        Curso.find({nombre: regex })
    ]);

    res.json( {
        ok: true,
        usuarios,
        ligas,
        equipos,
        jugadores,
        productos,
        cursos
    });

}

const getDocumentosColeccion = async(req, res = response) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i' );

    let data = [];

    switch (tabla) {

        case 'jugadores':
            data = await Jugador.find({ nombre: regex })
                                .populate('usuario', 'nombre apellidoP apellidoM img')
                                .populate('liga', 'nombre img')
                                .populate('equipo', 'nombre img');
        break;

        case 'equipos':
            data = await Equipo.find({ nombre: regex })
                            .populate('usuario', 'nombre apellidoP apellidoM img')
                            .populate('liga', 'nombre img');
        break;

        case 'ligas':
            data = await Liga.find({ nombre: regex })
                            .populate('usuario', 'nombre apellidoP apellidoM img');
        break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regex })

        case 'productos':
                data = await Producto.find({ nombre: regex })
    
        break;

        case 'cursos':
                data = await Curso.find({ nombre: regex })
    
        break;


        default: 

            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/ligas/equipos/jugadores/cursos'
            });
        
    }

    res.json({
        ok: true,
        resultados: data
    });
}






module.exports = {
    busquedaTotal,
    getDocumentosColeccion
}