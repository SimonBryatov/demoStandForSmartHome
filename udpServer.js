const dgram = require('dgram');
const udpSocket = dgram.createSocket('udp4');
chalk = require("chalk");
let _ = require("lodash")
const comOut = require("./commandsOut")
const sSender = require("./socketSenderUdp")

///
let destIP = process.argv[2] || "192.168.1.177" //адрес ардуины
let port = process.argv[3] || 3001  //порт сервера
///

let express = require('express')
var app = require('express')();
var http = require('http').Server(app);
io = require('socket.io')(http);

app.use(express.static('./client/my-app/build'));

http.listen(3000, function(){
  console.log('listening on *:3000');
});

udpSocket.on('error', (err) => {
  console.log(`udpSocket error:\n${err.stack}`);
  udpSocket.close();
});

udpSocket.on('message', (msg, rmsg) => {
  console.log(`udpSocket got: ${msg} from ${rmsg.address}:${rmsg.port}`);
  sSender(msg.toString());
});

udpSocket.on('listening', () => {
  const address = udpSocket.address();
  //udpSocket.send("alive", "41234", destIP)
  console.log(`udpSocket listening ${address.address}:${address.port}`);
});

udpSocket.bind(port);

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on("controlMsg", (data) => {
        let ind = comOut[data[0]]
        let msg = data[1]

        if (msg === true) {
          msg = 1
        }

        if (msg === false) {
          msg = 0
        }
        if (ind) {
            udpSocket.send("\u0001" + ind + "\u0002" + msg + "\u0003" + 120720286 + "\u0004", port, destIP, (err) => {
                if (err) {
                              return console.log('Error on write: ', err.message);
                            }
                console.log(chalk.cyan("Data sent:"), "|", data[0], "|", msg, "|", ind);
            })
            
        } else console.log(chalk.yellow(`No such output command! `) + data[0])
    })  
  });

// let a = Math.random()*50;
// a = 0
  
// setInterval(() => {
//       udpSocket.send("\u0001" + "23" + "\u0002" + a + "\u0003" + 125117807 + "\u0004", "41234", destIP, function(err) {
//         if (err) {
//           return console.log('Error on write: ', err.message);
//         }
//         a = Number(!a);
//         //console.log('message written', a);
//       });
//    // udpSocket.send("alive", "41234")
// }, 500)