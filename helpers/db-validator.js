
const User = require('../models/user');

const emailExists = async (email = "") => {
	const existEmail = await User.findOne({ email });
// si el codigo lo encontro...
	if (existEmail) {
		throw new Error(`The email ${email} is already registered`);
	}

	return true;
}

const emailNoExists = async (email = "") => {
	const existEmail = await User.findOne({ email });

	if (!existEmail) {
		throw new Error(`The email ${email} is not registered`);
	}

	return true;
}


module.exports = {
	emailExists,
	emailNoExists
}