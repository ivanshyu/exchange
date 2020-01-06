const amqp = require('amqplib/callback_api');
require('dotenv').config();

//send msg, called after transaction log writed into db
const pushIntoQueue = async(message, event) => {
    amqp.connect('amqp://localhost', function (err, conn) {
        conn.createChannel(function (err, ch) {
            let msg = message;

            ch.assertExchange('point', 'direct', { durable: true });

            //發送訊息
            ch.publish('point', event, Buffer.from(msg));
            console.log(" [x] Sent %s", msg);
            
        })
        setTimeout(function () { conn.close() }, 500);
    })
}

module.exports = {pushIntoQueue};
