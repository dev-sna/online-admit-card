const express = require('express'),
router = express.Router();

router.get('/', (req,res) => {
    if(req.session.user && req.session.accountType == "examination"){
        res.redirect('/validate');
    }
    else{
        res.render('index');
    }
});
//control/login
router.post('/login',(req,res)=> {
    var pool = req.app.get("pool");

    pool.query("select password, department from department where identity="+ pool.escape(req.body.identity), (err,rows,fields) => {
        if(err){
            res.status(500).send({error: 'Database Error'});
        }

        else if(rows[0] == undefined){
            res.status(404).send({error: 'Account not found'});
        }

        else{
            if(req.body.password == rows[0].password){
            req.session.user = req.body.identity;
            req.session.accountType = "examination";
            res.status(200).send();
            }
        else{
            res.status(404).send({error: 'Wrong password'});
        }
    }
    });
});
module.exports = router;