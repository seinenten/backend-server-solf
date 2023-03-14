const { response } = require("express");
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/jwt");
const { googleverify }= require("../helpers/google-verify")

//Menu
const { getMenuFronEnd } = require("../helpers/menu-frontend");

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
            token,
            menu: getMenuFronEnd( usuarioDB.role )
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
        usuario,
        menu: getMenuFronEnd( usuario.role )
    });

}

//login google
const googleSingIn = async( req , res = response) => {
// funcion para generar contraseña aleatoria
    const generatePassword =() => {

        let base = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let password = "";
        for (let x = 0; x < 8; x++) {
            let random = Math.floor(Math.random() * base.length);
            password += base.charAt(random);
        }
        // encriptar contraseña generada
        const salt = bcrypt.genSaltSync();
        password = bcrypt.hashSync( password, salt );

        return password;
    };


     try {
        const { email, picture, given_name, family_name  } = await googleverify( req.body.token );
        
        const password=generatePassword();

    
       
        const apellidos = family_name.split(' ')

        const usuarioDB = await Usuario.findOne({ email });

        let usuario;

        if ( !usuarioDB ) {

            
            usuario = new Usuario({ 

       
                // Arreglar nombre usar alguna funcion en el (familyname) para separar sus valores con el espacio
                nombre: given_name,
                apellidoP: apellidos[0] ,
                apellidoM: apellidos[1] ,
                email,
                password: password,
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
            name: given_name,
            apellidoP: apellidos[0],
            apellidoM:  apellidos[1],
            email, picture, 
            token,
            menu: getMenuFronEnd( usuario.role )
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