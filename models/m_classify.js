let mongoose = require('mongoose');
let autoIncrement = require('mongoose-plugin-autoinc');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://root:web@cluster0-xvsvf.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect();

classFind = async function(data) {
    return new Promise((resolve, reject) => {
        client.db("db").collection("Classify").find(data).toArray(async(err, rsp) => {
            if (err) {
                reject(err);
            }
            else if(rsp == null){
                resolve({"msg": false});
            }
            else{
                resolve({"msg": rsp});
            }
        })
    })
};

module.exports = {classFind};
