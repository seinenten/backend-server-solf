const { response } = require('express');
const bcrypt = require('bcryptjs');

const usuario = require('../models/usuario');
const respaldo = require('../models/respaldo');
const { generarJWT } = require("../helpers/jwt");
const copiaBD=async(req,res=response)=>{
  const uid = req.uid;
  
 
    try {

     const fechaHora= new Date();
     
      
         const { exec } = require('child_process');

           exec('respaldo.bat', (error, stdout, stderr) => {
              if (error) {
             console.error(`Error al ejecutar respaldo.bat: ${error.message}`);
             return;
            }
         if (stderr) {
             console.error(`Error de salida: ${stderr}`);
              return;
           }
          console.log(`Salida: ${stdout}`);
  
         })
     
        // const user=  await 
        //   usuario.findById({"_id":req.uid});
        
       
        
        const user=  await usuario.findById(uid)
        .populate('usuario', 'nombre apellidoP apellidoM');

        return res.status(200).json({
            
           usuario:{
            nombre:user.nombre,
            apellidoP:user.apellidoP,
            apellidoM:user.apellidoM,
            accion:"Respaldo",
            fecha:fechaHora.toLocaleDateString(),
            Hora:fechaHora.toLocaleTimeString(),
           
           }
           
            
          });
         

        
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok:false,
            msg:'error'
        })
        
    }

}


const restaurarBD=async(req,res=response)=>{
const uid= req.uid

    try {
        const fechaHora= new Date();
        const { exec } = require('child_process');

exec('subirRespaldo.bat', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error al ejecutar subirRespaldo.bat: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Error de salida: ${stderr}`);
    return;
  }
  console.log(`Salida: ${stdout}`);
  
})
const user=  await usuario.findById(uid)
.populate('usuario', 'nombre apellidoP apellidoM');

return res.status(200).json({
    usuario:{
        nombre:user.nombre,
        apellidoP:user.apellidoP,
        apellidoM:user.apellidoM,
        accion:"Restauracion",
        fecha:fechaHora.toLocaleDateString(),
        Hora:fechaHora.toLocaleTimeString(),
       
       }
       
    
});


        
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok:false,
            msg:'El usuario no existe'
        })
        
    }

}

module.exports={
    copiaBD,
    restaurarBD
}