const amqp = require('amqplib/callback_api')
const PrivateKeyProvider = require("truffle-privatekey-provider");
const Web3 = require("web3");

require("dotenv").config()
let admin = "0x7ddc00fbb4a74abac97dda2b1427137ba550c002";
let adminPK = "0x4101f41572a926d00656a2e00372e83702b30e288910dd8be661eb2a6c052b45";

let blockchainURL = "http://localhost:8545";
const backendAddrpkBuffer = Buffer.from(adminPK.substr(2), 'hex');
const provider = new PrivateKeyProvider(backendAddrpkBuffer, blockchainURL);
const web3deploy = new Web3(provider);

function startTransfer(name) {
    //開啟consumer
    amqp.connect('amqp://localhost', function (err, conn) {

        if(err){
            throw err;
        }
        if (name == '') {
            name = 'default'
        }
        conn.createChannel(function (err, ch) {
            let q = 'transfer'

            //assert exchange
            ch.assertExchange('point', 'direct', { durable: true })

            //assert queue
            ch.assertQueue(q, { durable: true }, function (err, q) {
                //bind exchange-queue
                ch.bindQueue(q.queue, 'point', 'transfer')
            })

            //ack之後才接收下一個msg
            ch.prefetch(5)

            console.log(" [*]  Consumer " + name + " waiting for messages in %s.", q)

            //consume
            ch.consume(q, function (msg) {
                console.log(" [*]  Consumer " + name + " consumes this message")

                let rawTx = msg.content.toString().split(',')// rawTx[0] = id, rawTx[1] = rawTx
                console.log(rawTx);
                web3deploy.eth.sendSignedTransaction(rawTx[1])
                    .on('receipt', function (result) {
                        console.log(result);
                        ch.ack(msg);
                        //更新Transaction Hash = ch.ack(msg)
                    })
                    .on('error', function (err) {
                        console.log(err)
                        ch.ack(msg);
                    })

            }, { noAck: false })
        })
    })
}

function startBuy(name) {
    //開啟consumer
    amqp.connect('amqp://localhost', function (err, conn) {

        if (name == '') {
            name = 'default'
        }

        conn.createChannel(function (err, ch) {

            let q = 'buy'

            //assert exchange
            ch.assertExchange('point', 'direct', { durable: true })

            //assert queue
            ch.assertQueue(q, { durable: true }, function (err, q) {
                //bind exchange-queue
                ch.bindQueue(q.queue, 'point', 'buy')
            })

            //ack之後才接收下一個msg
            ch.prefetch(5)

            console.log(" [*]  Consumer " + name + " waiting for messages in %s.", q)

            //consume
            ch.consume(q, function (msg) {
                console.log(" [*]  Consumer " + name + " consumes this message")

                let rawTx = msg.content.toString().split(',')
                console.log(rawTx);
                web3.eth.sendSignedTransaction(rawTx[0])
                    .on('receipt', function (result) {
                        //updaye db by ch.ack(msg)
                        console.log(result);
                        ch.ack(msg);
                    })
                    .on('error', function (err) {
                        console.log(err);
                        ch.ack(msg);
                    })

            }, { noAck: false })
        })
    })
}

//start consumer
startTransfer('t1');
startBuy('b1');