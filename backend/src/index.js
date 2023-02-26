/*libraries*/
  const cors = require('cors');
  const express = require('express');
  const morgan = require('morgan');
/*libraries*/

const {sequelize, dbConnectMysql} = require('./db');
const router = require('./routes/index')

const app = express();
app.use(express.json());

/*cors config*/
  const options = {
    origin: '*',
    methods: [
      'GET',
      'POST',
      'DELETE',
      'PATCH',
    ],
    allowedHeaders: [
      'Content-Type',
    ],
  }
  
  app.use(cors(options))
/*cors config*/

router(app);
app.use(morgan('dev'));

app.listen(8000, () => {
    sequelize.sync({force: true}).then(() => {
        console.log('Connection established')
    })
    dbConnectMysql()
})