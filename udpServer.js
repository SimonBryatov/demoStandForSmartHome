const dgram = require('dgram');
const udpSocket = dgram.createSocket('udp4');
chalk = require("chalk");
let _ = require("lodash")
const comOut = require("./commandsOut")
const sSender = require("./socketSenderUdp")
//var EventLogger = require('node-windows').EventLogger;
//var log = new EventLogger('Node Test');

//log.info('Service started!');

///
let destIP = process.argv[2] || "192.168.1.56" //адрес ардуины
let port = process.argv[3] || 8888  //порт сервера
///

//setTimeout(() => {throw 1}, 10000)

let express = require('express')
var app = require('express')();
let screensApp = require('express')();
var http = require('http').Server(app);
let screensServer = require('http').Server(screensApp);
io = require('socket.io')(http);
screens_io = require('socket.io')(screensServer);
const path = require('path');

//console.log("process.cwd() = " + process.cwd());

app.use(express.static('./client/my-app/build'));
screensApp.use(express.static('./screens/build'))

http.listen(3009, function(){
  console.log('listening on *:3000');
});

screensServer.listen(3010, function(){
  console.log('listening on *:3010');
});

udpSocket.on('error', (err) => {
  console.log(`udpSocket error:\n${err.stack}`);
  udpSocket.close();
});

udpSocket.on('message', (msg, rmsg) => {
  console.log(`udpSocket got: ${msg} from ${rmsg.address}:${rmsg.port}`);
  udpSocket.send(`udpSocket got: ${msg} from ${rmsg.address}:${rmsg.port}`, rmsg.port, rmsg.address)
  sSender(msg.toString());
});

udpSocket.on('listening', () => {
  const address = udpSocket.address();
  //udpSocket.send("alive", "41234", destIP)
  console.log(`udpSocket listening ${address.address}:${address.port}`);
});

//udpSocket.bind(port);

screens_io.on('connection', function(socket){
    // console.log('a user connected');
    // socket.on("controlMsg", (data) => {
    //     let ind = comOut[data[0]]
    //     let msg = data[1]

    //     if (msg === true) {
    //       msg = 1
    //     }

    //     if (msg === false) {
    //       msg = 0
    //     }
    //     if (ind) {
    //         udpSocket.send("\u0001" + ind + "\u0002" + msg + "\u0003" + 120720286 + "\u0004", port, destIP, (err) => {
    //             if (err) {
    //                           return console.log('Error on write: ', err.message);
    //                         }
    //             console.log(chalk.cyan("Data sent:"), "|", data[0], "|", msg, "|", ind);
    //         })
            
    //     } else console.log(chalk.yellow(`No such output command! `) + data[0])
    // })  
    setInterval(() => socket.emit('data', {1: 123332, 2: Math.random()}), 2000)
  });

// let a = Math.random()*50;
// a = 0
  
// setInterval(() => {
//       udpSocket.send(new Date(Date.now()).toLocaleString(), port, destIP, function(err) {
//         if (err) {
//           return console.log('Error on write: ', err.message);
//         }
//         a = Number(!a);
//         //console.log('message written', a);
//       });
//    // udpSocket.send("alive", "41234")
// }, 1000)