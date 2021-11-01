const PostgresService = require('../../services/postgres.service');
const _pg = new PostgresService();
const _jwt = require('../../services/jwt.service');

const getPersonaLogin = async (req, res) => {
  try {
    let user = req.body;
    let sql = `select nombre,cedula,correo from usuarios WHERE usuario='${user.usuario}' 
    AND password = '${user.password}' limit 1`;
    let result = await _pg.executeSql(sql);
    let user_logged = result.rows[0];
    console.log(user_logged);
    if (user_logged != undefined) {
      let token = user_logged ? _jwt.sign(user_logged) : null;
      return res.send({
        ok: user_logged ? true : false,
        message: user_logged
          ? `Bienvenido ${user_logged.nombre}`
          : "Usuario no encontrado, verificar identificación y/o contraseña.",
        content: { token, name: user_logged.nombre, rol: user_logged.id_rol },
      });
    } else {
      sql = `select nombre,cedula,tipo from personal WHERE usuario='${user.usuario}' 
      and password = '${user.password}' limit 1`;
      result = await _pg.executeSql(sql);
      user_logged = result.rows[0];
      console.log(user_logged);
      let token = user_logged ? _jwt.sign(user_logged) : null;
      return res.send({
        ok: user_logged ? true : false,
        message: user_logged
          ? `Bienvenido recolector ${user_logged.nombre}`
          : "Usuario no encontrado, verificar identificación y/o contraseña.",
        content: { token, name: user_logged.nombre, rol: user_logged.tipo },
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