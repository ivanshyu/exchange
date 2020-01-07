var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');


var { searchWallet, searchAddress, getBalance, deployWallet, setUserIdToBank, transfer, buyCoupon, signTx, sendSignedTransaction, soldToSettlement, getCouponsPoolFromSettlement, getCouponsPoolDetailFromSettlement
} = require('../contract/blockchain');

router.use('/', async function(req, res, next){
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
	if (typeof token == 'undefined' && !token.startsWith('Bearer ')) {
        console.log("length err")
		res.json({
            status: false,
            msg: 'Token is not valid'
        });
	}
    else if (token) {
        jwt.verify(token.slice(7, token.length), "ftP@jdnfkljdsbvdskjvbdkvn", (err, decoded) => {
            if (err) {
                console.log("decode err")
                res.json({
                    status: false,
                    msg: 'Token is not valid'
                });
            } else {
                req.decoded = decoded;
                if(req.decoded.account_id == "5db58689fec267c72b3c0e09"){
                    req.decoded.account_id = "104703037";
                }
                next();
            }
        });
    } else {
        res.json({
            status: false,
            msg: 'Token is not valid'
        });
    }
})

router.get('/points', async function(req, res, next){
    console.log(req.decoded.account_id)
    let points = await getBalance(req.decoded.account_id);
    res.json({
        status: true,
        points: parseInt(points)
    });
})

router.post('/transaction', async function(req, res, next){
    //let points = await getBalance(req.decoded.account_id);
    let result = await transfer(req.decoded.account_id, req.body.email, req.body.number, req.body.address, req.body.data).catch(err =>{
        res.json({
            msg: "error",
            status: 0
        })
    })
    if(result !== undefined){
        res.json({
            status: 1
        })
    }
})

router.get('/get_coupon_pool', async function(req, res, next){
    let result = await getCouponsPoolFromSettlement();
    if(result !== undefined){
        console.log(result.id)
        res.json({
            msg: result,
            status: true
        })
    }
})
router.get('/get_coupon_pool_detail', async function(req, res, next){
    let result = await getCouponsPoolDetailFromSettlement(req.query.coupon_id);
    if(result !== undefined){
        res.json({
            msg: result,
            status: true
        })
    }
})


router.post('/exchange_coupon', async function(req, res, next){
    //let points = await getBalance(req.decoded.account_id);
    console.log(req.body)
    let result = await buyCoupon(req.decoded.account_id, req.body.product_id, req.body.value, req.body.address, req.body.data).catch(err =>{
        res.json({
            msg: "error",
            status: false
        })
    })
    if(result !== undefined){
        console.log(result)
        res.json({
            msg: result,
            status: true
        })
    }
})


router.post('/push_coupon_pool', async function(req, res, next){
    //let points = await getBalance(req.decoded.account_id);
    console.log(req.body.product_id)
    let result = await soldToSettlement(
        req.decoded.account_id, 
        req.body.min, 
        req.body.max, 
        req.body.product_id, 
        req.body.vendor, 
        req.body.type, 
        req.body.address, 
        req.body.data
    ).catch(err =>{
        res.json({
            msg: "error",
            status: false
        })
    })
    if(result !== undefined){
        console.log(result)
        res.json({
            msg: result,
            status: true
        })
    }
})


module.exports = router;