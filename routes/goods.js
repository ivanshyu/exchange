var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
var ObjectId = require('mongodb').ObjectID;

var {goodsInsert, goodsFindOne, goodsDetail, goodsFindByOwner} = require('../models/m_goods');
var {classFind} = require('../models/m_classify');

router.get('/', async function(req, res, next) {
  if(req.query.email != null){
    let result = await goodsFindByOwner({
      "owner": req.query.email
    }).catch(err => {
        res.json(err);
    });
    console.log(result);
    res.json(result);
  }
  else if(req.query.id != null){
    let result = await goodsFindByOwner({
      "_id": ObjectId(req.query.id)
    }).catch(err => {
        res.json(err);
    });
    console.log(result.msg[0]);
    res.json(result);
  }
  else{
    let result = await goodsFindByOwner().catch(err => {
        res.json(err);
    });
    console.log(result);
    res.json(result);
  }

});


router.get('/classify', async function(req, res, next) {
  let result = await classFind().catch(err => {
    res.json(err);
  });
  res.json(result);

});


router.use('/', async function(req, res, next){
    let token = req.cookies.access_token
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
        title: req.body.title,
        class: req.body.class,
        description: req.body.description,
        owner: req.decoded.email,
        time: req.body.time,
        place: req.body.place,
        image: req.body.path
    }).catch(err => {
        res.json({
            status: "false",
            msg: '新增物品失敗'
        });
    });
    res.json({
        status: "success",
        msg: '新增物品成功'
    });

});


router.post('/test', async function(req, res, next) {
  console.log(55555);
})

module.exports = router;