const express = require('express');
const router = express.Router();
const {models} = require('../models/init-models');

router.get("/personas", async (req, res, next) => {
  try {
    const response = await models.persona.findAll({include: {model: models.reserva, as: 'reservas'}});
    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.post("/persona/new", async (req, res, next) => {
  try {
    const { body } = req;
    const response = await models.persona.create(body);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.get("/persona/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await models.persona.findByPk(id, {include: {model: models.reserva, as: 'reservas'}});
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.delete("/persona/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await models.persona.findByPk(id);
    await models.persona.destroy({where: {id}});
    res.send('ok')
  } catch (error) {
    next(error);
  }
});

router.patch("/persona/:id", async (req, res, next) => {
    try {
      const body = req.body;
      const { id } = req.params;
      const persona_data = await models.persona.findByPk(id);
      if(persona_data) {
        await persona_data.update(body)
        res.send(body)
      }
      else throw new Error('The user dont exists')
    } catch (error) {
      next(error);
    }
  })

module.exports = router;