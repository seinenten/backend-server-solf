const nodemailer = require('nodemailer');


const Usuario = require('../models/usuario');

enviarEmail=async ()=>{

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
        to: 'websolf@gmail.com',
        subject: 'correo de pruebas ',
        text: ' Envio de link para restablecer la contraseña'
    } 


    const transport=nodemailer.createTransport(config);
    const info = await transport.sendMail(mensaje);
    console.log(info);
}








const enviarCorreo=async(req,res=response)=>{
    const {nombre,email}= req.body;


    try {
        const usuarioDB= await Usuario.findOne({nombre});
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

        enviarEmail();
        return res.status(200).json({
            ok: true,
            msg: 'Correo Enviado'
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