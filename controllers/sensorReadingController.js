const SensorReading = require('../models/SensorReading');
const Sensor = require('../models/Sensor');
const Moment = require('moment');

exports.addSensorReading = async (req, res) => {
	try {
		// Insert the new sensor document in to SensorReadings collection
		const newSensorReading = await SensorReading.create({
			sensor: req.params.id,
			reading: {
				smokeLevel: req.body.reading.smokeLevel,
				co2Level: req.body.reading.co2Level,
			},
		});

		// Update the sensor's last reading in the Sensors collection
		let lastReading = newSensorReading.reading;
		lastReading.time = Moment(lastReading.time).format(
			'MMMM Do YYYY, h:mm:ss a'
		);

		await Sensor.findByIdAndUpdate(
			req.params.id,
			{ lastReading },
			{
				new: true,
				runValidators: true,
			}
		);

		// Send response to the client
		res.status(201).json({
			status: 'success',
			data: {
				sensorReading: newSensorReading,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message,
		});
	}
};

exports.getSensorReadings = async (req, res) => {
	try {
		const sensorReadings = await SensorReading.find({
			sensor: req.params.id,
		});

		res.status(200).json({
			status: 'success',
			results: sensorReadings.length,
			data: {
				sensorReadings,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message,
		});
	}
};
