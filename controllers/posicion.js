const { response } = require('express');
const Posicion = require('../models/posicion');
const Resultado = require('../models/resultados');
const Liga = require('../models/liga');
const getPosiciones = async (req, res = response) => {
  const { ligaId } = req.params;
  try {
    //Filtra los equipos por liga
    const resultados = await Resultado.find({ liga: ligaId })

    const equipos = await Resultado.find({ liga: ligaId })
      .populate('liga', 'nombre img descripcion')
      .populate('equipoLocal', 'nombre img descripcion')
      .populate('equipoVisitante', 'nombre img descripcion')
    // genera una tabla por liga
    const tablaPosiciones = generarTablaPosiciones(resultados);

    const tablaPosicionesPorLiga = await Posicion.findOneAndUpdate(
      { liga: ligaId },
      { posiciones: tablaPosiciones },
      { upsert: true, new: true }
    );

    res.status(200).json({
      ok: true,
      equipos: equipos,
      tablaPosiciones: tablaPosiciones
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

const getPosicionesPornombre = async (req, res = response) => {
  const busqueda = req.params.nombre;
  const regex = new RegExp(busqueda, 'i');
  const limite = Number(req.query.limite) || 0;
  const liga = await Liga.findOne({ nombre: regex });

  if (!liga) {
    return res.status(404).json({
      ok: false,
      msg: 'Liga no encontrada',
    });
  }
  try {


    // Busca la liga por su nombre en lugar de su ID


    //Filtra los equipos por liga

    const resultados = await Resultado.find({ liga: liga._id })

    const equipos = await Resultado.find({ liga: liga._id })
      .populate('liga', 'nombre img')
      .populate('equipoLocal', 'nombre img')
      .populate('equipoVisitante', 'nombre img')
    // genera una tabla por liga
    const tablaPosiciones = generarTablaPosiciones(resultados);

    const tablaPosicionesPorLiga = await Posicion.findOneAndUpdate(
      { liga: liga._id },
      { posiciones: tablaPosiciones },
      { upsert: true, new: true }
    );

    res.status(200).json({
      ok: true,
      equipos: equipos,
      tablaPosiciones: tablaPosiciones
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

const generarTablaPosiciones = (resultados) => {
  // Crear un objeto para almacenar las estadísticas de cada equipo
  const estadisticasEquipos = {};

  // Iterar sobre los resultados y actualizar las estadísticas de cada equipo
  resultados.forEach((resultado) => {
    const equipoLocal = resultado.equipoLocal;
    const equipoVisitante = resultado.equipoVisitante;
    const golesLocal = resultado.golesLocal;
    const golesVisitante = resultado.golesVisitante;

    // Actualizar las estadísticas del equipo local
    if (!estadisticasEquipos[equipoLocal]) {
      estadisticasEquipos[equipoLocal] = {
        PJ: 0,
        PG: 0,
        PE: 0,
        PP: 0,
        GF: 0,
        GC: 0,
        Puntos: 0,
      };
    }
    estadisticasEquipos[equipoLocal].PJ++;
    estadisticasEquipos[equipoLocal].GF += golesLocal;
    estadisticasEquipos[equipoLocal].GC += golesVisitante;
    if (golesLocal > golesVisitante) {
      estadisticasEquipos[equipoLocal].PG++;
      estadisticasEquipos[equipoLocal].Puntos += 3;
    } else if (golesLocal === golesVisitante) {
      estadisticasEquipos[equipoLocal].PE++;
      estadisticasEquipos[equipoLocal].Puntos += 1;
    } else {
      estadisticasEquipos[equipoLocal].PP++;
    }

    // Actualizar las estadísticas del equipo visitante
    if (!estadisticasEquipos[equipoVisitante]) {
      estadisticasEquipos[equipoVisitante] = {
        PJ: 0,
        PG: 0,
        PE: 0,
        PP: 0,
        GF: 0,
        GC: 0,
        Puntos: 0,
      };
    }
    estadisticasEquipos[equipoVisitante].PJ++;
    estadisticasEquipos[equipoVisitante].GF += golesVisitante;
    estadisticasEquipos[equipoVisitante].GC += golesLocal;
    if (golesVisitante > golesLocal) {
      estadisticasEquipos[equipoVisitante].PG++;
      estadisticasEquipos[equipoVisitante].Puntos += 3;
    } else if (golesVisitante === golesLocal) {
      estadisticasEquipos[equipoVisitante].PE++;
      estadisticasEquipos[equipoVisitante].Puntos += 1;
    } else {
      estadisticasEquipos[equipoVisitante].PP++;
    }
  });

  // Convertir el objeto de estadísticas en un array de posiciones
  const tablaPosiciones = Object.entries(estadisticasEquipos).map(([equipo, estadisticas]) => ({
    equipo,
    ...estadisticas,
  }));

  // Ordenar la tabla de posiciones por puntos y diferencia de goles
  tablaPosiciones.sort((a, b) => {
    if (a.Puntos !== b.Puntos) {
      return b.Puntos - a.Puntos; // Orden descendente por puntos
    }
    return b.GF - b.GC - (a.GF - a.GC); // Orden descendente por diferencia de goles
  });


  return tablaPosiciones;
};




const getPosicionPorId = async (req, res = response) => {
  const id = req.params.id;

  try {
    const posicion = await Posicion.findById(id)
      .populate('equipo', 'nombre descripcion img')
      .select('equipo PJ PG PE PP GF GC DIF EF');

    res.status(200).json({
      ok: true,
      posicion: posicion,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};


const crearPosicion = async (req, res = response) => {
  const posicion = new Posicion(req.body);
  try {
    const posicionDB = await posicion.save();
    res.status(200).json({
      ok: true,
      posicion: posicionDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

const actualizarPosicion = async (req, res = response) => {
  const id = req.params.id;
  try {
    const posicion = await Posicion.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
      ok: true,
      posicion: posicion,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

const eliminarPosicion = async (req, res = response) => {
  const id = req.params.id;
  try {
    await Posicion.findByIdAndDelete(id);
    res.status(200).json({
      ok: true,
      msg: 'Posición eliminada',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

module.exports = {
  getPosiciones,
  getPosicionesPornombre,
  getPosicionPorId,
  generarTablaPosiciones,
  crearPosicion,
  actualizarPosicion,
  eliminarPosicion,
};
