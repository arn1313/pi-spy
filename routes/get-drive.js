'use strict';

const User = require('../model/user');
const errorHandler = require('../lib/error-handler');
const debug = require('debug')('cfgram:route-gallery');
const basicAuth = require('../lib/bearer-auth');
const bearerAuth = require('../lib/bearer-auth');

module.exports = function(router) {

/**
 * Print a file's metadata.
 *
 * @param {String} fileId ID of the file to print metadata for.
 */
function printFile(fileId) {
    var request = gapi.client.drive.files.get({
      'fileId': fileId
    });
    request.execute(function(resp) {
      console.log('Title: ' + resp.title);
      console.log('Description: ' + resp.description);
      console.log('MIME type: ' + resp.mimeType);
    });
  }

  /**
 * Download a file's content.
 *
 * @param {File} file Drive File instance.
 * @param {Function} callback Function to call when the request is complete.
 */
  function downloadFile(file, callback) {
    if (file.downloadUrl) {
      var accessToken = gapi.auth.getToken().access_token;
      var xhr = new XMLHttpRequest();
      xhr.open('GET', file.downloadUrl);
      xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
      xhr.onload = function() {
        callback(xhr.responseText);
      };
      xhr.onerror = function() {
        callback(null);
      };
      xhr.send();
    } else {
      callback(null);
    }
}
};


var google = require('googleapis'),
    OAuth2 = google.auth.OAuth2,
    getFilePaths = require('google-drive-paths'),
    CLIENT_API_KEY = 'YOUR API KEY HERE',
    CLIENT_API_SECRET = 'YOUR API SECRET HERE',
    CLIENT_REDIRECT_URI = 'YOUR SPECIFIED REDIRECT URI HERE',
    ACCESS_TOKEN = 'YOUR ACCESS TOKEN HERE',
    REFRESH_TOKEN = 'YOUR REFRESH TOKEN HERE',
    oauth2Client,
    googleDriveClient;

oauth2Client = new OAuth2(CLIENT_API_KEY, CLIENT_API_SECRET, CLIENT_REDIRECT_URI);

oauth2Client.setCredentials({
    access_token: ACCESS_TOKEN,
    refresh_token: REFRESH_TOKEN
});

googleDriveClient = google.drive({
    version: 'v2',
    auth: oauth2Client
});

getFilePaths(googleDriveClient, 'THE TARGET FILE ID HERE', '', function(paths) {
    /* assuming our target file is named "testFile.png", it should retrieve all paths and output something like this:
     [
         '/folder1/testFile.png/',
         '/folderX/testFile.png/',
         '/folder3/testFile.png/',
         '/folder2/testFile.png/',
         '/folderX/folder1/testFile.png/',
         '/folder1/folder1.1/testFile.png/',
         '/folderX/folder2/testFile.png/',
         '/folderX/folder1/folder1.1/testFile.png/',
         '/folderX/folder3/testFile.png/'
     ]
     */
    console.log(paths.length);
    console.log(paths);
});
