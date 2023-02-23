const {DataTypes, Sequelize} = require('sequelize');
const {sequelize} = require('../db');

  const reserva = sequelize.define('reserva', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fechareserva: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    fechaentrada: {
      type: DataTypes.DATE,
      allowNull: false
    },
    fechasalida: {
      type: DataTypes.DATE,
      allowNull: false
    },
    habitacionid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'habitacion',
        key: 'id'
      }
    },
    personaid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'persona',
        key: 'id'
      }
    },
    montoreserva: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'reserva',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "fk_habitacion",
        using: "BTREE",
        fields: [
          { name: "habitacionid" },
        ]
      },
      {
        name: "fk_persona",
        using: "BTREE",
        fields: [
          { name: "personaid" },
        ]
      },
    ]
  });

  module.exports = reserva;
