const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('flash');
const morgan = require('morgan');
const session = require('express-session');
const mysqlStore = require('express-mysql-session');
const passport = require('passport');

const { database } = require('./keys');

// Initializations
const app = express();
require('./lib/passport');

// Settings
app.set('port', process.env.PORT || 4000);
app.set('appName', 'Espeka administracion');
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(session({
    secret: 'registerloginnode',
    resave: false,
    saveUninitialized: false,
    store: new mysqlStore(database)
}));
app.use(morgan('dev'));
app.use(flash());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
 
// Global Variables
app.use((req, res, next) => {
    // app.locals.success = req.flash('success');
    // app.locals.error = req.flash('error');
    app.locals.user = req.user;
    app.locals.appName = app.get('appName');
    // if(req.user){
    //     app.locals.admin = req.user.role == 2 ? true : false;
    // }
    
    next();
});

// Routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));

app.use(express.static('public'));

// Start server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})