const { response } = require("express");
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/jwt");
const { googleverify }= require("../helpers/google-verify")

const login = async( req , res = response) => {

    const { email, password  } = req.body;

    try {

        // Verificar email

        const usuarioDB = await Usuario.findOne( { email } );

        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            })
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if ( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            });
        }

        // Generar token
        const token = await generarJWT( usuarioDB.id );

        res.json({
            ok: true,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

    



}

const renovarToken= async(req,res= response) => {
    const uid = req.uid;

    //Generar el token - JWT
    const token = await generarJWT(uid);  

    //Obtener el usuario por UID
    const usuario = await Usuario.findById( uid );

    return res.json({
        ok: true,
        token,
        usuario
    });

}

//login google
const googleSingIn = async( req , res = response) => {
         
    try {
        const { email, name, picture, given_name, family_name  } = await googleverify( req.body.token );
        
        const apellidos = family_name.split(' ')
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if ( !usuarioDB ) {
            usuario = new Usuario({ 
                // Arreglar nombre usar alguna funcion en el (familyname) para separar sus valores con el espacio
                nombre: given_name,
                //
                apellidoP: apellidos[0] ,
                apellidoM: apellidos[1] ,
                
                email,
                password: '@@@',
                img: picture,
                google: true
            })
        } else {
            usuario = usuarioDB;
            usuario.google = true;
             //usuario.password = '@@';
        }

        // Guardar Usuario
        await usuario.save();

        // Generar el TOKEN - JWT
        const token = await generarJWT( usuario.id );


        res.json({
            ok: true,
            email, name, picture, given_name, family_name ,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Token de Google no es correcto'
        });
    }

    
    
    
}




module.exports = {
    login,
    renovarToken,
    googleSingIn        
}