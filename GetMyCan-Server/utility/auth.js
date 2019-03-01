const fs = require('fs');
const messages = JSON.parse(fs.readFileSync('./utility/messages.json'));

const getToken = (authorization) => {
  if (!authorization) {
    return null;
  }

  const parts = auth.split(' ');
  if ('basic' != parts[0].toLowerCase()) return;
  if (!parts[1]) return;
  return parts[1];
};

exports.auth = function(req, res, next) {
  if (req.session &&
        getToken(req.headers.authorization) == req.session.sessionId) {
    next();
  } else {
    res.status(401).json({
      message: messages.notAuthorized,
    });
  }
};
