require('babel-register');
const express = require('express'),
      app = express(),
      nodemailer = require('nodemailer'),
      bodyParser = require('body-parser'),
      student = require('./routes/std'),
      department = require('./routes/dept'),
      controller = require('./routes/control'),
      account = require('./routes/account'),
      appform = require('./routes/appform'),
      logout = require('./routes/logout'),
      validate = require('./routes/validate'),
      card = require('./routes/card'),
      admin = require('./routes/admin'),
      adminpanel = require('./routes/adminpanel'),
      pool = require('./modules/database'),
      pdf = require('express-pdf'),
      json2xls = require('json2xls');
      
      // for parsing application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(pdf);
app.use(json2xls.middleware);
//setting view engine
app.set('view engine', 'ejs');

//to server static files over the server
app.use(express.static('./public'));

//setting direcctory for views
app.set('views',__dirname + '/views');      

//setting port
app.set('port', process.env.PORT || 3000);

//setting database
app.set("pool", pool);
app.set("nodemailer", nodemailer);

//session module
require('./modules/session')(app);

//getting router files
app.use(require('./routes/index'));
app.use('/std', student);
app.use('/dept', department);
app.use('/control', controller);
app.use('/account', account);
app.use('/appform', appform);
app.use('/logout', logout);
app.use('/validate', validate);
app.use('/card', card);
app.use('/exam-admin-login', admin);
app.use('/exam-admin-panel', adminpanel);

app.post('*', (req,res) => {
    req.session.accountType?
    res.status(200).send(req.session.accountType):null
}); 

var date;
date = new Date();
date = date.getUTCDate() + '-' +
    ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
    ('00' + date.getUTCFullYear()).slice(2);
console.log(date);

app.set("date", date);

app.listen(app.get('port'), () =>{
    console.log("Server started" + app.get('port'));
});