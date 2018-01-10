const express = require('express'),
    router = express.Router();

router.get('/', (req, res) => {
    var pool = req.app.get("pool");
    if (req.session.user && req.session.accountType == 'student') {
        pool.query("select form_date from student where identity='" + req.session.user + "'", (err,rows,fields) => {
            if(rows[0].form_date == ''){
                res.render('index');
            }
            else{
                res.redirect('/');
                // res.render('index');
            }
        });
    } 
    else {
        res.redirect('/');
    }
});

router.post('/getsubs', (req, res) => {
    var pool = req.app.get("pool");

    if (req.session.user && req.session.accountType == 'student') {
        var query = 'select subOneTitle,subTwoTitle, subThreeTitle, subFourTitle, subFiveTitle, subSixTitle, subOneTh, subOnePr, subTwoTh, subTwoPr, subThreeTh, subThreePr,' +
         'subFourTh,subFourPr,subFiveTh,subFivePr,subSixTh,subSixPr from subjects where batch=' +pool.escape(req.body.batch) + ' and ' + 'semester=' + pool.escape(req.body.sem);
        console.log(req.body.batch, '   ', req.body.sem);

        pool.query(query, (err, rows, fields) => {
            if (err) console.log(err);

            else if (rows != undefined) {
                res.status(200).send(rows[0]);
            } else {
                console.log(req.params.batch)
                res.status(404).send();
            }
        });
    }
});

router.post('/getdata', (req,res) => {
    var pool = req.app.get("pool");

    var query = "select identity,cnicpass,department,voucher_no,voucher_date from student where identity='" +  req.session.user + "'";
    
    pool.query(query, (err, rows, fields) => {
        if(err) throw err;

        else{
            res.status(200).send(rows[0]);
            console.log(rows[0]);
        }
    });
});

router.post('/postform', (req, res) => {
    // semester,currentYear,studyYear,examType,batch,dept,fee,challan,submitDate,identity
    //     name,fname,gender,nation,cnicpass,enrolNo,preAddress,perAddress,cellNo
    //     subOne,subOneTh,subOnePr,subTwo,subTwoTh,subTwoPr,subThree,subThreeTh
    //     subThreePr,subFour,subFourTh,subFourPr,subFive,subFiveTh,subFivePr,subSix,subSixTh,subSixPr
    var date = req.app.get("date");
    var pool = req.app.get("pool");;

    if (req.session.user && req.session.accountType == 'student') {

        var query ="UPDATE student SET batch=" + pool.escape(req.body.batch) + ",name=" + pool.escape(req.body.name) + ",father_name=" +pool.escape(req.body.fname) + "," +
        "fee=" +pool.escape(req.body.fee) + "," +
        "semester=" + pool.escape(req.body.semester) + ",exam_type=" + pool.escape(req.body.examType) + ",study_year=" + pool.escape(req.body.studyYear) + "," +
        "current_year=" + pool.escape(req.body.currentYear) + ",nationality=" + pool.escape(req.body.nation) + ",gender=" + pool.escape(req.body.gender) + "," +
        "enroll=" + pool.escape(req.body.enrolNo) + ",pre_address=" + pool.escape(req.body.preAddress) + ",per_address=" + pool.escape(req.body.perAddress) + "," +

        "cell_no=" + pool.escape(req.body.cellNo) + ",form_date='" + date + "',sub_one=" + pool.escape(req.body.subOne) + ",sub_one_th=" + pool.escape(req.body.subOneTh) + "," +
        "sub_one_pr=" + pool.escape(req.body.subOnePr) + ",sub_two=" + pool.escape(req.body.subTwo) + ",sub_two_th=" + pool.escape(req.body.subTwoTh) + "," + 
        "sub_two_pr=" + pool.escape(req.body.subTwoPr) + ",sub_three= " + pool.escape(req.body.subThree) + ",sub_three_th=" + pool.escape(req.body.subThreeTh) + "," + 
        "sub_three_pr=" + pool.escape(req.body.subThreePr) + ",sub_four=" + pool.escape(req.body.subFour) + ",sub_four_th=" + pool.escape(req.body.subFourTh) + "," +
        "sub_four_pr=" + pool.escape(req.body.subFourPr) + ",sub_five="+ pool.escape(req.body.subFive) + ",sub_five_th=" + pool.escape(req.body.subFiveTh) + "," +
        "sub_five_pr=" + pool.escape(req.body.subFivePr) + ",sub_six=" + pool.escape(req.body.subSix) + ",sub_six_th=" + pool.escape(req.body.subSixTh) + "," +
        "sub_six_pr=" + pool.escape(req.body.subSixPr) + " WHERE identity=" + pool.escape(req.body.identity); 
        pool.query(query, (err, rows, fields) => {
            if (err) throw err;

            else{
                res.status(200).send();
                req.session.destroy();
            }

        });
    }
});

module.exports = router;