const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const sequelize = require('./util/database');

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const controller404 = require('./controllers/404');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(controller404.get404);

sequelize.sync().then(result => {
    console.log('Database connected');
}).catch(err => {
    console.log(err);
});

app.listen(3000);

// const server = http.createServer(app);

// server.listen(3000);