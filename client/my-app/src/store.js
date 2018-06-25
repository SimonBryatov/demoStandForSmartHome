import {observable} from "mobx"
import io from "socket.io-client"

class Store {
    @observable data = {};
    @observable controls = {sliders: [], switches: [], buttons: []};
    socket = {};
    constructor() {
        for (var i = 0; i < 30; i++) {
            if (i < 10) {
            this.controls.sliders.push(observable.box(0))
            } else
            if (i < 20) {
                this.controls.switches.push(observable.box(0))
            } else {
                this.controls.buttons.push(observable.box(0))
            }
        }
        this.socket = io('http://localhost:3000');
        this.socket.on("data", (data) => {
            this.data[data[0]]=data[1]
        })
        
    }

    controlMsg(comName, data) {
        this.socket.emit("controlMsg", [comName, data])
    }
}

export default Store;