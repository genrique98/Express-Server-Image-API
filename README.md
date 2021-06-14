# Express-Server-Image-API
Image processing API on Express JS

Scripts:
To build project: npm run build
To start nodemon: npm run start
To test application: npm run test

Server will start on
http://localhost:3000

Endpoints:
/api
/api/images, need to specify 'filename' paramater, such as:
/api/images?filename=fjord
To use Sharp, specify 'width' and 'height' parameters, such as:
/api/images?filename=fjord&width=200&height=200

Additional Functionalities:
Logging to record when images are processed or accessed.



