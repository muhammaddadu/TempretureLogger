/**
* Monitors data from SensorTag and routes it back to client
* @Author Muhammad Dadu
*
* @Copyright (c) 2014 by Muhammad Dadu, Inc. All Rights Reserved.
* Licensed under the terms of the Apache Public License
* Please see the LICENSE included with this distribution for details.
*
*/
const SensorTag = require('sensortag');

SensorTag.discover(function(sensortag, udid) {
	console.log(sensortag);
	console.log('udid', sensortag);
});