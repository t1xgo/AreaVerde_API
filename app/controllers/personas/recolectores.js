const PostgresService = require('../../services/postgres.service');
const _pg = new PostgresService();

const getRecolectores = async (req, res) => {
    let sql = `select personal.cedula, categorias.nombre as categoria, personal.id_personal, personal.nombre recolector 
    from personal inner join categorias on categorias.id_categoria = personal.id_categoriarecolector 
    where personal.tipo = 1`;
    try {
        let result = await _pg.executeSql(sql);
        return res.send({ ok: true, message: "Recolectores consultados", content: result.rows });
    } catch (error) {
        console.log(error);
        return res.send({ ok: false, message: "Error consultando los recolectores", content: error, });
    }
};

const createRecolector = async (req, res) => {
    try {
        let recolector = req.body;
        let sql = `insert into personal (nombre, cedula, tipo, usuario, password, celular, id_categoriarecolector)
        values ('${recolector.nombre}', '${recolector.cedula}', 1, '${recolector.cedula}', 
        md5('${recolector.cedula}'),'${recolector.celular}', ${recolector.id_categoriarecolector})`;
        let result = await _pg.executeSql(sql);
        return res.send({ ok: result.rowCount == 1, message: result == 1 ? "El recolector no fue creado" : "Recolector creado", content: recolector, });
    } catch (error) {
        console.log(error);
        return res.send({ ok: false, message: "Error creando el recolector", content: error, });
    }
};

const updateRecolector = async (req, res) => {
    let recolector = req.body;
    let sqlUpdate = `update personal set id_categoriarecolector = ${recolector.id_categoriarecolector} where id_personal = ${recolector.id_personal};
        `;
    try {
        let resultUpdate = await _pg.executeSql(sqlUpdate);
        return res.send({ ok: true, message: "Recolector actuaizado", content: resultUpdate.rows, });
    } catch (error) {
        console.log(error);
        return res.send({ ok: false, message: "Error actualizando el recolector", content: error, });
    }
};

module.exports = { getRecolectores, createRecolector, updateRecolector };