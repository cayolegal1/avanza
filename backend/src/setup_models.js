const SequelizeAuto = require('sequelize-auto');
const entitiesFromDB = new SequelizeAuto('my_store', 'root', 'admin123', {
    host: 'localhost', 
    dialect: 'mysql',
    directory: './models',
    port: '3306'
})

entitiesFromDB.run((err) => {
    if(err) throw err
    console.log(entitiesFromDB.tables)
})