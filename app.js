var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var airbnbhomes = require('./routes/airbnbhomes');

// load mongoose package
var mongoose = require('mongoose');
// Mongo DB Connection
const mongo = require('mongodb')
var fs = require('fs')
var Grid = require('gridfs-stream')
// var GridFS;
// Use native Node promises
mongoose.Promise = global.Promise;
// connect to MongoDB
mongoose.connect('mongodb://group5:group5@ds257485.mlab.com:57485/boston')
//mongoose.connect('mongodb://localhost:27017/Boston')
  .then(() =>  {
    console.log('connection succesful')
    //GridFS = Grid(mongoose.connection.db,mongoose.mongo)
    //console.log(GridFS)
})
  .catch((err) => console.error(err));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use('/', routes);
app.use('/users', users);
app.use('/airbnbhomes',airbnbhomes);

// mongo.MongoClient.connect('mongodb://localhost:27017/TestMongo', (err, database) => {
// gfs = new Grid(database,mongo);
// if (err) return console.log(err)
//     db = database;
//   //  app.listen(3000, () => {
//   //   console.log('listening on 3000')
//   //  })
//   })
//
// app.get('/contact', (req, res) => {
//
//     //var value = req.query.id;
//
//     // db.collection('fs.files').find({'filename':{$eq:'Chirag.jpg'}}).toArray((err, result) => {
//     // if (err) return console.log(err)
//
//     var readstream = gfs.createReadStream({
//
//     filename: 'Chirag.jpg'
// });
//
// var bufs = [];
//      readstream.on('data', function(chunk) {
//           bufs.push(chunk);
//     });
//     readstream.on('end', function() {
//         var fbuf = Buffer.concat(bufs);
//         var base64 = (fbuf.toString('base64'));
//         // console.log(base64);
//      //   res.send('<img src="data:image/jpg;base64,' + base64 + '">');
//         result.base = base64;
//           res.send({info: result})
//     });
//
//       readstream.on('error', function (err) {
//       console.log('An error occurred!', err);
//       throw err;
//     });
//     //})
// })
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
