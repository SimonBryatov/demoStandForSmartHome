var SerialPort = require('serialport');
var port = new SerialPort('COM4', {
  baudRate: 9600
});
const sSender = require("./socketSender")
const comOut = require("./commandsOut")
chalk = require("chalk");

let express = require('express')
var app = require('express')();
var http = require('http').Server(app);
io = require('socket.io')(http);

app.use(express.static('build'));

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on("controlMsg", (data) => {
      let ind = comOut[data[0]]
      if (ind) {
        port.write("\u0001" + ind + "\u0002" + Number(data[1]) + "\u0003", function(err) {
                  if (err) {
                    return console.log('Error on write: ', err.message);
                  }
                  console.log(chalk.cyan("Data sent:"), "|", data[0], "|", data[1], "|", ind);
                });  
      } else console.log(chalk.yellow(`No such output command! `) + data[0])
  })  
});


let buffer = "";

  port.on('data', function (data) {
    buffer += data.toString()
    let del = buffer.indexOf(String.fromCharCode(3))
    if (del >= 0) {
    let arr = buffer.split("")
    let res = arr.splice(0, del + 1); 
    buffer = arr.join("")
    //console.log(res.join(""))
    sSender(res.join(""));
    }
  }); 

let a = 0;  
// setInterval(() => {
//       port.write(String.fromCharCode(1) + "9" + String.fromCharCode(2) + a + String.fromCharCode(3), function(err) {
//         if (err) {
//           return console.log('Error on write: ', err.message);
//         }
//         a = Number(!a)
//         console.log('message written', a);
//       });  
// }, 1000)
