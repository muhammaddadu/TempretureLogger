/**
* Monitors data from SensorTag and routes it back to client
* @Author Muhammad Dadu
*
* @Copyright (c) 2014 by Muhammad Dadu. All Rights Reserved.
* Licensed under the terms of the Apache Public License
* Please see the LICENSE included with this distribution for details.
*
*/
const 
	SensorTag = require('sensortag'),
	http = require('http').Server(),
	io = require('socket.io')(http);

SensorTag.discover(function(device) {
	console.log('SensorTag Discovered');
	// Connect to device
	device.connect(function() {
		console.log('SensorTag Connected');
		device.discoverServicesAndCharacteristics(function() {
			// Log device services & characteristics
			device.readDeviceName(function(deviceName) {
				console.log('readDeviceName', deviceName);
			});
			device.readSystemId(function(systemId) {
				console.log('readSystemId', systemId);
			});
			device.readSerialNumber(function(serialNumber) {
				console.log('readSerialNumber', serialNumber);
			});
			device.readFirmwareRevision(function(firmwareRevision) {
				console.log('readFirmwareRevision', firmwareRevision);
			});
			device.readHardwareRevision(function(hardwareRevision) {
				console.log('readHardwareRevision', hardwareRevision);
			});
			device.readSoftwareRevision(function(softwareRevision) {
				console.log('readSoftwareRevision', softwareRevision);
			});
			device.readManufacturerName(function(manufacturerName) {
				console.log('readManufacturerName', manufacturerName);
			});

			// Enable Tempreture
			device.enableIrTemperature(function() {
				setInterval(function() {
					device.readIrTemperature(function(objectTemperature, ambientTemperature) {
						console.log('readIrTemperature', new Date(), objectTemperature, ambientTemperature);
						io.emit(ambientTemperature);
					});
				}, 350);
			});
		});
	});
});


io.on('connection', function(socket){
	console('Socket connected:', socket);
});

http.listen(3000, function(){

});