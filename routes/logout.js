const express = require('express'),
    router = express.Router();

    router.get('/', (req,res) => {
        
        req.session.destroy();
        res.redirect('/');
    });


    module.exports = router;