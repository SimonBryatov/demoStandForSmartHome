com = require("./commandsIn")
module.exports = (data) => {
//console.log(data)
let arr = data.split("\u0004")
arr.forEach(el => {
    if (el[0] == "\u0001") {
        console.log(el)
  let ind = Number(el.match(new RegExp("\u0001(.*?)\u0002"))[1])
  let msg = el.match(new RegExp("\u0002(.*?)\u0003"))[1]
  let comName = com[ind];
  io.emit("data", [ind, msg])
  console.log(chalk.green("Data recieved: "), "||", ind, "||", msg, "||", comName);
    }
});
}