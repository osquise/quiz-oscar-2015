var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(null, null, null,
    { dialect:  "sqlite", storage:  "quiz.sqlite"}
);

// Importar definicion de la tabla Quiz
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

// exportar definici�n de tabla Quiz
exports.Quiz = Quiz;

// sequelize.sync() inicializa tabla de preguntas en DB
sequelize.sync().then(function() {
    // success(..) ejecuta el manejador una vez creada la tabla
    Quiz.count().then(function (count){
        if(count === 0) {   // la tabla se inicializa solo si est� vac�a
            Quiz.create ({  pregunta: 'Capital de Italia',
                            respuesta: 'Roma'
                        })
            .then(function(){console.log('Base de datos inicializada')});
        };
    });
});