let jwt = require('jsonwebtoken');
let fs  = require('fs');

let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  
  if (checkExists(token)) {
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    // verify a token asymmetric
    let cert = fs.readFileSync(process.env.AUTH_PEM_PATH, 'utf8');  // get public key
    jwt.verify(token, cert, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: err.message
        });
      } else {
        
        if (!checkSameIfExists(req.params.id, decoded.iss) || !checkSameIfExists(req.body.user_id, decoded.iss)) {
            return res.status(401).json({
                message: 'Token not valid for this user'
            });
        }
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({
      message: 'Auth token is not supplied'
    });
  }
};

function checkSameIfExists(reqval, jwtval) {
    if (checkExists(reqval) && reqval == jwtval) {
        return true;
    } else if (!checkExists(reqval)) {
        return true;
    }
    return false;
}

function checkExists(variable) {
  return typeof variable !== 'undefined' && variable
}

module.exports = {
  checkToken: checkToken
}