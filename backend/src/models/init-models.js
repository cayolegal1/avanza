var DataTypes = require("sequelize").DataTypes;
var _habitacion = require("./habitacion");
var _persona = require("./persona");
var _reserva = require("./reserva");

function initModels(sequelize) {
  // var habitacion = _habitacion(sequelize, DataTypes);
  // var persona = _persona(sequelize, DataTypes);
  // var reserva = _reserva(sequelize, DataTypes);

  reserva.belongsTo(habitacion, { as: "habitacion", foreignKey: "habitacionid"});
  habitacion.hasMany(reserva, { as: "reservas", foreignKey: "habitacionid"});
  reserva.belongsTo(persona, { as: "persona", foreignKey: "personaid"});
  persona.hasMany(reserva, { as: "reservas", foreignKey: "personaid"});

  // return {
  //   habitacion,
  //   persona,
  //   reserva,
  // };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
