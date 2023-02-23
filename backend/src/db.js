const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('reservas', 'root', 'admin123', {
    'host': 'localhost',
    port: '3306',
    dialect: "mysql",
  });
  
  const dbConnectMysql = async () => {
    await sequelize
      .authenticate()
      .then(() => {
        console.log("Connection has been successfully.");
      })
      .catch((err) => {
        console.log("Unable to connect to the database:", err);
      });
  };
  
  module.exports = {
    sequelize,
    dbConnectMysql,
  };