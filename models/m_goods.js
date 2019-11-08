let mongoose = require('mongoose');
let autoIncrement = require('mongoose-plugin-autoinc');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://root:web@cluster0-xvsvf.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect();


goodsInsert = async function(data) {
    return new Promise(async(resolve, reject) => {
        client.db("db").collection("Goods").insertOne((data), async(err, rsp) => {
            if(err){
                reject(err);
            }
            else{
                resolve("新增成功");
            }
        });       
    });
};
goodsFindOne = async function(data) {
    return new Promise((resolve, reject) => {
        client.db("db").collection("Goods").findOne(data, async(err, rsp) => {
            if (err) {
                reject(err);
            }
            else if(rsp == null){
                resolve(false);
            }
            else{
                resolve(true);
            }
        })
    })
}
goodsDetail = async function(data) {
    console.log(data);
    return new Promise((resolve, reject) => {
        client.db("db").collection("Goods")
        .findOne(data)
        .populate('goods_list.goods')
        .exec(async(err, rsp) => {
            if(err){
                reject(err);
            }
            else{
                resolve(rsp);
            }
        });
    })
}
/*


Model.list = function(data, callback) {
    Model.find(data).
    exec((err, rsp) => {
        callback(err, rsp);
    });
}


Model.detail = function(data, callback) {
    Model.findOne(data).
    populate('point_list.point').
    exec((err, rsp) => {
        callback(err, rsp);
    });
};


Model.has = function(data, callback) {
    Model.findOne(data, (err, rsp) => {
        if (rsp == null) {
            callback(err, false);
        } else {
            callback(err, true);
        }
    });
};
*/
module.exports = {goodsInsert, goodsFindOne, goodsDetail};
