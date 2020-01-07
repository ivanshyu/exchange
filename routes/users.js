var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

var {accountInsert, accountFindOne, accountDetail} = require('../models/m_account');

router.post('/', function(req, res, next) {
  res.send("hi");
});

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
    let token = jwt.sign({ email: result.email, name: result.name ,exp: Math.floor(Date.now() / 1000) + (60 * 60) }, "ftP@jdnfkljdsbvdskjvbdkvn");
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
  let result = await accountDetail({
    email: req.query.email
  }).catch(err => {
      res.json(err);
  });
  console.log(result);
  res.json(result);
});

router.post('/test', async function(req, res, next) {
  console.log(55555);
})
module.exports = router;
