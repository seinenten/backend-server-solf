const { response } = require("express");

const Producto = require('../models/productos');

const getProductos = async(req, res = response) => {

    //?estadios?desde=10&limite=3

    const desde =  Number(req.query.desde)  || 0;
    const limite = Number(req.query.limite) || 0;

    const productos = await Producto.find()
                    //obtener el nombre del usuario que creo el estadio, y sus otras propiedades
                   
                    .skip( desde )
                    .limit( limite );
                                
                                

    res.status(200).json({
        ok: true,
        productos: productos
    })

    
}

const getProductosPorId = async(req, res = response) => {

    const id = req.params.id;

    try {

        const productos = await Producto.findById(id)
                    //?obtener el nombre del usuario que creo el estadio, y sus otras propiedades
                  
        
        res.status(200).json({
            ok: true,
            productos: productos
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
    
}

const crearProductos = async(req, res = response) => {

    const uid = req.uid;

    const producto = new Producto({
       
        ...req.body
    });


    try {

        const productoDB = await producto.save();
        
        res.status(200).json({
            ok: true,
            producto: productoDB
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        }) 
        
    }

}

const actualizarProductos = async(req, res = response) => {

    const id = req.params.id
    //tenemos el uid por que pasamos por la verificacion de jwt
    const uid = req.uid;

    try {
        const estadio = await Estadio.findById( id );

        if( !estadio ){
            return res.status(404).json({
                ok: true,
                msg: 'Estadio no encontrado por id'
            });
        }

        const cambioStatus = {
            ...req.body
        }

        const estadioActualizado = await Estadio.findByIdAndUpdate( id, cambioStatus, { new: true } );

        res.json({
            ok: true,
            estadio: estadioActualizado
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
    actualizarProductos,
    crearProductos,
    getProductos,
    getProductosPorId
}


