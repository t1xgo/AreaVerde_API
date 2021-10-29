const express = require('express');

const router = express.Router();
const _recolectoresController = require('../controllers/personas/recolectores');
const _administradoresController = require('../controllers/personas/administradores');
const _usuariosController = require('../controllers/personas/usuarios');
const _reportesController = require('../controllers/reportes/reportes');

router
    //Recolectores
    .put('/putrecolectores', _recolectoresController.updateRecolector)
    .post('/postrecolectores', _recolectoresController.createRecolector)
    .get('/getrecolectores', _recolectoresController.getRecolectores)
    .get('/getadministradores', _administradoresController.getAdministradores)

    //Reports
    .post('/createReport', _reportesController.createReport)
    .get('/getReport/:id', _reportesController.getReport)

    //Administradores
    .get('/getadministradores', _administradoresController.getAdministradores)

    //Usuarios
    .get("/personaGet/:id", _usuariosController.getUsuario);


module.exports = router;