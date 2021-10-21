const jwt = require('jsonwebtoken');

const SECRET_KEY = "5IO&!:S1#!w.^hVU;Kt[5m8jy+@sT7;%fW'{*W/}L5CEbk~XgbF4c!es%p-Qy&Y";

const sign = (data) => {
    return jwt.sign(data, SECRET_KEY, {expiresIn: "900h"});
}

const verify = (token) => {
    return jwt.verify(token, SECRET_KEY);
};

module.exports = {sign, verify};