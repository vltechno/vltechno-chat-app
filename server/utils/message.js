
var moment = require('moment');

var msgGen = (from, text) => {
  return {
    from
    ,text
    ,createdAt: moment.valueOf()
  };
};

var msgLocGen = (from, lat, long) => {
  return {
    from
    ,url: 'https://www.google.com/maps?q='+lat+','+long
    ,createdAt: moment.valueOf()
  };
};

module.exports = {msgGen, msgLocGen};
