const moment = require('moment');
const express = require('express');
const {reservaValidator} = require('../middlewares/validators');
const router = express.Router();
const {models} = require('../models/init-models');

router.get('/reservas', async (req, res, next) => {
    try {
      const products = await models.reserva.findAll();
      res.send(products);
    } catch (error) {
      next(error);
    }
  });

  router.post('/reserva/new', async (req, res, next) => {
    try {
      const {body} = req;
      const {fechaentrada, fechasalida, fechareserva, habitacionid} = body;
      const bookings = await models.reserva.findAll()
      reservaValidator(
        fechaentrada,
        fechasalida,
        fechareserva,
        bookings,
        habitacionid
      );
      
      const reserva_data = {
        ...body, 
        fechaentrada: moment(fechaentrada).format('YYYY/MM/DD'),
        fechareserva:moment(fechareserva).format('YYYY/MM/DD'),
        fechasalida: moment(fechasalida).format('YYYY/MM/DD'),
        montoreserva: moment(fechasalida).diff(fechaentrada, 'days') * 120000
      }
      const response = await models.reserva.create(reserva_data);
      res.send(response);
    } catch (error) {
      next(error);
    }   
  });

  router.get("/reserva/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await models.reserva.findByPk(id);
      res.json(response);
    } catch (error) {
      next(error);
    }
  });
  
  router.delete("/reserva/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await models.reserva.findByPk(id);
      if(response) {
        models.reserva.destroy({where: {id}})
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
        const bookings = await models.reserva.findAll();
        reservaValidator(
          fechaentrada,
          fechasalida,
          fechareserva,
          bookings,
          habitacionid
        );
        const reserva_data = await models.reserva.findByPk(id);
        if(reserva_data) {
          const body_data = {
            ...body, 
            fechaentrada: moment(fechaentrada).format('YYYY/MM/DD'),
            fechareserva:moment(fechareserva).format('YYYY/MM/DD'),
            fechasalida: moment(fechasalida).format('YYYY/MM/DD'),
            montoreserva: moment(fechasalida).diff(fechaentrada, 'days') * 120000
          }
          await reserva_data.update(body_data)
          res.send(body)
        }
        else throw new Error('The item doesnt exists')
      } catch (error) {
        next(error);
      }
    })


module.exports = router;