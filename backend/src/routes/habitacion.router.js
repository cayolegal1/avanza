const express = require('express');
const router = express.Router();
const habitacion = require('../models/habitacion')

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
      const response = await habitacion.findByPk(id);
      if(response) {
        habitacion.destroy(response)
        res.send("deleted");
      }
      else throw new Error('The user dont exists')
    } catch (error) {
      next(error);
    }
  });
  
  router.patch("/habitacion/:id", async (req, res, next) => {
      try {
        const body = req.body;
        const { id } = req.params;
        const habitacion_data = await habitacion.findByPk(id);
        if(habitacion_data) {
          await habitacion_data.update(body)
          res.send(body)
        }
        else throw new Error('The user dont exists')
      } catch (error) {
        next(error);
      }
    })


module.exports = router;