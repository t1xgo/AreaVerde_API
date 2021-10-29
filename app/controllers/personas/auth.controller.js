const PostgresService = require('../../services/postgres.service');
const _pg = new PostgresService();
const _jwt = require('../../services/jwt.service');
const { emptyQuery } = require('pg-protocol/dist/messages');

const getPersonaLogin = async (req, res) => {
    try {
      let user = req.body;
      let sql = `select nombre, cedula, correo from usuarios WHERE password = md5('${user.password}')
      AND usuario='${user.usuario}' limit 1`;
      let result = await _pg.executeSql(sql);
      if(result.rowCount!=1)
      {
        let sql2 = `select nombre, cedula, id_categoriarecolector from personal WHERE password = md5('${user.password}')
        AND usuario='${user.usuario}' limit 1`;
        let result2 = await _pg.executeSql(sql2);
        let user_logged = result2.rows[0];
        console.log(user_logged);
        let token = user_logged ? _jwt.sign(user_logged) : null;
        return res.send({
          ok: user_logged ? true : false,
          message: user_logged
            ? `Bienvenido ${user_logged.nombre}`
            : "Usuario no encontrado, verificar identificación y/o contraseña.",
          content: { token, name: user_logged.nombre},
        });
      }
      else
      {
        let user_logged = result.rows[0];
        console.log(user_logged);
        let token = user_logged ? _jwt.sign(user_logged) : null;
        return res.send({
          ok: user_logged ? true : false,
          message: user_logged
            ? `Bienvenido ${user_logged.nombre}`
            : "Usuario no encontrado, verificar identificación y/o contraseña.",
          content: { token, name: user_logged.nombre},
        });
      }
    } catch (error) {
      console.log(error);
      return res.send({
        ok: false,
        message: "Ha ocurrido un error consultando el usuario.",
        content: error,
      });
    }
  };

const verifyToken = (req, res) => {
    try {
        let token = req.headers.token;
        let persona = _jwt.verify(token);
        return res.send({
            ok: true,
            message: "Token verificado",
            content: persona
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "El token no se pudo verificar",
            content: persona
        });
    }
};

const verifyTokenMiddleWare = (req, res, next) => {
    try {
        let token = req.headers.token;
        let persona = _jwt.verify(token);
        next();
    } catch (error) {
        return res.send({
            ok: false,
            message: "El token no se pudo verificar",
        });
    }
}

module.exports = { getPersonaLogin, verifyToken, verifyTokenMiddleWare };



