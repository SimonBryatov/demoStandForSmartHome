const dgram = require('dgram');
const udpSocket = dgram.createSocket('udp4');

udpSocket.bind(8999);

let a = Math.random()*50;
a = 0
  

udpSocket.on('listening', () => {
    const address = udpSocket.address();
    //udpSocket.send("alive", "41234", destIP)
    console.log(`udpSocket listening ${address.address}:${address.port}`);
  });

setInterval(() => {
      udpSocket.send(new Date(Date.now()).toLocaleString(), 8888, '192.168.1.48', function(err) {
        if (err) {
          return console.log('Error on write: ', err.message);
        }
        a = Number(!a);
        console.log('message written', a);
      });
   // udpSocket.send("alive", "41234")
}, 1000)