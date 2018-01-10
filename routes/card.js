const express = require('express'),
    ejs = require('ejs'),
    router = express.Router();

router.use('/:id', (req, res) => {
    if (req.session.user && req.session.accountType == 'examination') {
        var identity = req.params.id;
        var pool = req.app.get("pool");
        console.log(identity);

        /*id,identity,batch,enroll,semester,study_year,name,father_name,department,preAddress,nationality
        sub_one,sub_one_th,sub_one_pr
        */

        var query = "SELECT id,identity,batch,enroll,semester,study_year,name,father_name,department,exam_type,pre_address,nationality," +
            "sub_one,sub_one_th,sub_one_pr,sub_two,sub_two_th,sub_two_pr,sub_three,sub_three_th,sub_three_pr,sub_four,sub_four_th,sub_four_pr," +
            "sub_five,sub_five_th,sub_five_pr,sub_six,sub_six_th,sub_six_pr from student where identity='" + req.params.id + "'";

        pool.query(query, (err, rows, fields) => {
            if (err) throw err;
            else {
                // console.log(rows);
                var data = rows[0];
                ejs.renderFile('./views/card.ejs', data, function (err, str) {
                    res.pdfFromHTML({
                        filename: req.params.id+'.pdf',
                        htmlContent: str,
                        options: {
                            base: 'file:///C:/online-admit-card/',
                            format: "A4",
                            margin: '0cm',
                        }
                    });
                    console.log(err);
                });
            }
        });
    } 
    else {
        res.redirect('/');
    }

});

module.exports = router;