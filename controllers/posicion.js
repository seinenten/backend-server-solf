const { response } = require('express');
const Posicion = require('../models/posicion');

const getPosiciones = async (req, res = response) => {
  try {
    const posiciones = await Posicion.find();
    res.status(200).json({
      ok: true,
      posiciones: posiciones,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
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
  getPosicionPorId,
  crearPosicion,
  actualizarPosicion,
  eliminarPosicion,
};
