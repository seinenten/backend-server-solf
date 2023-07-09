

const Resultado = require('../models/resultados');

// Obtener todos los resultados
const obtenerResultados = async (req, res) => {
    try {
        const resultados = await Resultado.find()
            .populate('liga', 'nombre') // Popula la información de la liga
            .populate('equipoLocal', 'nombre') // Popula la información del equipo local
            .populate('equipoVisitante', 'nombre');
        res.status(200).json({
            ok: true,
            resultados: resultados,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener los resultados' });
    }


};

// Crear un nuevo resultado
const crearResultado = async (req, res = response) => {
    const { resultados } = req.body;

    try {
        const nuevosResultados = await Resultado.insertMany(resultados);

        res.status(200).json({
            ok: true,
            resultados: nuevosResultados,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
        });
    }
};

// Actualizar un resultado existente
const actualizarResultado = async (req, res) => {
    const { id } = req.params;
    const { golesLocal, golesVisitante } = req.body;

    try {
        const resultadoActualizado = await Resultado.findByIdAndUpdate(
            id,
            { golesLocal, golesVisitante },
            { new: true }
        );

        if (!resultadoActualizado) {
            return res.status(404).json({ error: 'Resultado no encontrado' });
        }

        res.json(resultadoActualizado);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al actualizar el resultado' });
    }
};

// Eliminar un resultado existente
const eliminarResultado = async (req, res) => {
    const { id } = req.params;

    try {
        const resultadoEliminado = await Resultado.findByIdAndDelete(id);

        if (!resultadoEliminado) {
            return res.status(404).json({ error: 'Resultado no encontrado' });
        }

        res.json({ mensaje: 'Resultado eliminado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al eliminar el resultado' });
    }
};

module.exports = {
    obtenerResultados,
    crearResultado,
    actualizarResultado,
    eliminarResultado,
};
