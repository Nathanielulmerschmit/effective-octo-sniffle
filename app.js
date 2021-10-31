var express = require('express');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();



app.use(logger('dev'));
app.use(express.json);
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());


app.get('/', (req, res) => {
    res.sendFile('Hello! up and running!');
});

//app.use('/', indexRouter);
app.use('/users', usersRouter);

/*
// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});


// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development'? err: {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
*/
app.listen(3000, () => {
    console.log('listening on port 3000!');
});

module.exports = app;