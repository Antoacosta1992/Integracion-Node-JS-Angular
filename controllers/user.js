const bcryptjs= require('bcryptjs');
const { generarJWT } = require('../helpers/generate-jwt');
const User = require('../models/user');

const signUp = async (req, res) => {
	try {
		const { email, password } = req.body
		const user = new User({email, password});
        //convierte
	

		//antes de guardarlo se incripta
		const salt = bcryptjs.genSaltSync();
	    user.password = bcryptjs.hashSync(password, salt);
		//se va a guardar el objeto User.

		console.log(user);
		const token = await generarJWT(user._id); 
		//helpers
	    user.idToken = token;
		//si no le asigno la variable user nunca se va a guardar
	     //lo guarda
		await user.save();
	
		//podemos personalizar como se retorna
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


		//se lo pasa a angular y responde esto.
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


