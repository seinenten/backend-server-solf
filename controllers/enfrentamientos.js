const { response } = require("express");

const Enfrentamiento = require('../models/enfrentamiento');
const Equipo = require('../models/equipo');
const Jornada = require('../models/jornada');


const generarEnfrentamientosPorLiga = async(req, res = response) => {

    const id = req.params.ligaId
    const equipos = await Equipo.find({"liga":id,"status":true}, 'nombre img')

    const totalEquipos = equipos.length;

    const jornadas = [];
    const enfrentamientos = [];

    // Calcular el número de jornadas (totalEquipos si es impar, totalEquipos - 1 si es par)
    const numeroJornadas = totalEquipos % 2 === 0 ? totalEquipos - 1 : totalEquipos;

    // Crear jornadas de acuerdo al número de jornadas calculado
    for (let i = 1; i <= numeroJornadas; i++) {
        jornadas.push(new Jornada({
        nombre: `Jornada ${i}`,
        }));
    }

    // Crear una matriz de enfrentamientos vacía
    for (let i = 0; i < totalEquipos; i++) {
        enfrentamientos.push([]);
    }

    // Generar los enfrentamientos de acuerdo a las restricciones
    for (let i = 0; i < numeroJornadas; i++) {
        for (let j = 0; j < totalEquipos / 2; j++) {
        const equipoLocalIndex = j;
        const equipoVisitanteIndex = (totalEquipos - 1 - j + i) % (totalEquipos - 1);
        
        const jornada = jornadas[i];
        const equipoLocal = equipos[equipoLocalIndex];
        const equipoVisitante = equipos[equipoVisitanteIndex];

        enfrentamientos[equipoLocalIndex].push(equipoVisitanteIndex);
        enfrentamientos[equipoVisitanteIndex].push(equipoLocalIndex);

        const enfrentamiento = new Enfrentamiento({
            jornada: jornada._id,
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