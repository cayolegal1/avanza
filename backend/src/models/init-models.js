const DataTypes = require("sequelize").DataTypes;
const _habitacion = require("./habitacion");
const _persona = require("./persona");
const _reserva = require("./reserva");
const {sequelize} = require('../db');

function initModels(sequelize) {
  const habitacion =  _habitacion(sequelize, DataTypes);
  const persona =  _persona(sequelize, DataTypes);
  const reserva =  _reserva(sequelize, DataTypes);
  reserva.belongsTo(habitacion, { as: "habitacion", foreignKey: "habitacionid", onDelete: 'cascade'});
  habitacion.hasMany(reserva, { as: "reservas", foreignKey: "habitacionid", onDelete: 'cascade', onUpdate: 'cascade'});
  reserva.belongsTo(persona, { as: "persona", foreignKey: "personaid", onDelete: 'cascade'});
  persona.hasMany(reserva, { as: "reservas", foreignKey: "personaid", onDelete: 'cascade', onUpdate: 'cascade'});

  return {
    habitacion,
    persona,
    reserva,
  };
}
const models = initModels(sequelize);
module.exports = {models};
