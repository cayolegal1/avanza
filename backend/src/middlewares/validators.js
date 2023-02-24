const moment = require('moment');

const reservaValidator = (initialDate, endDate) => {
    if(moment(endDate).diff(initialDate) < 1) throw new Error('End date must be greather than initial date');
    if(moment().diff(initialDate) < 1) throw new Error('Booking date must be greater than current day');
}

const habitacionValidator = (habitacionpiso, habitacionnro, cantcamas) => {
    if(habitacionpiso < 1 || habitacionpiso > 10) throw new Error('The room number must be greather than 0 and less or equal to 10')
    if(habitacionnro < 1 || habitacionnro > 20) throw new Error('The room number must be greather than 0 and less or equal to 20')
    if(cantcamas < 1 || cantcamas > 4) throw new Error('The room number must be greather than 0 and less or equal to 4')
}

module.exports = {
    reservaValidator,
    habitacionValidator
};