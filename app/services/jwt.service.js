const jwt = require('jsonwebtoken');

const SECRET_KEY = "O@M{tMCSz6M%e@FD7::FhQ,xY}DJ`:}Aidcf17XCL.2'q<of&h6iM}])4*UCRHM";

const sign = (data) => {
    return jwt.sign(data, SECRET_KEY, {expiresIn: '10 days'});
}

const verify = (token) => {
    return jwt.verify(token, SECRET_KEY);
};

module.exports = {sign, verify};