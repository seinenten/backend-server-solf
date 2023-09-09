const { response } = require("express");

const Enfrentamiento = require('../models/enfrentamiento');
const Equipo = require('../models/equipo');
const Jornada = require('../models/jornada');


const generarEnfrentamientosPorLiga = async(req, res = response) => {

    const id = req.params.ligaId
    const equipos = await Equipo.find({"liga":id,"status":true}, 'nombre img')

    const totalEquipos = equipos.length;

    if (totalEquipos % 2 === 0) {
        // El conteo de equipos es un número par, podemos dividirlos en dos arreglos
        const mitad = totalEquipos / 2;

        // Divide el array de equipos en dos arreglos
        const equipoVisitante = equipos.slice(0, mitad);
        const equipoLocal = equipos.slice(mitad);

         // Crear jornadas (totalEquipos - 1 jornadas)
        for (let i = 1; i <= totalEquipos - 1; i++) {
            const jornada = new Jornada({
                nombre: `jornada ${i}`,
            });
            await jornada.save();

            // Crear enfrentamientos para la jornada
            for (let j = 0; j < mitad; j++) {
                const enfrentamiento = new Enfrentamiento({
                    jornada: jornada._id,
                    equipoVisitante: equipoVisitante[j]._id,
                    equipoLocal: equipoLocal[j]._id,
                });
                await enfrentamiento.save();
            }

            // Rotar los grupos para la próxima jornada
            equipoVisitante.push(equipoLocal.shift());
            equipoLocal.push(equipoVisitante.pop());


        }

        // Hacer lo que necesites con los dos grupos de equipos
        // Por ejemplo, puedes enviarlos como respuesta en JSON
        res.status(200).json({
            equipoVisitante,
            equipoLocal
        });
    } else {
        // El conteo de equipos es impar, maneja esta situación según tus necesidades
        res.status(400).json({ mensaje: "El número de equipos no es par." });
    }


}


const getEnfrentamientosPorId = async(req, res = response) => {

}

const getEnfrentamientos = async(req, res = response) => {

}



module.exports = {
    getEnfrentamientos,
    getEnfrentamientosPorId,
    generarEnfrentamientosPorLiga
}