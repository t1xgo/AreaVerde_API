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
    .delete('/eliminarReporte/:id', _reportesController.eliminarReporte)

//REGISTRO DEL MIDDLEWARE
router.use([_authController.verifyTokenMiddleWare]);

//Verificar Token
router
    .get('/verify', _authController.verifyToken)

    //Reports
    .get('/getReports/:id', _reportesController.getReport)
    .get('/getReportsRecogidos/:id', _reportesController.getReportesRecogidos)
    .get('/getReportsPendientes/:id', _reportesController.getReportesPendientes)
    .get('/getReports', _reportesController.getReportes)
    .put('/cambiarEstado', _reportesController.CambiarEstado)
    .put('/estadoAprobado', _reportesController.estadoAprobado)
    .put('/estadoAprobadoCategoria', _reportesController.estadoAprobadoCategoria)
    
    //Recolector
    .post('/postrecolectores', _recolectoresController.createRecolector)
    .get('/getrecolectores', _recolectoresController.getRecolectores)

    //Recolectores
    .put('/putrecolectores', _recolectoresController.updateRecolector)

    //Administradores
    .get('/getadministradores', _administradoresController.getAdministradores)

    //Estadisticas
    .get('/estadisticasAdministrador/:estado/:categoria', _reportesController.estadisticasAdministrador)
    .get('/totalreportesCategoria/:categoria', _reportesController.totalreportesCategoria)
    .get('/porcentajeCategoria/:categoria', _reportesController.getporcentajeRecogidos)
    .get('/totalreportes', _reportesController.totalreportes)

module.exports = router;