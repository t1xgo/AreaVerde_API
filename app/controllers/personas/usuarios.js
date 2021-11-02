
const PostgresService = require('../../services/postgres.service');
const _pg = new PostgresService();


const createPersona = async (req, res) => {
    try {
        
        let persona = req.body;
        let sql = `INSERT INTO usuarios (nombre,
             cedula, correo, usuario, password, fechanacimiento,
              celular) VALUES('${persona.nombre}', '${persona.cedula}', '${persona.correo}', 
              '${persona.usuario}', md5('${persona.password}'), '${persona.fechanacimiento}','${persona.celular}')`;
        console.log(sql)
        let result = await _pg.executeSql(sql);
        console.log(result);
        return res.send({ ok: result.rowCount == 1, message: result == 1 ? "El usuario no fue creado" : "Usuario creado", content: persona, });
    }
    catch (error) {
        console.log("ERRRRRRRRRRRRRRRRRRORR",error);
        return res.send({ ok: false, message: "Error creando el usuario", content: error, });
    }
};

module.exports = { createPersona };
