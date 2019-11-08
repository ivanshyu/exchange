let mongoose = require('mongoose');
let autoIncrement = require('mongoose-plugin-autoinc');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://root:web@cluster0-xvsvf.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect();


accountInsert = async function(data) {
    return new Promise(async(resolve, reject) => {
        let result = await accountFindOne({email: data.email}).catch(err => {
            reject(err);
        });
        if(result == true){
            resolve("此帳號已被註冊囉！");
        }
        client.db("db").collection("Account").insertOne((data), async(err, rsp) => {
            if(err){
                reject(err);
            }
            else{
                resolve("註冊成功");
            }
        });       
    });
};
accountFindOne = async function(data) {
    return new Promise((resolve, reject) => {
        client.db("db").collection("Account").findOne(data, async(err, rsp) => {
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
accountDetail = async function(data) {
    console.log(data);
    return new Promise((resolve, reject) => {
        client.db("db").collection("Account")
        .findOne(data)
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
module.exports = {accountInsert, accountFindOne, accountDetail};
