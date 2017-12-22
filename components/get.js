/**
 * This component gets the content of a file by ID
 *
 * @param client the authentication client
 * @param fileId the ID of the file to get from Google Drive
 * @param callback function to call with error and response
 */

const  drive = require('googleapis').drive('v3');

module.exports = (client, fileId, callback) => {
  drive.files.get({
    auth: client,
    fileId: fileId,
    alt: 'media'
  }, (error, response) => {
    callback(error, response);
  });
}
