const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
// const passportLocal = require('./config/passport_local');
const MongoStore = require('connect-mongo');
const path = require('path');
const multer = require('multer');
const port = 8000;

const db = require('./config/mongoose.js');  // using mongoose to connect to mongo db
const app = express();



app.use(express.urlencoded()); // to decode data send via post req

app.use(cookieParser()); // to fetch the cookie in req


// app.use('/', require('./routes'));

app.listen(port, (err) => {
    if (err) { console.log('error in runnning server :', err); return; }
    console.log('server running fine on port :', port);
});
