const mongoose = require('mongoose');

const sensorReadingSchema = new mongoose.Schema({
	sensor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Sensor',
	},
	reading: {
		smokeLevel: {
			type: Number,
			required: true,
		},
		co2Level: {
			type: Number,
			required: true,
		},
		time: {
			type: Date,
			required: true,
			default: Date.now,
		},
	},
});

const SensorReading = mongoose.model('sensorReadings', sensorReadingSchema);
module.exports = SensorReading;
