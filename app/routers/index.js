const express = require('express');

const router = express.Router();
const _authController = require('../controllers/personas/auth.controller');
const _recolectoresController = require('../controllers/personas/recolectores');
const _administradoresController = require('../controllers/personas/administradores');
const _usuariosController = require('../controllers/personas/usuarios');
const _reportesController = require('../controllers/reportes/reportes');

router
    //Login y Registro
    .post('/personaCreate', _usuariosController.createPersona)
    .post('/login', _authController.getPersonaLogin)

    //Reports
    .get('/getReport/:id', _reportesController.getReport)

    //Creacion Report
    .post('/createReport', _reportesController.createReport)
    .post('/createReport/:id/archivos', _reportesController.saveFiles)

    //Creacion Recolector
    .post('/postrecolectores', _recolectoresController.createRecolector)

    //Creacion archivo
    .use("/public/static", express.static("docs"))

//Middleware
    .use([_authController.verifyTokenMiddleWare])
//Rutas

    //Verificar Token
    .get('/verify', _authController.verifyToken)

    //Recolectores
    .put('/putrecolectores', _recolectoresController.updateRecolector)
    .get('/getrecolectores', _recolectoresController.getRecolectores)
    .get('/getadministradores', _administradoresController.getAdministradores)

    //Administradores
    .get('/getadministradores', _administradoresController.getAdministradores);


module.exports = router;