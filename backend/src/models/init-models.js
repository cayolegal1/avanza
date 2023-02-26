var habitacion = require("./habitacion");
var persona = require("./persona");
var reserva = require("./reserva");

function initModels(sequelize) {
  reserva.belongsTo(habitacion, { as: "habitacion", foreignKey: "reserva_habitacionid", onDelete: 'cascade'});
  habitacion.hasMany(reserva, { as: "reservas", foreignKey: "habitacionid", onDelete: 'cascade', onUpdate: 'cascade'});
  reserva.belongsTo(persona, { as: "persona", foreignKey: "reserva_personaid", onDelete: 'cascade'});
  persona.hasMany(reserva, { as: "reservas", foreignKey: "personaid", onDelete: 'cascade', onUpdate: 'cascade'});
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
