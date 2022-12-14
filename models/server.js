const express = require('express');
const cors= require('cors');
const { dbConnection } = require('../database/config');


class Server {

  constructor() {

    this.app = express();

    this.port= process.env.PORT;

    this.users = '/users';

    this.recipe = '/recipe';

    // Conectar a base de datos
    this.conectarDB();

    //Middlewares
    this.middlewares();

    //rutas de mi aplicacion
    this.routes();

  }

    async conectarDB(){

    await dbConnection();

  }

  middlewares(){

    //cors
    this.app.use( cors());

    //Parseo y lectura del body
    this.app.use( express.json() );

    //Directorio Publico
    this.app.use( express.static('public'));
    
  }

  routes() {

    this.app.use('/api/users', require('../routes/users'));
    this.app.use('/api/recipe', require ('../routes/recipe'));
  }


  listen (){

    this.app.listen( this.port, () => {

      console.log('Server running on port',this.port )});

  }

}

module.exports= Server;