const PostgresService = require('../../services/postgres.service');
const _pg = new PostgresService();
const _jwt = require('../../services/jwt.service')

const getPersonaLogin = async (req, res) => {
    let persona = req.body;
    let sql = `select nombre, cedula, tipo,
     fechanacimiento, celular, id_categoriarecolector
    from personal where usuario = '${persona.usuario}' 
    and password = md5('${persona.password}')`;
    try {
        console.log(sql);
        let result = await _pg.executeSql(sql);
        let logged = result.rows[0];
        console.log(logged);
        let token = logged ? _jwt.sign(logged) : null;
        return res.send({
            ok: logged ? true : false,
            message: logged ? 'Bienvenido' : 'Verificar informacion',
            content: {token, tipo: logged.tipo},
        });
        
    } catch (error) {
        /*try {
            let sql = `select id_usuario, nombre, cedula, correo, usuario, fechanacimiento, celular
            from usuarios where usuario = '${persona.usuario}' and password = md5('${persona.password}')`; 
            console.log(sql);
            let result = await _pg.executeSql(sql);
            let logged = result.rows[0];
            console.log(logged);
            let token = logged ? _jwt.sign(logged) : null;
            return res.send({
                ok: logged ? true : false,
                message: logged ? 'Bienvenido' : 'Verificar informacion',
                content: {token},
            });
        } catch (error) {
            console.log(error);
            return res.send({ ok: false, message: "Error ingresando sesion", content: error, });
        }*/
        console.log(error);
        return res.send({ ok: false, message: "Error ingresando sesion", content: error, });
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

module.exports = {getPersonaLogin, verifyToken, verifyTokenMiddleWare};



