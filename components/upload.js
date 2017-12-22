/**
 * This component uploads a file to Google Drive. Optionally to a shared
 * parent folder.
 *
 * @param client the authentication client
 * @param fileId the ID of the file to get from Google Drive
 */

const drive  = require('googleapis').drive('v3'),
      fs     = require('fs-extra'),
      parent = require('../settings').sharedFolderId;

module.exports = (client, file) => {
  return new Promise((resolve, reject) => {
    drive.files.create({
      auth: client,
      resource: {
        name: file.name,
        parents: parent !== '' ? [parent] : []
      },
      media: {
        mimeType: file.type,
        body: fs.createReadStream(file.path)
      },
      fields: 'id, fileExtension'
    }, (err, uploadedFile) => {
      if (err) {
        reject(err);
      }

      // Promise is resolved with the result of create call
      resolve(uploadedFile);
    });
  });
}
