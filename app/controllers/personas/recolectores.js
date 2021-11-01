const PostgresService = require('../../services/postgres.service');
const _pg = new PostgresService();

const getRecolectores = async (req, res) => {
    let sql = `select * from personal where tipo = 1`;
    try {
        let result = await _pg.executeSql(sql);
        console.log(result);
        return res.send({ ok: true, message: "Recolectores consultados", content: result.rows});
    } catch (error) {
        console.log(error);
        return res.send({ ok: false, message: "Error consultando los recolectores", content: error, });
    }
};

const createRecolector = async (req, res) => {
    try {
        let recolector = req.body;
        let sql = `insert into personal (nombre, cedula, tipo, usuario, password, fechanacimiento, celular, id_categoriarecolector)
        values ('${recolector.nombre}', '${recolector.cedula}', 1, '${recolector.usuario}', '${recolector.cedula}', '${recolector.fechanacimiento}', '${recolector.nombres}', ${recolector.id_categoriarecolector})`;
        let result = await _pg.executeSql(sql);
        return res.send({ ok: result.rowCount == 1, message: result == 1 ? "El recolector no fue creado" : "Recolector creado", content: recolector, });
    } catch (error) {
        console.log(error);
        return res.send({ ok: false, message: "Error creando el recolector", content: error, });
    }
};

const updateRecolector = async (req, res) => {
    let recolector = req.body;
    let sql = `select id_personal from personal where cedula = '${recolector.cedula}'`;
    let result = await _pg.executeSql(sql);
    if (result.rowCount != 1) {
        return res.send("El recolector no existe");
    } else {
        let sqlUpdate = `update personal set id_categoriarecolector = ${recolector.id_categoriarecolector} where id_personal = ${result};
        `;
        try {
            let resultUpdate = await _pg.executeSql(sqlUpdate);
            return res.send({ ok: true, message: "Recolector actuaizado", content: resultUpdate.rows, });
        } catch (error) {
            console.log(error);
            return res.send({ ok: false, message: "Error actualizando el recolector", content: error, });
        }
    }
};

module.exports = { getRecolectores, createRecolector, updateRecolector };