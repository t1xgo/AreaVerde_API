const PostgresService = require('../../services/postgres.service');
const _pg = new PostgresService();

const createPersona = async (req, res) => {
    try {
        let persona = req.body;
        let sql = `INSERT INTO public.usuarios
        (nombre, cedula, correo, usuario, "password", fechanacimiento, celular)
        values('${persona.nombre}', '${persona.cedula}', 
            md5('${persona.password}'),'${persona.fechanacimiento}', '${persona.celular}')`;
        let result = await _pg.executeSql(sql);
        return res.send({ ok: result.rowCount == 1, message: result == 1 ? "El usuario no fue creado" : "Usuario creado", content: persona, });
    } catch (error) {
        console.log(error);
        return res.send({ ok: false, message: "Error creando el usuario", content: error, });
    }
};

const getUsuario = async (req, res) => {
    let id = req.params.id;
    let sql = `SELECT id_personal, nombre, cedula, tipo, usuario,"password",
     fechanacimiento, celular, id_categoriarecolector FROM personal 
     WHERE id_personal = ${id} limit 1`;

    try {
        let result = await _pg.executeSql(sql);
        console.log(result);
        return res.send({ ok: true, message: "usuario consultado", content: result.rows});
    }
     catch (error) {
        let sql = `SELECT id_usuario, nombre, cedula, correo, usuario, 
        "password", fechanacimiento, celular FROM usuarios WHERE id_usuario = ${id} limit 1`;
        try {
            let result = await _pg.executeSql(sql);
            console.log(result);
            return res.send({ ok: true, message: "usuario consultado", content: result.rows});
        } catch (error) {
            console.log(error);
            return res.send({ ok: false, message: "Error consultando el usuario", content: error, });
        }
    }
};

module.exports = { getUsurio, createPersona };