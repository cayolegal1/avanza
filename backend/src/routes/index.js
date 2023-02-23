const express = require('express');
const habitacionesRouter = require('./habitacion.router');
const personasRouter = require('./persona.router');
const reservasRouter = require('./reserva.router');

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use(habitacionesRouter);
  router.use(personasRouter);
  router.use(reservasRouter);
}
  
module.exports = routerApi;