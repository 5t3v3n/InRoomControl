/*

Python Template for Cisco Sample Code.

Copyright (c) 2019 Cisco and/or its affiliates.

This software is licensed to you under the terms of the Cisco Sample
Code License, Version 1.1 (the "License"). You may obtain a copy of the
License at

               https://developer.cisco.com/docs/licenses

All use of the material herein must be in accordance with the terms of
the License. All rights not expressly granted by the License are
reserved. Unless required by applicable law or agreed to separately in
writing, software distributed under the License is distributed on an "AS
IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
or implied.

*/


//Enter IP Address of Endpoint below
const ipAddress = "ssh://172.20.10.2"

const jsxapi = require('jsxapi')
const xapi = jsxapi.connect(ipAddress, {
  username: 'integrator',
  password: 'integrator'
})

// CE maximum value for Ultrasound's MaxVolume
const MAX = 100; // 90 for a DX, and 70 for a RoomKit
const system = require('system-control')();

xapi.on('error', (err) => {
  console.error(`connection failed: ${err}, exiting`);
  process.exit(1);
})

const Lookup = require("node-yeelight-wifi").Lookup;
let look = new Lookup();

//UPDATE BRIGHTNESS UI
function updateUI(brightness) {
 console.log(`updating UI to brightness configuration: ${brightness}`);

 // Update brightness text
 xapi.command('UserInterface Extensions Widget SetValue', {
     WidgetId: 'brightness_text',
     Value: brightness
 })

 // Update brightness slider
 const level = Math.round(parseInt(brightness) * 255 / MAX);
 xapi.command('UserInterface Extensions Widget SetValue', {
    WidgetId: 'brightness_slider',
    Value: level
 })
}

//UPDATE VOLUME UI
function updateUIVolume(brightness) {
 console.log(`updating UI to volume configuration: ${brightness}`);

 // Update volume slider
 const level = Math.round(parseInt(brightness) * 255 / 100);
 xapi.command('UserInterface Extensions Widget SetValue', {
    WidgetId: 'volume_slider',
    Value: level
 })
}

look.on("detected",(light) =>
{
  console.log("connection to Bulb Successful");

  //SET STARTING VALUE FOR UI ELEMENTS
  xapi.on('ready', () => {
     console.log("connection to Device Successful");
     //set current bulb power state
     if(light.power==false){
       console.log("Current State OFF")
       xapi.command('UserInterface Extensions Widget SetValue', {
           WidgetId: 'power_button',
           Value: "off"
       })
     }
     else{
       console.log("Current State ON")
       xapi.command('UserInterface Extensions Widget SetValue', {
           WidgetId: 'power_button',
           Value: "on"
       })
     }

     //set current brightness text
     xapi.command('UserInterface Extensions Widget SetValue', {
         WidgetId: 'brightness_text',
         Value: light.bright
     })

     //set the brightness slider Value
     const level = Math.round(parseInt(light.bright) * 255 / MAX)
     xapi.command('UserInterface Extensions Widget SetValue', {
       WidgetId: 'brightness_slider',
       Value: level
     })
  })

  //PRESSING POWER BUTTON
  xapi.event.on('UserInterface Extensions Widget Action', (event) => {
     if (event.Type !== 'changed') return
     if (event.WidgetId !== 'power_button') return

     if(event.Value=="on")
     {
       light.setPower(true).then(() =>
       {
           console.log("Light Turned ON");
       }).catch((error =>
       {
           console.log("failed",error);
       }));
     }
     else{
       light.setPower(false).then(() =>
       {
           console.log("Light Turned OFF");
       }).catch((error =>
       {
           console.log("failed",error);
       }));
     }
  })


//VARYING BRIGHTNESS SLIDER
xapi.event.on('UserInterface Extensions Widget Action', (event) => {
   if (event.WidgetId !== 'brightness_slider') return
   if (event.Type !== 'changed') return

   const brightness = Math.round(parseInt(event.Value) * 100 / 255)
   console.log(`Updating brightness configuration to: ${brightness}`)

   //Set Bulb Brightness
   light.setBright(brightness).then(() =>
   {
     console.log("Light Intensity changed");
   }).catch((error =>
   {
     console.log("failed",error);
   }));

   //update UI
   updateUI(brightness)
})


//VARYING VOLUME SLIDER
xapi.event.on('UserInterface Extensions Widget Action', (event) => {
 if (event.WidgetId !== 'volume_slider') return
 if (event.Type !== 'changed') return

 const brightness = Math.round(parseInt(event.Value) * 100 / 255)
 console.log(`updating volume configuration to: ${brightness}`)

 //Set Bulb Brightness
 system.audio.setSystemVolume(brightness).then(function() {
 });

 //update UI
 updateUIVolume(brightness)
})

//PRESSING COLOUR BUTTON
xapi.event.on('UserInterface Extensions Widget Action', (event) => {
   if (event.Type !== 'pressed') return
   if (event.WidgetId == 'red_button'){
     light.setRGB([255,0,0]).then(() =>
     {
         console.log("Colour changed to RED");
     }).catch((error =>
     {
         console.log("failed",error);
     }));
   }
   else if(event.WidgetId == 'blue_button'){
     light.setRGB([0,0,255]).then(() =>
     {
         console.log("Colour changed to BLUE");
     }).catch((error =>
     {
         console.log("failed",error);
     }));
   }
   else if(event.WidgetId == 'green_button'){
     light.setRGB([124,252,0]).then(() =>
     {
         console.log("Colour changed to GREEN");
     }).catch((error =>
     {
         console.log("failed",error);
     }));
   }
   else if(event.WidgetId == 'yellow_button'){
     light.setRGB([255,215,0]).then(() =>
     {
         console.log("Colour changed to YELLOW");
     }).catch((error =>
     {
         console.log("failed",error);
     }));
   }
   else{
     return;
   }
})
});



//PRESSING MUTE/UNMUTE BUTTON
xapi.event.on('UserInterface Extensions Widget Action', (event) => {
   if (event.Type !== 'pressed') return
   if (event.WidgetId == 'mute'){

     system.audio.isMuted().then(function(muted) {
       if(muted){
         console.log(muted);
         system.audio.mute(false).then(function() {
           // here comes your code
         });
       }
       else{
         system.audio.mute(true).then(function() {
           // here comes your code
         });
       }
     });

   }
   else{
     return;
   }
})
