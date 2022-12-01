
const { response, request } = require('express');
const jwt = require ('jsonwebtoken');
const User = require('../models/user');

const validarJWT = async( req = request, res = response, next) => {
    const {auth} = req.query;
    console.log(auth);

    if ( !auth ){
        return res.status(401).json({
            msg: 'there is no token in the request'
        });
    }

    try {
        const { uid } = jwt.verify(auth, process.env.SECRETORPRIVATEKEY);
//esta funcion me sirve para verificar el JWT, si no es valido dispara la parte del catch.
       const user = await User.findById( uid ); //con esto leo el usuario

       req.user = user;
       next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Invalid token'
        });
    }
    //llamo al next para que continue con lo que sigue

}

//el middlewares se dispara con tres argumentos, la request, response (para tener el tipado arrriba) y la funcion 
//next que tengo que llamar p indicarle a quien sea que esté ejutando el middlewear puede continnuar con el siguiente
//o con el controlador.

module.exports = {
    validarJWT
}