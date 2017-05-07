const conf = require ('../configuration/conf');

function isTokenValid(userToken) {
  return (userToken && userToken === conf.token);
}

module.exports.isTokenValid = isTokenValid;