(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{32:function(n,t,e){n.exports=e(70)},37:function(n,t,e){},65:function(n,t){},68:function(n,t,e){},70:function(n,t,e){"use strict";e.r(t);var o=e(1),a=e.n(o),c=e(25),i=e.n(c),r=(e(37),e(26)),s=e(27),l=e(30),u=e(28),d=e(31),w=e(29),h=e.n(w),m=(e(68),function(n){function t(n){var e;Object(r.a)(this,t),(e=Object(l.a)(this,Object(u.a)(t).call(this,n))).state={data:"- - -"};var o=Number(window.location.hash.split("").splice(1).join(""));return e.socket=h()(window.location.host),e.socket.on("connection",console.log("connected")),e.socket.on("data",function(n){e.setState({data:n[o]}),console.log(n)}),e}return Object(d.a)(t,n),Object(s.a)(t,[{key:"render",value:function(){return a.a.createElement("div",{className:"App"},a.a.createElement("h1",null,this.state.data))}}]),t}(o.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(a.a.createElement(m,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(n){n.unregister()})}},[[32,2,1]]]);
//# sourceMappingURL=main.79068495.chunk.js.map