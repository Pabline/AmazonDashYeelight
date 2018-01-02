const spy = require('dhcp-spy')
const Lookup = require("node-yeelight-wifi").Lookup;

let look = new Lookup();
look.findByPortscanning();
var lights =[];

look.on("detected",(light) =>
{
   console.log("new yeelight detected: id="+light.id + " name="+light.name);
   lights.push(light);
});

spy.listening.then(() => {
 console.log('Listening for DHCP requests');
})

spy.on('detected', (mac) => {
 console.log(`Detected a request from ${mac}`);
})

spy.on('fc:a6:67:ce:d8:b6', () => {
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

