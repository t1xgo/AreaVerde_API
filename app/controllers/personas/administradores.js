const PostgresService = require('../../services/postgres.service');
const _pg = new PostgresService();

const getAdministradores = async (req, res) => {
    let sql = `select * from personal where tipo = 0`;
    try {
        let result = await _pg.executeSql(sql);

        return res.send({ ok: true, message: "Administradores consultados", content: result.rows});
    } catch (error) {
        console.log(error);
        return res.send({ ok: false, message: "Error consultando los administradores", content: error, });
    }
};

module.exports = { getAdministradores };