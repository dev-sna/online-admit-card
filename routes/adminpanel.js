const express = require('express'),
      router = express.Router();

router.get('/', (req, res) => {
      if (req.session.user && req.session.accountType == 'admin') {
            res.render('index');
      }
      else{
            res.redirect('/exam-admin-login');
      }
});

router.post('/correction', (req, res) => {
      var pool = req.app.get("pool");

      console.log(req.body.data);
      //field corrected identity
      var query = "update student set "+ req.body.data.field + "=" + pool.escape(req.body.data.corrected) + ", status='' where identity=" + pool.escape(req.body.data.identity);
      console.log(query);
      pool.query(query, (err,rows,fields) => {
            if(err){
                  res.status(404).send();
                  throw err;
                  console.log(err);      
            }
            else if(rows.changedRows == 0){
                  res.status(404).send();
            }
                  else{
                  res.status(200).send();
            }
      });  

});

router.post('/accountcreate', (req, res) => {
      var pool = req.app.get("pool");

      //identity password department
      console.log(req.body.data);
      var query = "insert into department (identity,password,department) values(" + pool.escape(req.body.data.identity) + "," + pool.escape(req.body.data.password) +
      "," + pool.escape(req.body.data.department)+ ")";

      pool.query(query, (err,rows,fields) => {
            if(err){
                  res.status(404).send();
            }
            else{
                  res.status(200).send();
            }
      });

});

router.post('/accountupdate', (req, res) => {
      var pool = req.app.get("pool");


      var query = "update department set password=" + pool.escape(req.body.data.password) + "where identity=" + pool.escape(req.body.data.identity);

      pool.query(query, (err,rows,fields) => {
            if(err){
                  res.status(404).send();
            }
            else if(rows.changedRows == 0){
                  res.status(404).send();
            }
            else{
                  res.status(200).send();
            }
      });

});

router.post('/subjectinsert', (req, res) => {
      var pool = req.app.get("pool");

      console.log(req.body.data);
      var query = "insert into subjects (department,batch,semester,subOneCode,subOneTitle,subOneThHrs,subOnePrHrs,subTwoCode,subTwoTitle,subTwoThHrs,subTwoPrHrs,subThreeCode,subThreeTitle,subThreeThHrs,subThreePrHrs,"+
      "subFourCode,subFourTitle,subFourThHrs,subFourPrHrs,subFiveCode,subFiveTitle,subFiveThHrs,subFivePrHrs,subSixCode,subSixTitle,subSixThHrs,subSixPrHrs,subOneTh,subOnePr," +
      "subTwoTh,subTwoPr,subThreeTh,subThreePr,subFourTh,subFourPr,subFiveTh,subFivePr,subSixTh,subSixPr) values(" + pool.escape(req.body.data.department) + "," +
      pool.escape(req.body.data.batch) + "," + pool.escape(req.body.data.semester) + "," + pool.escape(req.body.data.subjectOneCode) + "," + 
      pool.escape(req.body.data.subjectOneTitle) + "," + pool.escape(req.body.data.subjectOneThHrs) + "," + pool.escape(req.body.data.subjectOnePrHrs) + "," + 
      pool.escape(req.body.data.subjectTwoCode) + "," + pool.escape(req.body.data.subjectTwoTitle) + "," + pool.escape(req.body.data.subjectTwoThHrs) + "," + 
      pool.escape(req.body.data.subjectTwoPrHrs) + "," + pool.escape(req.body.data.subjectThreeCode) + "," + pool.escape(req.body.data.subjectThreeTitle) + "," + 
      pool.escape(req.body.data.subjectThreeThHrs) + "," + pool.escape(req.body.data.subjectThreePrHrs) + "," + pool.escape(req.body.data.subjectFourCode) + "," + 
      pool.escape(req.body.data.subjectFourTitle) + "," + pool.escape(req.body.data.subjectFourThHrs) + "," + pool.escape(req.body.data.subjectFourPrHrs) + "," + 
      pool.escape(req.body.data.subjectFiveCode) + "," + pool.escape(req.body.data.subjectFiveTitle) + "," + pool.escape(req.body.data.subjectFiveThHrs) + "," + 
      pool.escape(req.body.data.subjectFivePrHrs) + "," + pool.escape(req.body.data.subjectSixCode) + "," + pool.escape(req.body.data.subjectSixTitle) + "," + 
      pool.escape(req.body.data.subjectSixThHrs) + "," + pool.escape(req.body.data.subjectSixPrHrs) + "," + pool.escape(req.body.data.subjectOneTh) + "," + 
      pool.escape(req.body.data.subjectOnePr) + "," + pool.escape(req.body.data.subjectTwoTh) + "," + pool.escape(req.body.data.subjectTwoPr) + "," + 
      pool.escape(req.body.data.subjectThreeTh) + "," + pool.escape(req.body.data.subjectThreePr) + "," + pool.escape(req.body.data.subjectFourTh) + "," + 
      pool.escape(req.body.data.subjectFourPr) + "," + pool.escape(req.body.data.subjectFiveTh) + "," + pool.escape(req.body.data.subjectFiveTh) + "," +
      pool.escape(req.body.data.subjectSixTh) + "," + pool.escape(req.body.data.subjectSixTh) + ")";

      pool.query(query, (err,rows,fields) => {
            if(err){
                  res.status(404).send();
                  console.log(err);
            }
            else{
                  res.status(200).send();
            }
      });

});

router.post('/adminaccountupdate', (req, res) => {
      var pool = req.app.get("pool");

      var query = "update department set password=" + pool.escape(req.body.data.password) + " where identity=" + pool.escape(req.body.data.email);
      
      pool.query(query, (err,rows,fields) => {
      if(err){
            res.status(404).send();
      }
      else if(rows.changedRows == 0){
            res.status(404).send();
      }
      else{
            res.status(200).send();
      }
      });

});

router.post('/dataclear', (req,res) => {
      var pool = req.app.get("pool");

      var query = "select password from department where identity ='"+ req.session.user + "'";
      
      pool.query(query, (err,rows,fields) => {
            if(err){
                  res.status(404).send();
                  console.log(err);
            }
            else if(rows[0].password == req.body.data.password){
                  pool.query("delete from student", (err,rows,fields) => {
                        if(err){
                              res.status(404).send();
                              console.log(err);
                        }
                        else{
                              res.status(200).send();
                        }
                  });
            }
            else{
                  res.status(404).send();
            }
      });
});

module.exports = router;