const spy = require('dhcp-spy')
const Lookup = require("node-yeelight-wifi").Lookup;

let look = new Lookup();
look.findByPortscanning();
var lights =[];

var mac;

look.on("detected",(light) =>
{
   console.log("new yeelight detected: id="+light.id + " name="+light.name);
   lights.push(light);
});

spy.listening.then(() => {
 console.log('Listening for DHCP requests');
})

spy.on('detected', (mac) => {
    this.mac = mac;
 console.log(`Detected a request from ${mac}`);

})

spy.on(mac, () => {
 console.log('Someone pressed the "ON" dash button');

 if(lights.length>0){
     lights.forEach((bulb) =>{
        bulb.updateState().then(() =>
        {
            console.log("success");
        }).catch((error =>
        {
            console.log("failed",error);
        }));
        if(bulb.power){
            console.log("LightOn");
            bulb.setPower(false, 1000);
        }else{
            console.log("LightOff");
             bulb.setPower(true, 1000);
        }
     })
 }

})

