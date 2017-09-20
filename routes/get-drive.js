'use strict';

var developerKey = 'AIzaSyBXUxX74XNe1SWbtRmjGZ1IzfC-X2y4i8g';
// The Client ID obtained from the Google Developers Console. Replace with your own Client ID.
var clientId = '446008585935-l31ud1veknjcsclpe4lhla577plsnbb0.apps.googleusercontent.com';
// Scope to use to access user's photos.
var scope = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/photos',
  'https://www.googleapis.com/auth/youtube'
];
var authApiLoaded = false;
var pickerApiLoaded = false;
var oauthToken;
var viewIdForhandleAuthResult;
// Use the API Loader script to load google.picker and gapi.auth.
function onApiLoad() {
  gapi.load('auth', {'callback': onAuthApiLoad});
  gapi.load('picker', {'callback': onPickerApiLoad});
}
function onAuthApiLoad() {
  authApiLoaded = true;
}
function onPickerApiLoad() {
  pickerApiLoaded = true;
}
function handleAuthResult(authResult) {
  if (authResult && !authResult.error) {
    oauthToken = authResult.access_token;
    createPicker(viewIdForhandleAuthResult, true);
  }
}
// Create and render a Picker object for picking user Photos.
function createPicker(viewId, setOAuthToken) {
  if (authApiLoaded && pickerApiLoaded) {
    var picker;

    if(authApiLoaded && oauthToken && setOAuthToken) {
      picker = new google.picker.PickerBuilder().
        addView(viewId).
        setOAuthToken(oauthToken).
        setDeveloperKey(developerKey).
        setCallback(pickerCallback).
        build();
    } else {
      picker = new google.picker.PickerBuilder().
        addView(viewId).
        setDeveloperKey(developerKey).
        setCallback(pickerCallback).
        build();
    }

    picker.setVisible(true);
  }
}
// A simple callback implementation.
function pickerCallback(data) {
  var url = 'nothing';
  if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
    var doc = JSON.stringify(data[google.picker.Response.DOCUMENTS][0], null, '  ');
  }
  var message = 'You picked: <br>' + doc;
  document.getElementById('result').innerHTML = message;
}

Array.prototype.forEach.call(document.querySelectorAll('#views a'), function (ele) {
  ele.onclick = function () {
    var viewIds = {
      'DOCS':   google.picker.ViewId.DOCS,
      'DOCS_IMAGES': google.picker.ViewId.DOCS_IMAGES,
      'DOCUMENTS': google.picker.ViewId.DOCUMENTS,
      'PRESENTATIONS': google.picker.ViewId.PRESENTATIONS,
      'SPREADSHEETS': google.picker.ViewId.SPREADSHEETS,
      'FORMS': google.picker.ViewId.FORMS,
      'DOCS_IMAGES_AND_VIDEOS': google.picker.ViewId.DOCS_IMAGES_AND_VIDEOS,
      'DOCS_VIDEOS': google.picker.ViewId.DOCS_VIDEOS,
      'FOLDERS': google.picker.ViewId.FOLDERS,
      'PDFS': google.picker.ViewId.PDFS,
      'DOCS_UPLOAD': new google.picker.DocsUploadView(),
      'PHOTO_ALBUMS': google.picker.ViewId.PHOTO_ALBUMS,
      'PHOTOS': google.picker.ViewId.PHOTOS,
      'PHOTO_UPLOAD': google.picker.ViewId.PHOTO_UPLOAD,
      'IMAGE_SEARCH': google.picker.ViewId.IMAGE_SEARCH,
      'MAPS': google.picker.ViewId.MAPS,
      'VIDEO_SEARCH': google.picker.ViewId.VIDEO_SEARCH,
      'WEBCAM': google.picker.ViewId.WEBCAM,
      'YOUTUBE': google.picker.ViewId.YOUTUBE,
      'RECENTLY_PICKED': google.picker.ViewId.RECENTLY_PICKED
    }
    var id = this.id;
    var viewId = viewIds[id];
    var setOAuthToken = true;

    if (id === 'IMAGE_SEARCH' || id === 'MAPS' || id === 'VIDEO_SEARCH') {
      setOAuthToken = false;
      createPicker(viewId, setOAuthToken);
    } else {
      if(authApiLoaded && !oauthToken) {
        viewIdForhandleAuthResult = viewId;
        window.gapi.auth.authorize(
          {
            'client_id': clientId,
            'scope': scope,
            'immediate': false
          },
          handleAuthResult
        );
      } else {
        createPicker(viewId, setOAuthToken);
      }
    }
    return false;
  };
});



// var google = require('googleapis'),
//   OAuth2 = google.auth.OAuth2,
//   getFilePaths = require('google-drive-paths'),
//   CLIENT_API_KEY = 'YOUR API KEY HERE',
//   CLIENT_API_SECRET = 'YOUR API SECRET HERE',
//   CLIENT_REDIRECT_URI = 'YOUR SPECIFIED REDIRECT URI HERE',
//   ACCESS_TOKEN = 'YOUR ACCESS TOKEN HERE',
//   REFRESH_TOKEN = 'YOUR REFRESH TOKEN HERE',
//   oauth2Client,
//   googleDriveClient;
//
// oauth2Client = new OAuth2(CLIENT_API_KEY, CLIENT_API_SECRET, CLIENT_REDIRECT_URI);
//
// oauth2Client.setCredentials({
//   access_token: ACCESS_TOKEN,
//   refresh_token: REFRESH_TOKEN
// });
//
// googleDriveClient = google.drive({
//   version: 'v2',
//   auth: oauth2Client
// });
//
// getFilePaths(googleDriveClient, 'THE TARGET FILE ID HERE', '', function(paths) {
// /* assuming our target file is named 'testFile.png', it should retrieve all paths and output something like this:
// 	 [
// 		 '/folder1/testFile.png/',
// 		 '/folderX/testFile.png/',
// 		 '/folder3/testFile.png/',
// 		 '/folder2/testFile.png/',
// 		 '/folderX/folder1/testFile.png/',
// 		 '/folder1/folder1.1/testFile.png/',
// 		 '/folderX/folder2/testFile.png/',
// 		 '/folderX/folder1/folder1.1/testFile.png/',
// 		 '/folderX/folder3/testFile.png/'
// 	 ]
// 	 */
//   console.log(paths.length);
//   console.log(paths);
// });
//
//
//
// // import 'isomorphic-fetch';
// //
// //
// // fetch('./api/some.json')
// //   .then(
// //     function(response) {
// //       if (response.status !== 200) {
// //         console.log('Looks like there was a problem. Status Code: ' +
// //           response.status);
// //         return;
// //       }
// //
// //       // Examine the text in the response
// //       response.json().then(function(data) {
// //         console.log(data);
// //       });
// //     }
// //   )
// //   .catch(function(err) {
// //     console.log('Fetch Error :-S', err);
// //   });
