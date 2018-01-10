const express = require('express'),
      router = express.Router();
      
//    /account
router.get('/',(req,res) => {
    if(req.session.user && req.session.accountType == 'department'){
        res.render('index');
    }
    else{
        res.redirect('/dept');
    }
});

router.post('/crtaccount', (req,res) => {
    const pool = req.app.get("pool");
    var date = req.app.get("date");

    //dept id cnic vouchNum vouchDate attendance

    var query =
    "insert into student (identity,cnicpass,department,voucher_no,voucher_date,attendance) VALUES(" + pool.escape(req.body.id) + "," + pool.escape(req.body.cnic) + "," + 
    
    pool.escape(req.body.dept)+ "," + pool.escape(req.body.vouchNum1) + "," + pool.escape(req.body.vouchDate) + "," + pool.escape(req.body.attendance) + "'" + date + "')";
     
    console.log(query);

    pool.query(query, (err, rows, fields) => {
        if(err){
            res.status(302).send({error: 'Database Error'});
        }
        else{
            res.status(200).send("Operation Successful");
        }
    });
});

module.exports = router;