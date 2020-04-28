let jwt = require('jsonwebtoken');

let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    // verify a token asymmetric
    var cert = fs.readFileSync(process.env.AUTH_PEM_PATH);  // get public key
    jwt.verify(token, cert, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        if (!checkSameIfExists(req.params.id, decoded.iss) || !checkSameIfExists(req.body.user_id, decoded.iss)) {
            return res.json({
                success: false,
                message: 'Token not valid for this user'
            });
        }
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

function checkSameIfExists(reqval, jwtval) {
    if (typeof reqval !== 'undefined' && reqval && reqval == jwtval) {
        return true;
    } else if (!(typeof reqval !== 'undefined' && reqval)) {
        return true;
    }
    return false;
}

module.exports = {
  checkToken: checkToken
}