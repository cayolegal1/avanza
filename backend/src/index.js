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
  const whitelist = ['http://localhost:8080', 'https://myapp.co', 'http://localhost:5173'];
  const options = {
    origin: (origin, callback) => {
      if (whitelist.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('no permitido'));
      }
    }
  }
  
  app.use(cors(options))
/*cors config*/

router(app);
app.use(morgan('dev'));

app.listen(8000, () => {
    sequelize.sync({force: false}).then(() => {
        console.log('Connection established')
    })
    dbConnectMysql()
})