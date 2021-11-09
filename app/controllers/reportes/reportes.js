const PostgresService = require('../../services/postgres.service');
const _pg = new PostgresService();
const { createFolder, saveFile, readDirectory } = require("../../services/fs.service");

//Crear reporte
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
      content: { report, id: report.id_usuario },
    });
  } catch (error) {
    return res.send({
      ok: false,
      message: "Error creando el reporte",
      content: error,
    });
  }
};
//Traer TODOS los reportes con estado = 2, filtrando tipo recolector
const getReportesRecogidos = async (req, res) => {
  try {
    let id = req.params.id;
    let sql_categoria = `select id_categoriarecolector from personal where id_personal = ${id}`
    let resultCategoria = await _pg.executeSql(sql_categoria);
    let categoria = resultCategoria.rows[0];
    let sql = `select id_reporte, rutaimagen, reportes.descripcion, ubicacion,
                estado,categorias.descripcion as categoria from reportes inner join categorias 
                on reportes.id_categoria = categorias.id_categoria 
                where reportes.id_categoria = ${categoria.id_categoriarecolector} and estado = 2`;
    let result = await _pg.executeSql(sql);
    if (result != undefined) {
      let rows = result.rows;
      return res.send({
        ok: true,
        message: "Reportes consultados",
        content: rows,
      });
    }
    else {
      let sql = ` select id_reporte, rutaimagen, reportes.descripcion, ubicacion ,estado,
                  categorias.descripcion as categoria from reportes inner join categorias 
                  on reportes.id_categoria = categorias.id_categoria 
                  where estado = 2`;
      let result = await _pg.executeSql(sql);
      let rows = result.rows;
      return res.send({
        ok: true,
        message: "Reportes consultados",
        content: rows,
      });
    }
  } catch (error) {
    return res.send({
      ok: false,
      message: "Ha ocurrido un error consultando los reportes",
      content: error,
    });
  }
};

//Traer TODOS los reportes con estado = 1
const getReportesPendientes = async (req, res) => {
  try {
    let id = req.params.id;
    let sql = `select id_reporte, rutaimagen, descripcion, ubicacion ,estado,id_categoria 
      from reportes where id_categoria = (select id_categoria from personal 
        where id_personal = ${id}) and estado = 1`;
    let result = await _pg.executeSql(sql);
    let rows = result.rows;
    return res.send({
      ok: true,
      message: "Reportes consultados",
      content: rows,
    });

  } catch (error) {
    return res.send({
      ok: false,
      message: "Ha ocurrido un error consultando los reportes",
      content: error,
    });
  }
};

//Traer TODOS los reportes con estado = 0
const getReportes = async (req, res) => {
  try {
    let sql = `select id_reporte, rutaimagen, reportes.descripcion as descripcion, ubicacion, estado, categorias.nombre as categoria
      from reportes inner join
      categorias on categorias.id_categoria = reportes.id_categoria where estado = 0`;
    let result = await _pg.executeSql(sql);
    let rows = result.rows;
    return res.send({
      ok: true,
      message: "Reportes consultados",
      content: rows,
    });

  } catch (error) {
    return res.send({
      ok: false,
      message: "Ha ocurrido un error consultando los reportes",
      content: error,
    });
  }
};

// Traer los reportes de UN USUARIO logueado
const getReport = async (req, res) => {
  try {
    let id = req.params.id;
    let sql = `select reportes.id_reporte, reportes.rutaimagen, reportes.descripcion, reportes.ubicacion, reportes.estado, categorias.nombre as categoria
    from reportes inner join categorias on reportes.id_categoria = categorias.id_categoria 
    where id_usuario = ${id}`;
    let result = await _pg.executeSql(sql);
    let rows = result.rows;
    return res.send({
      ok: true,
      message: "Reportes consultados del usuario",
      content: rows,
    });
  } catch (error) {
    return res.send({
      ok: false,
      message: "Ha ocurrido un error consultando los reportes del usuario",
      content: error,
    });
  }
};
//Guardar imagenes de reportes
const saveFiles = async (req, res) => {
  try {
    let id = req.params.id;
    let files = req.files;
    let image = files.imagen;
    let pathReportes = `./docs/${id}/`;
    createFolder(pathReportes);
    saveFile(`${pathReportes}${image.name}`, image.data);
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

const CambiarEstado = async (req, res) => {
  let report = req.body;
  let sql = `update reportes set estado = 2 where id_reporte = ${report.id_reporte}`;
  try {
    let result = await _pg.executeSql(sql);
    return res.send({
      ok: result.rowCount == 1,
      message: result == 1 ? "El reporte no fue actualizado" : "Reporte actualizado",
      content: { report },
    });
  } catch (error) {
    return res.send({
      ok: false,
      message: "Error actualizando el reporte",
      content: error,
    });
  }
}

const estadoAprobado = async (req, res) => {
  let report = req.body;
  let sql = `update reportes set estado = 1 where id_reporte = ${report.id_reporte}`;
  try {
    let result = await _pg.executeSql(sql);
    return res.send({
      ok: result.rowCount == 1,
      message: result == 1 ? "El reporte no fue actualizado" : "Reporte actualizado",
      content: { report },
    });
  } catch (error) {
    return res.send({
      ok: false,
      message: "Error actualizando el reporte",
      content: error,
    });
  }
};

const estadoAprobadoCategoria = async (req, res) => {
  let report = req.body;
  let sql = `update reportes set estado = 1, id_categoria = ${report.id_categoria} where id_reporte = ${report.id_reporte}`;
  try {
    let result = await _pg.executeSql(sql);
    return res.send({
      ok: result.rowCount == 1,
      message: result == 1 ? "El reporte no fue actualizado" : "Reporte actualizado",
      content: { report },
    });
  } catch (error) {
    return res.send({
      ok: false,
      message: "Error actualizando el reporte",
      content: error,
    });
  }
}


const eliminarReporte = async (req, res) => {
  let id = req.params.id;
  let sql = `delete from reportes where id_reporte = ${id}`;
  try {
    await _pg.executeSql(sql);
    return res.send({
      ok: true,
      message: "Reporte eliminado",
      content: { report },
    });
  } catch (error) {
    return res.send({
      ok: false,
      message: "Error eliminando el reporte",
      content: error,
    });
  }
}

const estadisticasAdministrador = async (req, res) => {
  let estado = req.params.estado;
  let categoria = req.params.categoria;
  let sql = `select count(*) from reportes where estado = ${estado} and id_categoria = ${categoria}`
  try {
    let result = await _pg.executeSql(sql);
    let rows = result.rows;
    return res.send({
      ok: true,
      message: "Estadisticas consultadas",
      content: rows,
    });
  } catch (error) {
    return res.send({
      ok: false,
      message: "Ha ocurrido un error consultando las estadisticas",
      content: error,
    });
  }
}

const totalreportes = async (req, res) => {
  let sql = `select count(*) from reportes`
  try {
    let result = await _pg.executeSql(sql);
    return res.send({
      ok: true,
      message: "Estadisticas consultadas",
      content: result,
    });
  } catch (error) {
    return res.send({
      ok: false,
      message: "Ha ocurrido un error consultando las estadisticas",
      content: error,
    });
  }
}

const totalreportesCategoria = async (req, res) => {
  let categoria = req.params.categoria;
  let sql = `select count(*) from reportes where id_categoria = ${categoria};`
  try {
    let result = await _pg.executeSql(sql);
    return res.send({
      ok: true,
      message: "Estadisticas consultadas",
      content: result,
    });
  } catch (error) {
    return res.send({
      ok: false,
      message: "Ha ocurrido un error consultando las estadisticas",
      content: error,
    });
  }
}

const getporcentajeRecogidos = async (req, res) => {
  let categoria = req.params.categoria;
  let sql = `select count(*) from reportes where id_categoria = ${categoria} and estado = 2`
  try {
    let result = await _pg.executeSql(sql);
    return res.send({
      ok: true,
      message: "Estadisticas consultadas",
      content: result,
    });
  } catch (error) {
    return res.send({
      ok: false,
      message: "Ha ocurrido un error consultando las estadisticas",
      content: error,
    });
  }
}


  module.exports = {
    createReport, getReportes, getReport, saveFiles,
    estadoAprobado, estadoAprobadoCategoria, eliminarReporte,
    getReportesPendientes, getReportesRecogidos, CambiarEstado,
    totalreportes, totalreportesCategoria, getporcentajeRecogidos,
    estadisticasAdministrador
  };