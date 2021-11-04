const PostgresService = require('../../services/postgres.service');
const _pg = new PostgresService();
const { createFolder, saveFile, readDirectory } = require("../../services/fs.service");

const createReport = async (req, res) => {
    let report = req.body;
    let sql = `insert into reportes (descripcion, id_categoria, id_usuario, ubicacion, rutaimagen, 
            estado) values('${report.descripcion}', '${report.id_categoria}', 
            ${report.id_usuario}, '${report.ubicacion}', 
            './docs/${report.id_usuario}/${report.rutaimagen}', '${report.estado}')`;

    try {
        let result = await _pg.executeSql(sql);
        return res.send({
            ok: result.rowCount == 1,
            message: result == 1 ? "El reporte no fue creado" : "Reporte creado",
            content: {report,id:report.id_usuario},
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "Error creando el reporte",
            content: error,
        });
    }
};

//Traer todos los reportes
const getReportes = async (req, res) => {
  let sql = `select rutaimagen,descripcion,ubicacion,estado from reportes`;
  try {
      let result = await _pg.executeSql(sql);
      return res.send(result.rows);
  } catch (error) {
      return res.send({ ok: false, message: "Error consultando los usuarios", content: error, });
  }
};

const getReport = async (req, res) => {
    let id = req.params.id;
    let sql = `select reportes.id_reporte, reportes.descripcion, categorias.nombre as categoria, usuarios.usuario, 
                    reportes.ubicacion, reportes.rutaimagen, reportes.estado from reportes 
                    inner join categorias on reportes.id_categoria = categorias.id_categoria  
                    inner join usuarios on usuarios.id_usuario = reportes.id_usuario 
                where id_reporte = ${id} limit 1`;
    try {
        let result = await _pg.executeSql(sql);
        return res.send({ ok: true, message: "Reporte consultado", content: result.rows, });
    } catch (error) {
        return res.send({ ok: false, message: "Error consultando el reporte", content: error, });
    }
};

const saveFiles = async (req, res) => {
    try {
      console.log('SAVEFLES()');
      let id = req.params.id;
      let files = req.files;
      let image = files.imagen;
      let pathReportes = `./docs/`;
      createFolder(pathReportes);
      saveFile(`${pathReportes}${image.name}`, image.data);
      console.log('SAVEFLES()');
      return res.send({
        ok: true,
        message: "Archivos cargados.",
        content: {},
      });
    } catch (error) {
      console.log('ERROR SAVEFILES', error);
      return res.status(500).send({
        ok: false,
        message: "Ha ocurrido un error subiendo el archivo",
        content: error,
      });
    }
  };

module.exports = { createReport,getReportes, getReport, saveFiles };