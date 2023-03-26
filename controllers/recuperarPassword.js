const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
var generator =require('generate-password')

const Usuario = require('../models/usuario');
//configuracion para enviar correos.
enviarLink=async (email)=>{

    const config={
        host:'smtp.gmail.com',
        port: 587,
        auth:{
            user:'websolf@gmail.com',
            pass:'pgoyeqzbcuijeiel'
        }
    }

    const link ={
        from: 'websolf@gmail.com',
        to: email,
        subject: 'Contraseña restablecida ',
        //link para restablecer la contraseña
        text: ` Su contraseña ha sido restablecida correctamente : https://solf.onrender.com/auth/login`
        
    } 


    const transport=nodemailer.createTransport(config);
    const info = await transport.sendMail(link);
    console.log(info);
}


//envio de email 
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
        text: ` Envio de  contraseña :  ${newPass}`
        //https://solf.onrender.com/auth/login
    } 


    const transport=nodemailer.createTransport(config);
    const info = await transport.sendMail(mensaje);
    console.log(info);
}





//se envia el email con el password generado
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
                msg:'El correo es incorrecto'
            })

        }
        
// se genera una nueva contraseña
        var newPass=generator.generate({
            length:6,
            numbers:true,
            uppercase:false
        })

//se encripta la contraseña generada
       

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



//recuperar contraseña por pregunta secreta



const preguntaSecreta=async(req,res=response)=>{
    const {respuesta,email,newPassword}= req.body;


    try {
        var usuarioDB= await Usuario.findOne({respuesta});
        if(!usuarioDB){
            return res.status(400).json({
                ok:false,
                msg:'La respuesta es incorrecta'
            })
        }
     //Se encripta la nueva contraseña 
        const salt = bcrypt.genSaltSync();
        pass = bcrypt.hashSync( newPassword, salt );
        password=usuarioDB.password
        password=pass
        await Usuario.updateOne({ respuesta: respuesta }, {
            $set: {
                password: password,
                
            }
        })
       
         

//se envia el correo para logearse con la nueva contraseña
        enviarLink(email);
        const Email=email
        return res.status(200).json({
            ok: true,
            msg: `Correo Enviado a ${Email} `
            
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
    enviarCorreo,
    enviarLink,
    preguntaSecreta
}