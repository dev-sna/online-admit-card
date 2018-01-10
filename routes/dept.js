const express = require('express'),
      router = express.Router();
      
router.get('/', (req,res) => {
    if(req.session.user && req.session.accountType == 'department'){
        res.redirect('/account');
    }
    else{
        res.render('index');
    }
});

    router.post('/getdept', (req,res) => {
        const pool = req.app.get("pool");
        if(req.session.user && req.session.accountType == 'department'){
            pool.query("select department from department where identity=" + pool.escape(req.session.user), (err,rows,fields) => {
                if(err){
                    console.log(err);
                }
                else{
                    res.status(200).send(rows[0].department);
                    console.log(rows[0].department);
                }
            });
        }
    });

router.post('/login', (req,res) => {
    const pool = req.app.get("pool");
    //id pass dept
    if(req.session.user && req.session.accountType == 'department'){
        res.redirect('/account');
    }
    else{
        pool.query("select * from department where identity =" + pool.escape(req.body.id), (err, rows, fields) => {
            if(err){
                console.log(err);
                res.status(404).send({error: 'Database Error'});
            }
            else if(rows[0] == undefined){
                res.status(404).send({error: 'Account Not Found'});
            }
            else{
                if(req.body.pass == rows[0].password && req.body.dept == rows[0].department){
                    req.session.user = req.body.id;
                    console.log(req.session.user, rows[0]);
                    req.session.accountType = 'department';
                    res.status(200).send();
                }
                else{
                    res.status(302).send({error: 'Wrong Password'});
                }
            }
        });
    }
});

module.exports = router;