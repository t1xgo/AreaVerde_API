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

    //Creacion Report
    .post('/createReport', _reportesController.createReport)
    .post('/createReport/:id/archivos', _reportesController.saveFiles)

//REGISTRO DEL MIDDLEWARE
router.use([_authController.verifyTokenMiddleWare]);

//Verificar Token
router
    .get('/verify', _authController.verifyToken)

    //Reports
    .get('/getReport/:id', _reportesController.getReport)
    .use("/public/static", express.static("docs"))

    //Recolector
    .post('/postrecolectores', _recolectoresController.createRecolector)
    .get('/getrecolectores', _recolectoresController.getRecolectores)
    //Creacion archivo
    .use("/public/static", express.static("docs"))

    //Rutas

    //Recolectores
    .put('/putrecolectores', _recolectoresController.updateRecolector)
    .get('/getadministradores', _administradoresController.getAdministradores)

    //Administradores
    .get('/getadministradores', _administradoresController.getAdministradores)


module.exports = router;