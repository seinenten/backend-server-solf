const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
var generator =require('generate-password')

const Usuario = require('../models/usuario');
//configuracion para enviar correos.
enviarEmail=async (email,newPass)=>{

    const config={
        host:'smtp.gmail.com',
        port: 587,
        auth:{
            user:'websolf@gmail.com',
            pass:'pgoyeqzbcuijeiel'
        }
    }

    const mensaje ={
        from: 'websolf@gmail.com',
        to: email,
        subject: 'correo de pruebas ',
        text: ` Envio de  contraseña : ${newPass}`
    } 


    const transport=nodemailer.createTransport(config);
    const info = await transport.sendMail(mensaje);
    console.log(info);
}








const enviarCorreo=async(req,res=response)=>{
    const {nombre,email}= req.body;


    try {
        var usuarioDB= await Usuario.findOne({nombre});
        if(!usuarioDB){
            return res.status(400).json({
                ok:false,
                msg:'El usuario no existe'
            })
        }
        if(email!=usuarioDB.email){
            return res.status(400).json({
                ok:false,
                msg:'El correo no existe'
            })

        }
        
        var newPass=generator.generate({
            length:6,
            numbers:true,
            uppercase:false
        })

       

        const salt = bcrypt.genSaltSync();
        pass = bcrypt.hashSync( newPass, salt );
        password=usuarioDB.password
        password=pass
       await Usuario.updateOne({ nombre: nombre }, {
            $set: {
                password: password,
                
            }
        })
       
         

//se envia el correo
        enviarEmail(email,newPass);
        const Email=email
        return res.status(200).json({
            ok: true,
            msg: 'Correo Enviado',
            Email
        })


    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok:false,
            msg:'Nel'
        })
    }


}

module.exports={
    enviarEmail,
    enviarCorreo
}