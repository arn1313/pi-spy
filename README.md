# Pi Spy

## Table of Content

1. [About The Application](https://github.com/arn1313/pi-spy/blob/master/README.md#about-the-application)
2. [How To Install](https://github.com/arn1313/pi-spy/blob/master/README.md#how-to-install)
3. [How To Use](https://github.com/arn1313/pi-spy/blob/master/README.md#how-to-use)
4. [User Sign Up](https://github.com/arn1313/pi-spy/blob/master/README.md#user-sign-up)
5. [User Sign In](https://github.com/arn1313/pi-spy/blob/master/README.md#user-sign-in)
6. [Accessing Surveillance Footage](https://github.com/arn1313/pi-spy/blob/master/README.md#accessing-surveillance-footage)
7. [Deleting Surveillance Footage](https://github.com/arn1313/pi-spy/blob/master/README.md#deleting-surveillance-footage)
8. [Pi Spy Dependencies](https://github.com/arn1313/pi-spy/blob/master/README.md#pi-spy-dependencies)
9. [Necessary Hardware](https://github.com/arn1313/pi-spy/blob/master/README.md#necessary-hardware)
10. [How To Report Bugs or Issues](https://github.com/arn1313/pi-spy/blob/master/README.md#how-to-report-bugs-or-issues)
11. [Credits And Thanks](https://github.com/arn1313/pi-spy/blob/master/README.md#credits-and-thanks)
12. [Upcoming Features](https://github.com/arn1313/pi-spy/blob/master/README.md#upcoming-features)
13. [FAQs](https://github.com/arn1313/pi-spy/blob/master/README.md#faqs)

## About the Application

Pi Spy is a user based video security and surveillance system built using Raspberry Pi. Users can create an account, sign in, and either live view or record via preset cameras. Notifications can be sent to a user via their registered e-mail. For required hardware to use application, see the "Necessary Hardware" section. For required dependencies for use of the Pi Spy project, see the "Pi Spy Dependencies" section. For all other questions, see the "FAQs" section.

## How To Install

To install the Pi Spy API, either clone the repository and install all package.json dependencies, or fork, clone, and install all dependencies.

## How To Use

## User Sign Up

## User Sign In

## Accessing Surveillance Footage

## Deleting Surveillance Footage

## Pi Spy Dependencies

A list of all the Node Package Manager (npm) dependencies used to create Pi Spy, with a short description and links to the documentation.

#### Developer Dependencies

  * **debug** : A dependency used to catch errors in the creation of Pi Spy. If a user wants to contribute to solving issues for Pi Spy, it's suggested you fork our repository, and use debug to help us find where the issues stem from. For my information on contributing to Pi Spy, see the "How To Report Bugs or Issues" section.

    * Documentation can be found at https://www.npmjs.com/package/debug.


  * **eslint** : A linting tool used to evaluate our code to catch any syntax errors. It is heavily suggested to use this if you plan to contribute to our code. For my information on contributing to Pi Spy, see the "How To Report Bugs or Issues" section.

    * Documentation can be found at https://www.npmjs.com/package/eslint.


  * **faker** : A dependency used to create users with fake information, used in our testing environment.

    * Documentation can be found at https://www.npmjs.com/package/faker.


  * **jest** : Our dependency for our testing environment.

    * Documentation can be found at  http://facebook.github.io/jest.


  * **superagent** : An additional dependency for our test environment. It is used to fire off our servers with a test connection to see if our users can properly access their camera.

    * Documentation can be found at http://visionmedia.github.io/superagent.

#### Dependencies

  * **bcrypt** : A dependency to hash our users' passwords, for their security.

    * Documentation can be found at https://www.npmjs.com/package/bcrypt.


  * **bluebird** : A fully featured Promise library that we are using for it's ability to Promisify.

    * Documentation can be found at http://bluebirdjs.com/docs/getting-started.html.


  * **body-parser** : Our middleware dependency to parse incoming request bodies (JSON).

    * Documentation can be found at https://www.npmjs.com/package/body-parser.


  * **cors** : CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options. For more information on what CORS is, please refer to https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS.

    * Documentation can be found at https://www.npmjs.com/package/cors.


  * **del** : A dependency to delete files and folders using globs. For more information on what globs are, please refer to https://en.wikipedia.org/wiki/Glob_(programming).

    * Documentation can be found at https://www.npmjs.com/package/del.


  * **dotenv** : Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.

    * Documentation can be found at https://www.npmjs.com/package/dotenv.


  * **express** : Fast, unopinionated, minimalist web framework for node. Used to create a http server, and used for request routing.

    * Documentation can be found at http://expressjs.com.


  * **jsonwebtoken** : An implementation of JSON Web Tokens. Used for user authorization.

    * Documentation can be found at https://www.npmjs.com/package/jsonwebtoken.


  * **mongoose** : Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. This was used to create schemas for our users.

    * Documentation can be found at https://www.npmjs.com/package/mongoose.


  * **multer** : Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency.

    * Documentation can be found at https://www.npmjs.com/package/multer.


## Necessary Hardware

[Raspberry Pi](https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=raspberry+pi&rh=i%3Aaps%2Ck%3Araspberry+pi)

## How To Report Bugs or Issues

## Credits And Thanks

## Upcoming Features

## FAQs
