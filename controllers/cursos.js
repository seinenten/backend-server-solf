const { response } = require("express");

const Curso = require('../models/curso');

const getCursos = async (req, res = response) => {

    const desde = Number(req.query.desde ) || 0;
    const limite = Number(req.query.limite ) || 0;

    const cursos = await Curso.find()
        .skip(desde)
        .limit(limite);


    res.status(200).json({
        ok: true,
        cursos: cursos
    })

}

const getCursoPorId = async(req, res = response) => {

    const id = req.params.id;

    try {
        const curso = await Curso.findById(id)
                    //obtener el nombre del usuario que creo el equipo, y sus otras propiedades
                    .populate('usuario', 'nombre apellidoP apellidoM img');

        res.status(200).json({
            ok: true,
            curso: curso
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
        
    }
}

const getCursosPorNombre = async (req, res = response) => {
    const busqueda = req.params.nombre;
    const regex = new RegExp(busqueda, 'i');
    const limite = Number(req.query.limite) || 0;

    let cursos = await Curso.find({ nombre: regex }, 'nombre descripcion precio img')
        .limit(limite);


    res.json({
        ok: true,
        cursos: cursos
    })

}

const crearCurso = async ( req, res = response) => {

    const uid = req.uid;

    try {

        // Crear el curso
        const curso = new Curso({
            usuario: uid,
            ...req.body
        });

        const cursoDB = await curso.save();
    
        res.status(200).json({
            ok: true,
            curso: cursoDB,
        });
    }catch (error) {
        console.log(error);
        res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador',
        });
    }

};

const actualizarCurso = async (req, res = response) => {
    const id = req.params.id

    const uid = req.uid;

    try {

        const curso = await Curso.findById(id);

        if (!curso){
            return res.status(404).json({
                ok: true,
                msg: 'Curso no encontrado por id'
            });
        }

        const cambiosCurso = {
            ...req.body,
            usuario: uid
        }

        const cursoActualizado = await Curso.findByIdAndUpdate(id, cambiosCurso, {new: true}); 

        res.status(200).json({
            ok: true,
            curso: cursoActualizado,
        });

    }catch (error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const eliminarCurso = async(req, res = response) => {

    const id = req.params.id

    try {
        const curso = await Curso.findById( id );

        if( !curso ){
            return res.status(404).json({
                ok: true,
                msg: 'Curso no encontrado por id'
            });
        }

        await Curso.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Curso eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}


module.exports = {
    getCursos,
    getCursosPorNombre,
    getCursoPorId,
    crearCurso,
    actualizarCurso,
    eliminarCurso
}