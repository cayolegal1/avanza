const moment = require('moment');

const reservaValidator = (initialDate, endDate) => {
    if(moment(endDate).diff(initialDate) < 1) throw new Error('End date must be greather than initial date');
}

module.exports = reservaValidator;