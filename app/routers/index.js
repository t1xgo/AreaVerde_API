const express = require('express');

const router = express.Router();
const _recolectoresController = require('../controllers/personas/recolectores');
const _administradoresController = require('../controllers/personas/administradores');
const _usuariosController = require('../controllers/personas/usuarios');
const _reportesController = require('../controllers/reportes/reportes');

router
    .put('/putrecolectores', _recolectoresController.updateRecolector)
    .post('/postrecolectores', _recolectoresController.createRecolector)
    .get('/getrecolectores', _recolectoresController.getRecolectores)
    .get('/getadministradores', _administradoresController.getAdministradores);

module.exports = router;