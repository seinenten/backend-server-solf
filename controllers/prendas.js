const { response } = require("express");


const Prenda = require('../models/prenda');


const getPrendas = async(req, res = response) => {

    //prendas?desde=10&limite=3

    const desde =  Number(req.query.desde)  || 0;
    const limite = Number(req.query.limite) || 0;

    const prendas = await Prenda.find()
                                //obtener el nombre del usuario que creo la liga, y sus otras propiedades
                                .populate('liga' , 'nombre descripcion talla precio img')
                                    .skip( desde )
                                    .limit( limite )

    res.status(200).json({
        ok: true,
        prendas: prendas
    });
}

const getPrendasPorId = async(req, res = response) => {

    const id = req.params.id
    try {

        const prenda = await Prenda.findById(id)
                                    //obtener el nombre del usuario que creo la liga, y sus otras propiedades
                                    .populate('liga' , 'nombre descripcion talla precio img');
    
        res.status(200).json({
            ok: true,
            prenda: prenda
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
        
        
    }

}

const CrearPrenda = async(req, res = response) => {

    const prenda = new Prenda({
        ...req.body
    } );
    try {

        const prendaDB= await prenda.save();
        
        res.status(200).json({
            ok: true,
            prenda: prendaDB
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }


}

const ActualizarPrenda = async(req, res = response) => {

    const id = req.params.id

    try {

        const prenda = await Prenda.findById( id );

        if( !prenda ){
            return res.status(404).json({
                ok: true,
                msg: 'Prenda no encontrado por id'
            });
        }

        const cambiosPrenda = {
            ...req.body
        }

        const prendaActualizado = await Prenda.findByIdAndUpdate( id, cambiosPrenda, { new: true } );

        res.json({
            ok: true,
            prenda: prendaActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }


}

const eliminarPrenda= async(req, res = response) => {

    const id = req.params.id

    try {

        const prenda = await Prenda.findById( id );

        if( !prenda ){
            return res.status(404).json({
                ok: true,
                msg: 'Prenda no encontrada por id'
            });
        }

        await Prenda.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Prenda eliminada'
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
    ActualizarPrenda,
    CrearPrenda,
    getPrendasPorId,
    getPrendas,
    eliminarPrenda
}