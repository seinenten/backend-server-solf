const fs = require('fs');

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const Usuario = require('../models/usuario');
const Equipo = require('../models/equipo');
const Liga = require('../models/liga');
const Carrusel = require('../models/carrusel');
const Jugador = require('../models/jugador');
const Curso = require('../models/curso');

const borrarImagen = ( ) => {
    
    
}

const actualizarImagen = async( tipo, id,nombreArchivo) => {
    
    
    switch ( tipo ) {
        case 'equipos':

            const equipo = await Equipo.findById(id);
            if(equipo.img){
                const nombreArr = equipo.img.split('/');
                const nombre    = nombreArr[ nombreArr.length - 1 ];
                const [ public_id ] = nombre.split('.');
                cloudinary.uploader.destroy(public_id);
                
            
            }
            if( !equipo ){
                console.log('No es un equipo por id');
                return false;
            }    

            


            
            equipo.img = nombreArchivo;
            await equipo.save();
            return true;

        break;

        case 'ligas':

            const liga = await Liga.findById(id);
            if(liga.img){
                const nombreArr = liga.img.split('/');
                const nombre    = nombreArr[ nombreArr.length - 1 ];
                const [ public_id ] = nombre.split('.');
                cloudinary.uploader.destroy(public_id);
                
            
            }
            if( !liga ){
                console.log('No es una liga por id');
                return false;
            }    

            liga.img = nombreArchivo;

            
            await liga.save();

            return true;
        
        break;
    
        case 'usuarios':

            const usuario = await Usuario.findById(id);
            if(usuario.img){
                const nombreArr = usuario.img.split('/');
                const nombre    = nombreArr[ nombreArr.length - 1 ];
                const [ public_id ] = nombre.split('.');
                cloudinary.uploader.destroy(public_id);
                
            }
            if( !usuario ){
                console.log('No es un usuario por id');
                return false;
            }    

            


            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
        
        break;

        case 'jugadores':

            const jugador = await Jugador.findById(id);
            if(jugador.img){
                const nombreArr = jugador.img.split('/');
                const nombre    = nombreArr[ nombreArr.length - 1 ];
                const [ public_id ] = nombre.split('.');
                cloudinary.uploader.destroy(public_id);
                

            }
            if( !jugador ){
                console.log('No es un jugador por id');
                return false;
            }    


            jugador.img = nombreArchivo;
            await jugador.save();
            return true;
        
        break;
        case 'carruseles':
            const carrusel = await Carrusel.findById(id);
            if(carrusel.img){
                const nombreArr = carrusel.img.split('/');
                const nombre    = nombreArr[ nombreArr.length - 1 ];
                const [ public_id ] = nombre.split('.');
                cloudinary.uploader.destroy(public_id);
                
            }
            if( !carrusel ){
                console.log('No es un carrusel por id');
                return false;
            }    


            carrusel.img = nombreArchivo;
            await carrusel.save();
            return true;
        
        break;

        case 'cursos': 
            const curso = await Curso.findById(id);
            if(curso.img){
                const nombreArr = curso.img.split('/');
                const nombre = nombreArr[ nombreArr.length - 1 ];
                const [ public_id ] = nombre.split('.');
                cloudinary.uploader.destroy(public_id);
            }
            if( !curso ){
                console.log('No es un curso por id');
                return false;
            }

            curso.img = nombreArchivo;
            await curso.save();
            return true;

        break;

        default:

    }


}



module.exports = {
    actualizarImagen
}