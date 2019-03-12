# In-Room Control

## Table of contents
* [General info](#general-info)
* [Components](#components)
* [Prerequisite](#Prerequisite)
* [Setup](#setup)

## General info
This project aims to create a simple demo to demonsrtate the In Room Control capabilities of a Cisco Telepresence Endpoint. The following diargam shows more information on the set up for the same. 


![alt text](https://user-images.githubusercontent.com/12582569/54210337-4e296700-4505-11e9-92e1-c3cf854d520d.png
)

## Components
* Xiaomi Yeelight Smart Light:  
https://www.amazon.in/Xiaomi-Yeelight-Dimmable-Changing-Compatible/dp/B072HLHPTV?tag=googinhydr18418-21&gclid=Cj0KCQiAxs3gBRDGARIsAO4tqq1mrPe32-JDepF7JKP4Ub1NJB7q2lmux4pvkQKatbfWHQqB0_hIhzoaAoN6EALw_wcB
* Any Cisco Video Endpoint with a Touch 10 panel or a Dx80. For more information on supported devices visit:   https://help.webex.com/en-us/n18glho/In-Room-Controls-and-Use-of-an-External-Video-Switch-with-Room-Devices


## Prerequisite
* NodeJS installed on your laptop: https://nodejs.org/en/download/
* You must have admin access to the Cisco Endpoint 
* All the devices(bulb, laptop and Cisco Video Endpoint) are on the same network

	
## Setup
To run this project, complete the following steps:

### Step 1
Create a User on the endpoint. To do this, you need to access the admin panel of the device. Add a new User with username and password as **integrator**. 


![alt text](https://user-images.githubusercontent.com/12582569/54212591-2e943d80-4509-11e9-8978-28a5e3188387.png)

### Step 2
Clone the repository using the following command
```
$ git clone https://github.com/5t3v3n/InRoomControl.git
```

### Step 3
Upload the XML File **roomcontrolconfig.xml** available in the repository to the system. To do so, visit the admin panel of the device. Under **Integrations**, click **In-room Control** and launch the Editor. Upload the XML file to the endpoint.

![alt text](https://user-images.githubusercontent.com/12582569/54215654-4b7f3f80-450e-11e9-9217-fb998c876d8f.png)


### Step 4
Set up the Bulb using the App. The detail procedure for the same can be found here:  
https://www.youtube.com/watch?v=tYiz8AegtQ4

Be sure to enable **Developer Mode** in the settings for the bulb on the mobile app.


### Step 5
Make the change to IP address in the **control.js**.
```
const ipAddress = "ssh://ENDPOINT_IPADDRESS"
```


### Step 6
Install Dependencies
```
$ npm install
```

### Step 7
Run the code 
```
$ node control.js
```


