const moment = require('moment');
const express = require('express');
const {reservaValidator} = require('../middlewares/validators');
const router = express.Router();
const reserva = require('../models/reserva');

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
      const {fechaentrada, fechasalida, fechareserva, habitacionid} = body;
      const bookings = await reserva.findAll()
      reservaValidator(new Date(fechaentrada), new Date(fechasalida), new Date(fechareserva), bookings, habitacionid);
      
      const reserva_data = {
        ...body, 
        fechaentrada: moment(fechaentrada).format('YYYY/MM/DD'),
        fechareserva:moment(fechareserva).format('YYYY/MM/DD'),
        fechasalida: moment(fechasalida).format('YYYY/MM/DD'),
        montoreserva: moment(new Date(fechasalida)).diff(new Date(fechaentrada), 'days') * 120000
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
      else throw new Error('The item dont exists')
    } catch (error) {
      next(error);
    }
  });
  
  router.patch("/reserva/:id", async (req, res, next) => {
      try {
        const body = req.body;
        const { id } = req.params;
        const {fechaentrada, fechasalida, fechareserva, habitacionid} = body;
        const bookings = await reserva.findAll();
        reservaValidator(fechaentrada, fechasalida, fechareserva, bookings, habitacionid);

        const reserva_data = await reserva.findByPk(id);
        if(reserva_data) {
          await reserva_data.update(body)
          res.send(body)
        }
        else throw new Error('The item doesnt exists')
      } catch (error) {
        next(error);
      }
    })


module.exports = router;