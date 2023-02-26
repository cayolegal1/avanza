var DataTypes = require("sequelize").DataTypes;
var habitacion = require("./habitacion");
var persona = require("./persona");
var reserva = require("./reserva");

function initModels(sequelize) {
  // var habitacion = _habitacion(sequelize, DataTypes);
  // var persona = _persona(sequelize, DataTypes);
  // var reserva = _reserva(sequelize, DataTypes);

  reserva.belongsTo(habitacion, { as: "habitacion", foreignKey: "habitacionid", onDelete: 'cascade'});
  habitacion.hasMany(reserva, { as: "reservas", foreignKey: "habitacionid", onDelete: 'cascade', onUpdate: 'cascade'});
  reserva.belongsTo(persona, { as: "persona", foreignKey: "personaid", onDelete: 'cascade'});
  persona.hasMany(reserva, { as: "reservas", foreignKey: "personaid", onDelete: 'cascade', onUpdate: 'cascade'});

  // return {
  //   habitacion,
  //   persona,
  //   reserva,
  // };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
