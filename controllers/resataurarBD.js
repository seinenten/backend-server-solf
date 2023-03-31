

const copiaBD=async(req,res=response)=>{

    try {
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
return res.status(200).json({
    ok:true,
    msg:'ejecutado'
});



        
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok:false,
            msg:'El usuario no existe'
        })
        
    }

}


const restaurarBD=async(req,res=response)=>{

    try {
        const { exec } = require('child_process');

exec('subirRespaldo.bat', (error, stdout, stderr) => {
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
return res.status(200).json({
    ok:true,
    msg:'ejecutado'
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