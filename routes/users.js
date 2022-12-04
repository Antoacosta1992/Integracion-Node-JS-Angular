const { Router} = require('express');
const { check } = require('express-validator');
const { signUp, login } = require('../controllers/user');

const {validateFields} = require('../middlewares/validate-fields');
const { validatePassword } = require('../middlewares/validate-password');

const { emailExists, emailNoExists} = require('../helpers/db-validator');



const routes = Router();
//puedan realizar peticianes a esas rutas, que se van a exponer desde el servidor de node js
//para que las aprlicaciones extenar se puedan conectar 
//SINGUP
routes.post('/singup',[
    check('email', 'the email is not válid').isEmail(),
    check('email').custom( emailExists ),
    check('password', 'The password must be more than 6 letters').isLength({ min: 6 }),
    check("password", "The password is mandatory").not().isEmpty(),
    //validatePassword,
    validateFields
], signUp)

//LOGIN
routes.post("/login", [
	check("email", "The email is not valid").isEmail(),
	check("email").custom(emailNoExists),
	check("password", "The password is mandatory").not().isEmpty(),
	validatePassword,
	validateFields
], login);




    module.exports =  routes;