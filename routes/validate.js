const express = require('express'),
    router = express.Router();

router.get('/', (req, res) => {
    if (req.session.user && req.session.accountType == "examination") {
        res.render('index');
    } else {
        res.redirect('/control');
    }
});

router.post('/getdata', (req, res) => {
    var pool = req.app.get("pool");
    var query = "select identity,cnicpass,name,father_name,voucher_no,voucher_date,fee,attendance,form_date,status from student where batch=" + pool.escape(req.body.batch) + "and department=" + pool.escape(req.body.dept);
    console.log(req.body.dept, req.body.batch);
    pool.query(query, (err,rows,fields) => {
        if(err) throw err;
            else if(rows == undefined){
                res.status(404).send();
            }
            else{
                res.status(200).send(rows);
            }
    });
});

router.post('/status', (req,res) => {
    var pool = req.app.get("pool");
    pool.query("UPDATE student SET status='Printed' where identity=" + pool.escape(req.body.id), (err, rows, fields) => {
        if(err) throw err;

        else{
            res.status(200).send();
        }
    });
});

router.get('/excel/:dept/:batch', (req,res) => {
    var pool = req.app.get("pool");
    console.log(req.params.dept+req.params.batch);
    if(req.session.user && req.session.accountType == 'examination'){
    pool.query("select * from student where department='" + req.params.dept + "' and batch='" + req.params.batch +"' order by identity", (err,rows,fields) =>{
        if(err) throw err;
        else{
            // B.E Computer Systems'-'DUET-2015'
            let filename = "'" +req.params.dept+ "-" +req.params.batch + ""+ ".xlsx";
            res.xls(filename, rows);
            console.log(req.params.dept+req.params.batch);
        }

    });
}
    // var jsonArr = [{foo: 'bar',qux: 'moo',poo: 123},{foo: 'bar',qux: 'moo',poo: 345}];
    // res.xls('data.xls', jsonArr);
    // console.log(req.params.dept,req.params.batch);

});

module.exports = router;