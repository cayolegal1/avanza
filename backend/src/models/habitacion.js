const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('habitacion', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    habitacionpiso: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    habitacionnro: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cantcamas: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tienetelevision: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    tienefrigobar: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'habitacion',
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
};
