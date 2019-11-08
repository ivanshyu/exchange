var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

var {accountInsert, accountFindOne, accountDetail} = require('../models/m_account');

router.post('/', function(req, res, next) {
  res.send("hi");
});

router.post('/register', async function(req, res, next) {
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
    res.send(err);
  });
  res.send(result);
});

router.post('/login', async function(req, res, next) {
  let result = await accountFindOne({
    email: req.body.email,
    password: req.body.password,
  }).catch(err =>{
    res.send(err);
  });
  //console.log(result);
  let token = jwt.sign({ email: req.body.email ,exp: Math.floor(Date.now() / 1000) + (60 * 60) }, "ftP@jdnfkljdsbvdskjvbdkvn");
  res.cookie('access_token', token);
  res.send(result);

});

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

router.post('/test', async function(req, res, next) {
  console.log(55555);
})
module.exports = router;
