const {DataTypes} = require('sequelize');
const {sequelize} = require('../db');

  const persona = sequelize.define('persona', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nombrecompleto: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    nrodocumento: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    correo: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    telefono: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'persona',
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
    ]
  });

  module.exports = persona;
