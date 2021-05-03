    const express = require('express');
    const cookieParser = require('cookie-parser');
    const session = require('express-session');
    const passport = require('passport');
    const passportLocal = require('./config/passport_local');
const MongoStore = require('connect-mongo');
const fileupload = require('express-fileupload');
const path = require('path');
const bodyParser = require('body-parser');
    const cors = require('cors');
    const port = 8000;
    const db = require('./config/mongoose.js');  // using mongoose to connect to mongo db
const fileUpload = require('express-fileupload');

    const app = express();


app.use(bodyParser.json());
app.use(express.json());
    app.use(cookieParser()); // to fetch the cookie in req
    app.use(cors());
   
app.use(fileUpload());

    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));


    app.use(session({
        name: 'userRegistration',
        secret: 'user', //TODO to generalize
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: (1000 * 60 * 100) // 100minutes
        },
        // store cookie in mongodb
        store: MongoStore.create({
            mongoUrl: 'mongodb://localhost/UserDashboard',
            autoRemove: 'disabled' ,
        }, function (err) {
            console.log(err || `connected to session cookie via mongo`);
        })
    }
    ));

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(passport.setAuthenticatedUser);

    app.use('/', require('./routes'));

    app.listen(port, (err) => {
        if (err) { console.log('error in runnning server :', err); return; }
        console.log('server running fine on port :', port);
});