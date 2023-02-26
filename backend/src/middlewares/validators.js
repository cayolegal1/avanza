const moment = require('moment');

const reservaValidator = (initialDate, endDate, bookingDate, bookings, roomId) => {
    if(moment(bookingDate).isSame(new Date(), 'day'), moment(initialDate).isBefore(new Date(), 'day')) {
        throw new Error('Booking date must be greater than current day');
    }
    if(moment(initialDate).isSame(new Date(), 'day' || moment(initialDate).isBefore(new Date(), 'day'))) {
      throw new Error('Initial date must be greater than current day');
    }
    if(moment(endDate).diff(initialDate) < 1) throw new Error('End date must be greather than initial date');
    for(let booking of bookings) {
        if(
          (moment(initialDate).isBetween(
            booking.fechaentrada,
            booking.fechasalida,
            null,
            "[]"
          ) ||
          moment(endDate).isBetween(
            booking.fechaentrada,
            booking.fechasalida,
            null,
            "[]"
          )) 
          && roomId === booking.habitacionid
        ) {
          throw new Error(`The room ${booking.habitacionid} is not available in these dates`)
        } 
   }
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