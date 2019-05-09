const express = require('express');
const router = express.Router();

const webTitle = '多人VR教学式场景';

router.get('/', (req, res) => {
  res.render('game', {
    title: '游戏-' + webTitle,
    pageNav: 'game',
    application: "多人VR教学式场景",
    description: "相关描述"
  });
});

module.exports = router;
