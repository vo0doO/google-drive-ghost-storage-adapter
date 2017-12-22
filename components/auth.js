/**
 * This module reads the key file and setups the authorization for the service
 * account.
 *
 * @param client the authentication client
 */

const google = require('googleapis');

module.exports = config => {
  var jwtClient = new google.auth.JWT(
    config.key.client_email,
    null,
    config.key.private_key,
    ['https://www.googleapis.com/auth/drive'],
    null
  );

  return new Promise((resolve, reject) => {
    jwtClient.authorize(err => {
      if (err) {
        reject(err);
      }

      resolve(jwtClient);
    });
  });
}
