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

module.exports = { getRecolectores };