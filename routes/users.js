var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
var ObjectId = require('mongodb').ObjectID;

var {accountInsert, accountFindOne, accountDetail, accountUpdateOne} = require('../models/m_account');
var {goodsFindOne} = require('../models/m_goods');


router.post('/register', async function(req, res, next) {
  console.log(req.body)
  if(req.body.email == undefined || req.body.name == undefined ||req.body.password == undefined ||
    req.body.email == null || req.body.name == null ||req.body.password == null ||
    req.body.email == '' || req.body.name == '' ||req.body.password == ''){
    res.json({
      status: false,
      msg: "欄位不得為空"
    });
  }
  let result = await accountInsert({
    email: req.body.email,
    name: req.body.name,
    password: req.body.password,
    address:{
      address_nation: req.body.address_nation,
      address_city: req.body.address_city,
      address_dist: req.body.address_dist,
      address_street: req.body.address_street,
      address_section: req.body.address_section,
      address_other: req.body.address_other
    }
  }).catch(err =>{
    console.log("error here");
    res.json({
      status: false,
      msg: err
    });
  });
  if(result != undefined){
    res.json({
      status: true,
      msg: result
    });
  }
});

router.post('/login', async function(req, res, next) {
  console.log("req.body:",req.body)
  if(req.body.email == undefined || req.body.password == undefined){
    res.json({
      status: false,
      msg: "帳號密碼錯誤"
    });
  }
  let result = await accountFindOne({
    email: req.body.email,
    password: req.body.password,
  }).catch(err =>{
    res.json({
      status: false,
      msg: err
    });  
  });
  console.log(result);
  if(result != undefined){
    let token = jwt.sign({ email: result.email, name: result.name ,exp: Math.floor(Date.now() / 1000) + (60 * 600000) }, "ftP@jdnfkljdsbvdskjvbdkvn");
    res.cookie('access_token', token);
    res.json({
      msg: "登入成功",
      jwt: token,
      status: true
    });
  } else{
    res.json({
      status: false,
      msg: "登入失敗"
    });  
  }
});

router.post('/verify' ,async function(req, res, next){
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
        res.cookie('email', decoded.email);
        res.cookie('name', decoded.name);
        res.json({
          status:true,
          msg: "認證成功"
        });
      }
    });
  } else {
    res.json({
      status: false,
      msg: 'Authorization 格式錯誤'
    });
  }
})

router.use(async function(req, res, next){
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
router.get('/', async function(req, res, next) {
  if(req.query.email == undefined){
    let result = await accountDetail({
      email: req.decoded.email
    }).catch(err => {
        res.json({
          msg: err,
          status: false
        });
    });
    res.json({
      status : true,
      msg: result
    });  
  } else {
    let result = await accountDetail({
      email: req.query.email
    }).catch(err => {
      res.json({
        msg: err,
        status: false
      });
    });
    res.json({
      status : true,
      msg: result
    });
  }
  
});

router.post('/favorite_list', async function(req, res, next) {
  let account = await accountDetail({
    email: req.decoded.email
  }).catch(err => {
      res.json(err);
  });
  if(account != undefined){
    console.log(account);
    let good = await goodsFindByOwner({
      "_id": ObjectId(req.body.id)
    }).catch(err =>{
      res.json({
        status: false,
        msg: err
      });  
    });
    if(good.msg[0] != undefined){
      //console.log(good[0])
      if(account.favorite_list == undefined){
        let result = await accountUpdateOne(account, 'favorite_list', good.msg).catch(err =>{
          res.json({
            status: false,
            msg: err
          })
        });
        if(result != undefined){
          res.json({
            status: false,
            msg: result
          })
        }
      }
      else{
        list = Array.from(account.favorite_list).concat(good.msg);
        console.log(list)
        let result = await accountUpdateOne(account, 'favorite_list',  list).catch(err =>{
          res.json({
            status: false,
            msg: err
          })
        });
        if(result != undefined){
          res.json({
            status: true,
            msg: result.result.nModified
          })
        }
      }
    }else{
      es.json({
        status: false
      })
    }
  }
});

router.get('/favorite_list', async function(req, res, next) {
  let result = await accountDetail({
    email: req.decoded.email
  }).catch(err => {
      res.json(err);
  });
  if(result != undefined){
    console.log(result.favorite_list);
    if(result.favorite_list != undefined){
      res.json({
        favorite_list: result.favorite_list,
        status: true
      })
    }
    else{
      res.json({
        favorite_list: "您目前沒有收藏的物品",
        status: true
      })
    }
  }
});

module.exports = router;
