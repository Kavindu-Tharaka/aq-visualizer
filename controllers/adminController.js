const Admin = require('../models/Admin');

exports.getAdmin = async (req, res, next) => {
	try {
		const admin = await Admin.find();

		res.status(201).json({
			status: 'success',
			data: {
				admin,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message,
		});
	}
};

exports.updateAdmin = async (req, res, next) => {
	try {
		const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		res.status(200).json({
			status: 'success',
			data: {
				admin,
			},
		});
	} catch (err) {
		res.status(400).json({
			status: 'failed',
			message: err.message,
		});
	}
}
