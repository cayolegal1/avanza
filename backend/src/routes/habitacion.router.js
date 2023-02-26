const express = require('express');
const router = express.Router();
const {habitacionValidator} = require('../middlewares/validators');
const habitacion = require('../models/habitacion')
const reserva = require('../models/reserva');

router.get('/habitaciones', async (req, res, next) => {
    try {
      const products = await habitacion.findAll();
      res.send(products);
    } catch (error) {
      next(error);
    }
  });

  router.post('/habitacion/new', async (req, res, next) => {
    try {
      const {body} = req;
      habitacionValidator(body.habitacionpiso, body.habitacionnro, body.cantcamas);
      const products = await habitacion.create(body);
      res.json(products);
    } catch (error) {
      next(error);
    }
  });

  router.get("/habitacion/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      const response = await habitacion.findByPk(id);
      res.json(response);
    } catch (error) {
      next(error);
    }
  });
  
  router.delete("/habitacion/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
    await habitacion.findByPk(id);
    await reserva.destroy({where: {habitacionid: id}})
    await habitacion.destroy({ where: { id } });
    res.send('ok')
    } catch (error) {
      next(error);
      console.log('error ==>', error.message)
    }
  });
  
  router.patch("/habitacion/:id", async (req, res, next) => {
      try {
        const body = req.body;
        const { id } = req.params;
        habitacionValidator(
          body.habitacionpiso,
          body.habitacionnro,
          body.cantcamas
        );
        const habitacion_data = await habitacion.findByPk(id);
        if (habitacion_data) {
          await habitacion_data.update(body);
          res.send(body);
        } else throw new Error("The room doesnt exists");
      } catch (error) {
        next(error);
      }
    })


module.exports = router;