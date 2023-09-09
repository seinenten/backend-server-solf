const { response } = require("express");

const Enfrentamiento = require('../models/enfrentamiento');
const Equipo = require('../models/equipo');

const generarEnfrentamientosPorLiga = async(req, res = response) => {

    const id = req.params.ligaId
    const equipos = await Equipo.find({"liga":id,"status":true}, 'nombre img')

    const totalEquipos = equipos.length;

    const enfrentamientos = [];

    // Calcular el número de jornadas (totalEquipos si es impar, totalEquipos - 1 si es par)
    const numeroJornadas = totalEquipos % 2 === 0 ? totalEquipos - 1 : totalEquipos;

    // Crear una matriz de enfrentamientos vacía
    for (let i = 0; i < totalEquipos; i++) {
        enfrentamientos.push([]);
    }

    // Generar los enfrentamientos de acuerdo a las restricciones
    for (let i = 0; i < numeroJornadas; i++) {
        for (let j = 0; j < totalEquipos / 2; j++) {
        const equipoLocalIndex = j;
        const equipoVisitanteIndex = (totalEquipos - 1 - j + i) % (totalEquipos - 1);
        
        const equipoLocal = equipos[equipoLocalIndex];
        const equipoVisitante = equipos[equipoVisitanteIndex];

        enfrentamientos[equipoLocalIndex].push(equipoVisitanteIndex);
        enfrentamientos[equipoVisitanteIndex].push(equipoLocalIndex);

        const numeroJornada = i + 1; // Incrementa el número de jornada en 1 para que comience desde 1

        const enfrentamiento = new Enfrentamiento({
            jornada: numeroJornada,
            equipoLocal: equipoLocal,
            equipoVisitante: equipoVisitante,
        });

        await enfrentamiento.save();
        }
    }

    res.status(200).json({
        ok: true,
        mensaje: "Se han generado los enfrentamientos según las restricciones especificadas.",
    });


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