const bcryptjs= require('bcryptjs');
const { generarJWT } = require('../helpers/generate-jwt');
const User = require('../models/user');

const signUp = async (req, res) => {
	try {
		const { email, password } = req.body
		const user = new User({email, password});
		const salt = bcryptjs.genSaltSync();
	    user.password = bcryptjs.hashSync(password, salt);
		//Generar la data a guardar

		console.log(user);
		const token = await generarJWT(user._id);
	    user.idToken = token;
		// Guardar DB
	
		await user.save();
	
		res.status(201).json({
			email: user.email,
			localId: user.localId,
			idToken: user.idToken,
			expiresIn: user.expiresIn,
		});
	
	
	  } catch (error) {
	          console.log(error);
	
		res.status(500).json({
	
		  msg: "The user could not save, talk to the administrator"
	
		});
	
	  }
}


const login = async (req, res) => {
	try {
		const { email } = req.body;
		const user = await User.findOne({ email });
		const token = await generarJWT (user._id);
		user.idToken = token;

		res.status(200).json({
			email: user.email,
			localId: user.localId,
			idToken: user.idToken,
			expiresIn: user.expiresIn
		});
	} catch (error) {
		console.log(error);

		res.status(500).json({
			msg: "The user could not login, talk to the administrator"
		});
	}
}

module.exports= {
 signUp,
 login
}


