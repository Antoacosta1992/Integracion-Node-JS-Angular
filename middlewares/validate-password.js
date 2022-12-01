const bcryptjs= require('bcryptjs');
const User = require('../models/user');

const validatePassword = async (req, res, next) => {
const { email, password } = req.body;
const user = await User.findOne({ email });
const validPassword = bcryptjs.compareSync(password, user.password);

	if (!validPassword) {
	return res.status(400).json({
			msg: "The password is incorrect"
		});
	}

	next();
}
module.exports = {
   validatePassword
}
