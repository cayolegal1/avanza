const express = require('express');
const router = express.Router();
const moment = require('moment');
const reserva = require('../models/reserva');
const reservaValidator = require('../middlewares/validators');

router.get('/reservas', async (req, res, next) => {
    try {
      const products = await reserva.findAll();
      res.send(products);
    } catch (error) {
      next(error);
    }
  });


  router.post('/reserva/new', async (req, res, next) => {
    try {
      const {body} = req;
      const {fechaentrada, fechasalida, fechareserva} = body;
      const fechareservaDate = new Date(fechareserva);
      const fechaentradaDate = new Date(fechaentrada);
      const fechasalidaDate = new Date(fechasalida);
      reservaValidator(fechaentradaDate, fechasalidaDate);

      const reserva_data = {
        ...body, 
        fechaentrada: `${fechaentradaDate.getFullYear()}-${fechaentradaDate.getMonth()}-${fechaentradaDate.getDate()}`,
        fechareserva: `${fechareservaDate.getFullYear()}-${fechareservaDate.getMonth()}-${fechareservaDate.getDate()}`,
        fechasalida: `${fechasalidaDate.getFullYear()}-${fechasalidaDate.getMonth()}-${fechasalidaDate.getDate()}`,
        montoreserva: moment(fechasalidaDate).diff(fechaentradaDate, 'days') * 120000
      }
      const response = await reserva.create(reserva_data);
      res.send(response);
    } catch (error) {
      next(error);
    }   
  });

  router.get("/reserva/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await reserva.findByPk(id);
      res.json(response);
    } catch (error) {
      next(error);
    }
  });
  
  router.delete("/reserva/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await reserva.findByPk(id);
      if(response) {
        reserva.destroy(response)
        res.send("deleted");
      }
      else throw new Error('The user dont exists')
    } catch (error) {
      next(error);
    }
  });
  
  router.patch("/reserva/:id", async (req, res, next) => {
      try {
        const body = req.body;
        const { id } = req.params;
        const reserva_data = await reserva.findByPk(id);
        if(reserva_data) {
          await reserva_data.update(body)
          res.send(body)
        }
        else throw new Error('The user dont exists')
      } catch (error) {
        next(error);
      }
    })


module.exports = router;