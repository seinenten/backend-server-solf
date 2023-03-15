const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/jwt");

const getUsuarios = async(req, res) => {

    ///usuarios?desde=10&limite=3
    const desde =  Number(req.query.desde)  || 0;
    const limite = Number(req.query.limite) || 0;

    // const usuarios = await Usuario.find({}, 'nombre email role google')
    //                             .skip( desde )
    //                             .limit( limite );

    // const total = await Usuario.count();
    
    //Segunda version del codigo mas eficiente, se desestruturan los resultados
    const [ usuarios, total ] = await Promise.all([
        Usuario
            .find({}, ' nombre apellidoP apellidoM email role google img')
            .skip( desde )
            .limit( limite ),

        Usuario.countDocuments()
    ]);


    res.json( {
        ok: true,
        usuarios,
        uid: req.uid,
        total
    });
}

const getEmails = async(req, res) => {
    const busqueda = req.params.email;
    const regex = new RegExp( busqueda, 'i' );

        const  emails= await Usuario.find( { email: regex }, 'email' )


    res.json( {
        ok: true,
        emails
    })


}

const getUsuariosporStatusTrue = async(req, res) => {

    ///usuarios?desde=10&limite=3
    
    const desde =  Number(req.query.desde)  || 0;
    const limite = Number(req.query.limite) || 0;

    // const usuarios = await Usuario.find({}, 'nombre email role google')
    //                             .skip( desde )
    //                             .limit( limite );

    // const total = await Usuario.count();
    
    //Segunda version del codigo mas eficiente, se desestruturan los resultados

    const [ usuarios, total ] = await Promise.all([
        Usuario
            .find({"status":true}, 'status nombre apellidoP apellidoM email role google img')
            .skip( desde )
            .limit( limite ),

        Usuario.countDocuments()
    ]);

    res.json( {
        ok: true,
        usuarios,
        uid: req.uid,
        
    });
}

const getUsuariosporStatusFalse = async(req, res) => {

    ///usuarios?desde=10&limite=3
    
    const desde =  Number(req.query.desde)  || 0;
    const limite = Number(req.query.limite) || 0;

    // const usuarios = await Usuario.find({}, 'nombre email role google')
    //                             .skip( desde )
    //                             .limit( limite );

    // const total = await Usuario.count();
    
    //Segunda version del codigo mas eficiente, se desestruturan los resultados

    const [ usuarios, total ] = await Promise.all([
        Usuario
            .find({"status":false}, 'status nombre apellidoP apellidoM email role google img')
            .skip( desde )
            .limit( limite ),

        Usuario.countDocuments()
    ]);

    res.json( {
        ok: true,
        usuarios,
        uid: req.uid,
      
    });
}

const crearUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    
    try {

        const existeEmail = await Usuario.findOne( {email} );

        if ( existeEmail ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        const usuario = new Usuario( req.body );

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );


        // Guardar Usuario
        await usuario.save();

        // Generar token
        const token = await generarJWT( usuario.id );
    
        res.json( {
            ok: true,
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        })
    }

}

const actualizarUsuario = async( req, res = response ) => {

    const uid = req.params.id;

    try {

        //Si se encunetra existe un usuario con ese id
        const usuarioDB = await Usuario.findById( uid );
        
        // Si no existe
        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        // Actualizaciones
        const { password, google, email ,...campos } = req.body;

        if ( usuarioDB.email !== email ){

            const existeEmail = await Usuario.findOne( { email });

            if( existeEmail ){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }

        //Si se intenta modificar el email de las cuentas de google registradas
        if( !usuarioDB.google ){
            campos.email = email;
        } else if (usuarioDB.email !== email){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario de google no pueden cambiar su correo'
            })
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } );


        res.json({
            ok:true,
            usuario: usuarioActualizado
        });

        
    } catch (error) {
        console.log(error); 
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}

const eliminarUsuario = async( req, res = response ) => { 

    const uid = req.params.id;

    try {

        //Si se encunetra existe un usuario con ese id
        const usuarioDB = await Usuario.findById( uid );
        
        // Si no existe
        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        const cambioStatus = {
            ...req.body
        }

        await Usuario.findByIdAndUpdate( uid, cambioStatus, { new: true }  );
        
        res.json({
            ok: true,
            msg: 'usuario eliminado'
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
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    getUsuariosporStatusFalse,
    getUsuariosporStatusTrue,
    getEmails
}