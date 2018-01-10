const express = require('express'),
      router = express.Router();

router.get('/', (req,res) => {
      if(req.session.user && req.session.accountType == 'student'){
        res.redirect('/appform');
    }
    else{
        res.render('index');
    } 
});
//student/login

router.post('/login', (req,res) => {
    const pool = req.app.get("pool");
    //id cnic voucher
    if(req.session.user && req.session.accountType == 'student'){
        res.redirect('/appform');
    }
    else{
        pool.query("select * from student where identity =" + pool.escape(req.body.id), (err, rows, fields) => {
            if(err){
                console.log(err);
                res.status(404).send({error: 'Database Error'});
            }
            else if(rows[0] == undefined){
                res.status(404).send({error: 'Account Not Found'});
            }
            else{
                if(req.body.cnic == rows[0].cnicpass && req.body.voucher == rows[0].voucher_no){
                    if(rows[0].form_date == ''){
                    req.session.user = req.body.id;
                    req.session.accountType = 'student';
                    res.status(200).send();
                }
                else{
                    res.status(302).send({error: 'Already submitted'});
                }
                }
                else{
                    res.status(302).send({error: 'Wrong Credentials'});
                }
            }
        });
    }
});


module.exports = router;