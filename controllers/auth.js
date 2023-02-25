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
                msg: 'Email no valido'
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
const renovarToken= async(req,res= response)=>{
    const {uid }= req;
    const token = await generarJWT(uid);  

return res.json({
    ok: true,
    token
    
});
}

//login google
const googleSingIn = async( req , res = response) => {
     
    try {
        const { email, name, picture } = await googleverify( req.body.token );

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if ( !usuarioDB ) {
            usuario = new Usuario({ 
                nombre: name,
                apellidoP:"Trejo",
                apellidoM:"Cruz",
                role:"USER_ROLE",
                status: true,
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
            email, name, picture,
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