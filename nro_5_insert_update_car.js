const Sequelize = require('sequelize');

const sequelize = new Sequelize('prueba', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });



class Cars extends Sequelize.Model {}
Cars.init({
  marca: Sequelize.STRING,
  modelo:Sequelize.STRING
}, { sequelize, modelName: 'cars' });


/* crea un auto */
sequelize.sync()
  .then(() => Cars.create({
    marca: 'Chevrolet',
    modelo: 'Bora'
  }))
  .then(jane => {
    console.log(jane.toJSON());
  })

/* edita el auto recien creado */

  .then(() => Cars.update({ marca: "Volkswagen" }, {
    where: {
      modelo: 'Bora'
    }
  }).then(() => {
    console.log("Done");
  }))
