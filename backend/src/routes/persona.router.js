const express = require('express');
const router = express.Router();
const persona = require("../models/persona");

router.get("/personas", async (req, res, next) => {
  try {
    const response = await persona.findAll();
    res.send(response);
  } catch (error) {
    next(error);
  }
});

router.post("/persona/new", async (req, res, next) => {
  try {
    const { body } = req;
    const response = await persona.create(body);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.get("/persona/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await persona.findByPk(id);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.delete("/persona/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await persona.findByPk(id);
    if(response) {
      persona.destroy(response)
      res.send("deleted");
    }
    else throw new Error('The user dont exists')
  } catch (error) {
    next(error);
  }
});

router.patch("/persona/:id", async (req, res, next) => {
    try {
      const body = req.body;
      const { id } = req.params;
      const persona_data = await persona.findByPk(id);
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