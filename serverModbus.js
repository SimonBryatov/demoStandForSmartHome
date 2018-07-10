var modbus = require("modbus-stream");

modbus.tcp.server({ debug: "server" }, (connection) => {
    setInterval(() => {
        connection.readCoils({ from: 3, to: 7 }, (err, info) => {
            console.log("response", info.response.data);
        });
    }, 10)
  
}).listen(12345, () => {
    modbus.tcp.connect(12345, { debug: "client" }, (err, connection) => {
        connection.on("read-coils", (request, reply) => {
            reply(null, [ 1, 0, 1, 0, 1, 1, 0, 1 ]);
        });
    });
});