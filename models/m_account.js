let mongoose = require('mongoose');
let autoIncrement = require('mongoose-plugin-autoinc');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://root:web@cluster0-xvsvf.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect();

accountInsert = async function(data) {
    return new Promise(async(resolve, reject) => {
        let result = await accountFindOne({email: data.email}).catch(err => {
            client.db("db").collection("Account").insertOne((data), async(err, rsp) => {
                if(err){
                    reject(err);
                }
                else{
                    console.log("新增成功")
                    resolve(rsp);
                }
            });   
        });
        if(result == true){
            console.log("has been registered")
            reject("此帳號已被註冊囉！");
        }
            
    });
};
accountFindOne = async function(data) {
    return new Promise((resolve, reject) => {
        client.db("db").collection("Account").findOne(data, async(err, rsp) => {
            if (err) {
                reject(err);
            }
            else if(rsp == null){
                reject(false);
            }
            else{
                resolve(rsp);
            }
        })
    })
}
accountDetail = async function(data) {
    console.log(data);
    return new Promise((resolve, reject) => {
        client.db("db").collection("Account").findOne(data, async(err, rsp) => {
            if(err){
                console.log("err")
                reject(err);
            }
            else{
                console.log("err")
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
