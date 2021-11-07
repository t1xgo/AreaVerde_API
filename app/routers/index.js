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
    // IMG REPORTES
    .use("/public/static/docs", express.static("docs"))

    //AGREGAR ARCHIVOS A UN REPORTE
    .post('/createReport/:id/archivos', _reportesController.saveFiles)
    
    //Creacion Report
    .post('/createReport', _reportesController.createReport)

//REGISTRO DEL MIDDLEWARE
router.use([_authController.verifyTokenMiddleWare]);

//Verificar Token
router
    .get('/verify', _authController.verifyToken)

    //Reports
    .get('/getReports/:id', _reportesController.getReport)
    .get('/getReports', _reportesController.getReportes)

    //Recolector
    .post('/postrecolectores', _recolectoresController.createRecolector)
    .get('/getrecolectores', _recolectoresController.getRecolectores)

    //Recolectores
    .put('/putrecolectores', _recolectoresController.updateRecolector)

    //Administradores
    .get('/getadministradores', _administradoresController.getAdministradores)


module.exports = router;