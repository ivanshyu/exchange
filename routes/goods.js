var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

var {goodsInsert, goodsFindOne, goodsDetail} = require('../models/m_goods');

router.use('/', async function(req, res, next){
    let token = req.cookies.access_token
    console.log(token);
    if (typeof token != 'undefined') {
          // Remove Bearer from string
      jwt.verify(token, "ftP@jdnfkljdsbvdskjvbdkvn", (err, decoded) => {
        if (err) {
          res.json({
            status: false,
            msg: 'Token is not valid'
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
      } else {
          res.json({
              status: false,
              msg: 'Authorization 格式錯誤'
          });
      }
  })
  
router.post('/', async function(req, res, next) {
    let result = await goodsInsert({
        tilte: req.body.title,
        new_old_rate: req.body.new_old_rate,
        description: req.body.description,
        owner: req.decoded.email
    }).catch(err => {
        res.send(err);
    });
    res.send(result);

});

router.post('/test', async function(req, res, next) {
  console.log(55555);
})

module.exports = router;