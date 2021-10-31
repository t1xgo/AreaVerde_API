const PostgresService = require('../../services/postgres.service');
const _pg = new PostgresService();
const _jwt = require('../../services/jwt.service');

 /**
 * Método para obtener el usuario que se esta logueando
 * @param {Request} req
 * @param {Response} res
 * @returns
 */ 
  const getPersonaLogin = async (req, res) => {
    try {
      let user = req.body;
      let sql = `select nombre,cedula from usuarios WHERE usuario='${user.usuario}' 
      AND password = '${user.password}' limit 1`;      
      let result = await _pg.executeSql(sql);
      let user_logged = result.rows[0];
      console.log(user_logged);
      let token = user_logged ? _jwt.sign(user_logged) : null;
      return res.send({
        ok: user_logged ? true : false,
        message: user_logged
          ? `Bienvenido ${user_logged.nombres}`
          : "Usuario no encontrado, verificar identificación y/o contraseña.",
        content: { token, name: user_logged.nombres, rol: user_logged.id_rol },
      });
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



