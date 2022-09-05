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


/* crea varios autos */
sequelize.sync()
  .then(() => Cars.create({
    marca: 'Chevrolet',
    modelo: 'Cruze'
  }))
  .then(jane => {
    console.log(jane.toJSON());
  }).then(() => Cars.create({
    marca: 'BMW',
    modelo: '320'
  }))
  .then(jane => {
    console.log(jane.toJSON());
  }).then(() => Cars.create({
    marca: 'Alfa Romeo',
    modelo: '159'
  }))
  .then(jane => {
    console.log(jane.toJSON());
  })

/* edita algunos autos */

  .then(() => Cars.update({ modelo: "156" }, {
    where: {
      marca: 'Alfa Romeo'
    }
  }).then(() => {
    console.log("Done");
  })).then(() => Cars.update({ marca: "Audi", modelo: 'A1' }, {
    where: {
      marca: 'BMW'
    }
  }).then(() => {
    console.log("Done");
  }))
