const { Router} = require('express');
const { save, fetch} = require ('../controllers/recipe');
const {validateFields} = require ('../middlewares/validate-fields');
const {validarJWT} = require ('../middlewares/validate-jwt');


const routes = Router();

routes.put('/save',[
    validarJWT,
    validateFields
], save);

routes.get('/fetch',[
    validarJWT,
    validateFields
], fetch)

module.exports = routes


