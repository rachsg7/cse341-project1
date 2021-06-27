const path = require('path');
const cors = require('cors');

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoDBStore = require('connect-mongodb-session')(session);
//const csrf = require('csurf');
const flash = require('connect-flash');

const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URI = 'mongodb+srv://rachelsg:Ftshpmoyr2481mo@cse341.ig6nd.mongodb.net/cse341?retryWrites=true&w=majority';
const PORT = process.env.PORT || 3000 // So we can run on heroku || (OR) localhost:5000

const app = express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});
//const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const otherRoutes = require('./routes/other');
const week10Routes = require('./routes/week10');

const corsOptions = {
    origin: "https://rachel-schutz-project1.herokuapp.com/",
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    family: 4
};

const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://rachelsg:Ftshpmoyr2481mo@cse341.ig6nd.mongodb.net/cse341?retryWrites=true&w=majority";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store
    })
);
// app.use(csrfProtection);
app.use(flash());

app.use(express.json({ limit: '1mb' }));

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    // res.locals.csrfToken = req.csrfToken();
    next();
});

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => {
            next(new Error(err))
        });
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(otherRoutes);
app.use(week10Routes);

app.get('/500', errorController.get500);

app.use(errorController.get404);

// app.use((error, req, res, next) => {
//     console.log('In app.use error');
//     res.redirect('/500');
//     // res.status(500).render('500', {
//     //     pageTitle: 'An Error Occurred',
//     //     path: '/500',
//     //     isAuthenticated: req.session.isLoggedIn,
//     //     user: req.user
//     // });
// });

mongoose
    .connect(
        MONGODB_URL, options
    )
    .then(result => {
        app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });