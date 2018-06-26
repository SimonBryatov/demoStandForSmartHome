com = require("./commandsIn")
module.exports = (data) => {
  let ind = Number(data.match(new RegExp("\u0001(.*?)\u0002"))[1])
  let msg = data.match(new RegExp("\u0002(.*)"))[1]
  let comName = com[ind];
  io.emit("data", [ind, msg])
  console.log(chalk.green("Data recieved: "), "||", ind, "||", msg, "||", comName);
}