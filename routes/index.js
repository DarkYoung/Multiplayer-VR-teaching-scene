const express = require('express');

const router = express.Router();
const webTitle = '多人VR教学式场景';

router.get('/', function(req, res, next){
    res.render('index', {
        title:'首页-'+webTitle,
        pageNav:'index'
    });
});

router.get('/about', function(req, res, next){
    res.render('about', {
        title: '关于-'+webTitle,
        pageNav: 'about'
    });
});

module.exports = router;