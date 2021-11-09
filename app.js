var express = require('express');

var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var shuttleRouter = require('./routes/shuttle');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.static(path.join('./public')));
app.get('/', (req, res) => {
    //res.send('Hello! What\'s up?');
    res.sendFile('index.html');
});

//app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/shuttle', shuttleRouter);

/*
// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});
*/



// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development'? err: {};
    // render the error page
    res.render(err.status || 500);
    res.send('error');
});


app.listen(4000, () => {
    console.log('listening on port 4000!');
});

module.exports = app;