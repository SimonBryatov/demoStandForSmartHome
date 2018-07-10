var SerialPort = require('serialport');

var incommingData = new Buffer(0);
var myParser = function(emitter, buffer) {
    incommingData = Buffer.concat([incommingData, buffer]);
    if (incommingData.length > 3 && incommingData[incommingData.length - 3] == 3) {
        emitter.emit("data", incommingData);
        incommingData = new Buffer(0);
    }
};

var sp = process.argv[2]
var port = new SerialPort(sp || 'COM3', {
  baudRate: 9600, autoOpen: false
});

open();

const parser = port.pipe(new SerialPort.parsers.Delimiter({ delimiter: '\u0003' }))

const sSender = require("./socketSender")
const comOut = require("./commandsOut")
chalk = require("chalk");
let _ = require("lodash")

let express = require('express')
var app = require('express')();
var http = require('http').Server(app);
io = require('socket.io')(http);

app.use(express.static('build'));

http.listen(3000, function(){
  console.log('listening on *:3000');
});

port.on("open", () => {
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

  parser.on('data', function (data) {
    //console.log(data.toString())
    sSender(data.toString());
  });  

let a = Math.random()*50;
a = Math.floor(a);
  
// setInterval(() => {
//       port.write(String.fromCharCode(1) + "1" + String.fromCharCode(2) + a + String.fromCharCode(3), function(err) {
//         if (err) {
//           return console.log('Error on write: ', err.message);
//         }
//         a = Math.random()*50;
// a = Math.floor(a);
//         console.log('message written', a);
//       });  
// }, 1000)
 })

 port.on("close", () => {
  console.log(chalk.red('Port has closed!'));
  open(); 
 })

 function open () {
  port.open((err) => {
      if (!err) return;
      console.log('Port is not open: ' + err.message);
      setTimeout(open, 1000); // next attempt to open after 10s
  });
}