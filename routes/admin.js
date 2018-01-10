const express = require('express'),
      router = express.Router();

router.get('/', (req,res) => {
      if(req.session.user && req.session.accountType == 'admin'){
            res.redirect('/exam-admin-panel');
      }
      res.render('index');
});

router.post('/login', (req,res) => {
      var pool = req.app.get("pool");
      
      if(req.session.user && req.session.accountType == 'admin'){
        res.redirect('/exam-admin-panel');
      }

      pool.query("select password from department where identity="+ pool.escape(req.body.email), (err,rows,fields) => {
            if(err){
                  res.status(500).send({error: 'Database error'})
            }

            else if(rows[0] == undefined){
                  res.status(404).send({error: 'Account not found'});
            }
            else{
                  if(req.body.password == rows[0].password){
                        req.session.user = req.body.email;
                        req.session.accountType = "admin";
                        res.status(200).send();
                  }
                  else{
                        res.status(400).send({error: 'Wrong Password'});
                  }
            }


      });

});

router.post('/recovery', (req,res) => {
      var pool = req.app.get("pool");

      var query = "select identity,password from department where identity ="+ pool.escape(req.body.email);
      console.log(req.body.email);
      pool.query(query, (err,rows,fields) => {
            if(err){
                  res.status(404).send({error: 'Database error'});
            }
            else if(rows[0] == undefined){
                  res.status(404).send({error: 'Wrong email'});
            }
            else if(rows[0].identity == req.body.email){

                  var nodemailer = req.app.get("nodemailer");
                  
                  // Generate test SMTP service account from ethereal.email
                  // Only needed if you don't have a real mail account for testing
                  nodemailer.createTestAccount((err, account) => {
                  
                      // create reusable transporter object using the default SMTP transport
                      let transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                               user: '',
                               pass: ''
                           }
                       });
                  

                      // setup email data with unicode symbols
                      let mailOptions = {
                          from: '', // sender address
                          to: req.body.email, // list of receivers
                          subject: 'Account Recovery', // Subject line
                          text: rows[0].password, // plain text body
                          html: 'Email: '+req.body.email + '<br>Password: ' +rows[0].password // html body
                      };
                  
                      // send mail with defined transport object
                      transporter.sendMail(mailOptions, (error, info) => {
                          if (error) {
                              return console.log(error);
                          }
                          console.log('Message sent: %s', info.messageId);
                          // Preview only available when sending through an Ethereal account
                          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                  
                          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
                          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                      });
                  });

                  res.status(200).send();
            }
            else{
                  res.status(404).send({error: 'Wrong email'});
            }
      });
});

module.exports = router;