'use strict';
/**
 * Google Drive storage adapter for Ghost
 *
 * @author : Sandro Tonon
 * @date : 22nd December 2017
 * @version: 1.0.0
 */

var Promise = require('bluebird'),
    StorageBase = require('ghost-storage-base'),
    drive = require('googleapis').drive('v3'),
    common = require('../../../../core/server/lib/common'),
    { auth, get, upload } = require('./components');

class ghostGoogleDrive extends StorageBase {

  constructor(config) {
    super();
    this.config = config
  }

  /**
   * Saves the image to storage (the file system)
   * - image is the express image object
   * - returns a promise which ultimately returns the full url to the uploaded image
   *
   * @param image
   * @param targetDir
   * @returns {*}
   */
  save(file, targetDir) {
    return new Promise((resolve, reject) => {
      auth(this.config)
        .then(client => {
          upload(client, file)
            .then(data => {
              resolve('/content/images/' + data.id + '.' + data.fileExtension);
            });
        });
    });
  }

  exists(fileName, targetDir) {
    return new Promise((resolve, reject) => {
      auth(this.config)
        .then(client => {
          get(client, fileName, (error, response) => {
            if (error) {
              reject(false);
            }

            resolve(true);
          })
      });
    });
  }

  /**
   * For some reason send divides the max age number by 1000
   * Fallthrough: false ensures that if an image isn't found, it automatically 404s
   * Wrap server static errors
   *
   * @returns {serveStaticContent}
   */
  serve() {
    var _this = this;

    return function serveStaticContent(req, res, next) {
      // get the file id from url
      var id = req.path.replace('/', '').split('.')[0];

      _this.exists(id)
        .then(() => {
          auth(_this.config)
            .then(client => {
              var get = drive.files.get({
                auth: client,
                fileId: id,
                alt: 'media'
              });

              var headers = get.headers;
              headers['content-disposition'] = "attachment";
              headers['cache-control'] = 'public, max-age=1209600';
              res.writeHead(200, headers);
              get.pipe(res);
            });
        })
        .catch(() => {
          next();
        });
    }
  }

  /**
   * Not implemented.
   * @returns {Promise.<*>}
   */
   delete() {
     return Promise.reject('not implemented');
   }

  /**
   * Reads bytes from disk for a target image
   * - path of target image (without content path!)
   *
   * @param options
   */
  read(options) {
    var fileId = options.path.replace('/', '').split('.')[0];

    return new Promise((resolve, reject) => {
      auth(this.config)
        .then(client => {
          get(client, fileId, (error, response) => {
            if (error) {
              reject(error);
            }

            resolve(response);
          });
        });
    });
  }
}

module.exports = ghostGoogleDrive;
