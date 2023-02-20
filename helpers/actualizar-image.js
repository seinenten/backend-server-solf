const fs = require('fs');

const Usuario = require('../models/usuario');
const Equipo = require('../models/equipo');
const Liga = require('../models/liga');
const Jugador = require('../models/jugador');

const borrarImagen = ( path ) => {
    
    if( fs.existsSync( path ) ){
        //borrar la imagen anterior
        fs.unlinkSync( path );
    }
}

const actualizarImagen = async( tipo, id, nombreArchivo ) => {
    
    let pathViejo = '';

    switch ( tipo ) {
        case 'equipos':

            const equipo = await Equipo.findById(id);
            if( !equipo ){
                console.log('No es un equipo por id');
                return false;
            }    

            pathViejo = `./uploads/equipos/${ equipo.img }`;
            borrarImagen(pathViejo);


            equipo.img = nombreArchivo;
            await equipo.save();
            return true;

        break;

        case 'ligas':

            const liga = await Liga.findById(id);
            if( !liga ){
                console.log('No es una liga por id');
                return false;
            }    

            pathViejo = `./uploads/ligas/${ liga.img }`;
            borrarImagen(pathViejo);


            liga.img = nombreArchivo;
            await liga.save();
            return true;
        
        break;
    
        case 'usuarios':

            const usuario = await Usuario.findById(id);
            if( !usuario ){
                console.log('No es un usuario por id');
                return false;
            }    

            pathViejo = `./uploads/usuarios/${ usuario.img }`;
            borrarImagen(pathViejo);


            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
        
        break;

        case 'jugadores':

            const jugador = await Jugador.findById(id);
            if( !jugador ){
                console.log('No es un jugador por id');
                return false;
            }    

            pathViejo = `./uploads/jugadores/${ jugador.img }`;
            borrarImagen(pathViejo);


            jugador.img = nombreArchivo;
            await jugador.save();
            return true;
        
        break;

        default:

    }


}



module.exports = {
    actualizarImagen
}