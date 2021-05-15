const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const PORT = process.env.PORT || 3000 // So we can run on heroku || (OR) localhost:5000

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('609cadaa84e7061ce88fa662')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://rachelsg:Ftshpmoyr2481mo@cse341.ig6nd.mongodb.net/cse341?retryWrites=true&w=majority')
    .then(result => {
        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    name: 'Max',
                    email: 'test@test.com',
                    cart: {
                        items: []
                    }
                });
                user.save();
            }
        })
        app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
    })
    .catch(err => {
        console.log(err);
    });