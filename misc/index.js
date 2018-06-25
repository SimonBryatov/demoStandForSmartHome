var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var five = require("johnny-five");
var EtherPort = require("etherport");
var led = 0;
var board = new five.Board({ 
  port: new EtherPort(3030) 
});

http.listen(3000, function(){
    console.log('listening on *:3000');
  });

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on("led", () => {
        console.log(123)
        led.toggle()
    })
    socket.on("ledChangeValue", (data) => {
        console.log("changeV ", data)
        led.brightness(data)
    })    
  });


board.on("ready", function() {
  led = new five.Led(5);
  //led.pulse(500);

});

board.on("ready", function() {
    // This requires OneWire support using the ConfigurableFirmata
    var thermometer = new five.Thermometer({
      controller: "DS18B20",
      pin: 2
    });
  
    thermometer.on("change", function() {
      console.log(this.celsius + "°C");
      io.emit("change", this.celsius)
      // console.log("0x" + this.address.toString(16));
    });
  });