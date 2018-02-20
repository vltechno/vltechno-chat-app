const expect = require('expect');
const {msgGen} = require('./message');
const {msgLocGen} = require('./message');

describe('gen msg', () => {
  // body...
  it('should gen correct msg obj.', () => {
      var from = 'vinhle';
      var text = 'Hello world';
      var msgObj = msgGen(from, text);
      expect(msgObj.createdAt).toBeA('number');
      expect(msgObj).toInclude({from, text});
  });
});

describe('generateLocationMessage', () => {
  // body...
  it('Should gen. correct location object', () => {
    var from = 'Deab';
    var lat = 1;
    var long = 5;
    var url = 'https://www.google.com/maps?q=1,5';

    var  msgObj = msgLocGen(from, lat, long);
    expect(msgObj.createdAt).toBeA('number');
    expect(msgObj).toInclude({from, url});
  });
});
