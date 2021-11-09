
const PostgresService = require('../../services/postgres.service');
const _pg = new PostgresService();


const createPersona = async (req, res) => {
    try {
        let persona = req.body;
        let sqlValidacion = `select cedula,correo from usuarios 
        where cedula = '${persona.cedula}'  or correo = '${persona.correo}'`
        let resultValidacion = await _pg.executeSql(sqlValidacion);
        if(resultValidacion.rowCount == 0)
        {
            console.log("Holaaaa");
            let sql = `INSERT INTO usuarios (nombre,
                 cedula, correo, usuario, password, fechanacimiento,
                 celular) VALUES('${persona.nombre}', '${persona.cedula}', '${persona.correo}', 
                  '${persona.usuario}', md5('${persona.password}'), '${persona.fechanacimiento}','${persona.celular}')`;
            let result = await _pg.executeSql(sql);
            let sqlId = `select correo from usuarios where correo = '${persona.correo}'`
            let resultID = await _pg.executeSql(sqlId);
            let rowsResult = resultID.rows[0];
            return res.send({ ok: result.rowCount == 1, message: result == 1 ?
                 "El usuario no fue creado" : "Usuario creado", content: {persona,id:rowsResult.id_usuario} });
        }
    }
    catch (error) {
        console.log("ERRRRRRRRRRRRRRRRRRORR",error);
        return res.send({ ok: false, message: "Error creando el usuario", content: error, });
    }
};

module.exports = { createPersona };
