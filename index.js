/**
 * Created by manavkal on 12/21/16.
 */
'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

var VERIFY_TOKEN = 'my_voice_is_my_password_verify_me';
var PAGE_ACCESS_TOKEN = 'EAAYxYoSrxRABAPsdBeZB6hR4FmUJR8dTZCP8kvlStkkU3xqUwTHzaBABbh0NESZA2UMtBqpx6ZAQ5FscE7ERe9u9xDsId52U6l6EOy8SqiZAsM3r0ZBUUwNfROtyZA9jiDB8uj8H4a22YZC5gKsumbiVRruxy323ErEYjAmjyW0KOQZDZD';
app.set('port', (process.env.PORT || 5000))



// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
    res.send('This is TestBot Server');
});

// for Facebook verification


app.get('/webhook', function (req, res) {
    if (req.query['hub.verify_token'] === VERIFY_TOKEN) {
        console.log('Verify request');
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Invalid verify token');
    }
});


app.post('/webhook/', function (req, res) {
    let messaging_events = req.body.entry[0].messaging
    for (let i = 0; i < messaging_events.length; i++) {
        let event = req.body.entry[0].messaging[i]
        let sender = event.sender.id
        if (event.message && event.message.text) {
            let text = event.message.text
            if (text === 'Create Dispute') {
                sendGenericMessage(sender)
                continue
            }
            //sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
        }
        if (event.postback) {
            let text = JSON.stringify(event.postback)

            let action = event.postback.payload;

            console.log(action);

            if(action == 'Unauthorized') {
               var type = 'Unauthorized TXN';
                sendUnAuthorizedMessage(sender);
                continue
            }

            else if(action == 'Fraud') {
                type = 'Fraud TXN';
                sendFraudMessage(sender);
                continue
            }
            else if(action == 'Fishy') {
                type = 'Fishy TXN';
                sendFishyMessage(sender);
                continue
            }
            else {
            sendTextMessage(sender, "Received: "+action)
            continue
            }
        }
    }
    res.sendStatus(200)
})


function sendTextMessage(sender, text) {
    let messageData = { text:text }
    callSendAPI(messageData,sender);
    // request({
    //     url: 'https://graph.facebook.com/v2.6/me/messages',
    //     qs: {access_token:PAGE_ACCESS_TOKEN},
    //     method: 'POST',
    //     json: {
    //         recipient: {id:sender},
    //         message: messageData,
    //     }
    // }, function(error, response, body) {
    //     if (error) {
    //         console.log('Error sending messages: ', error)
    //     } else if (response.body.error) {
    //         console.log('Error: yyyy ', response.body.error)
    //     }
    // })
}


function sendGenericMessage(sender) {
    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "Hi Madhvesh"  + ", How can I help you. What do you want to report?",
                "buttons": [
                    {
                        "type": "postback",
                        "title": "Unauthorized TXN",
                        "payload": "Unauthorized"
                    },
                    {
                        "type": "postback",
                        "title": "Fraud TXN",
                        "payload": "Fraud"
                    },
                    {
                        "type": "postback",
                        "title": "Fishy TXN",
                        "payload": "Fishy"
                    }
                ]
            }
        }
    }
    callSendAPI(messageData,sender);

}

function sendFishyMessage(sender) {
    var messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "Okay, you believe something has gone wrong with this transaction/purchase",
                "buttons": [
                    {
                        "type": "postback",
                        "title": "Did not receive item/cash",
                        "payload": "Did not receive item/cash"
                    },
                    {
                        "type": "postback",
                        "title": " Problem with goods/services",
                        "payload": " Problem with goods/services"
                    },
                    {
                        "type": "postback",
                        "title": "Problem with transaction",
                        "payload": "Problem with transaction"
                    }
                ]
            }
        }
    };
    callSendAPI(messageData, sender);
}

function sendFraudMessage(sender) {
    var messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "You have your card but believe it has been compromised?(select Compromised)",
                "buttons": [
                    {
                        "type": "postback",
                        "title": "Yes have card",
                        "payload": "yes_card"
                    },
                    {
                        "type": "postback",
                        "title": "Don't have card",
                        "payload": "no_card"
                    },
                    {
                        "type": "postback",
                        "title": "Compromised card",
                        "payload": "compromised_card"
                    }
                ]
            }
        }
    };
    callSendAPI(messageData, sender);
}

function sendUnAuthorizedMessage(sender) {
    var messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "I see, so you are not sure if you had authorized the transaction/purchase. What exactly you don't recognize?",
                "buttons": [
                    {
                        "type": "postback",
                        "title": "Merchant",
                        "payload": "I don’t recognize the Merchant"
                    },
                    {
                        "type": "postback",
                        "title": "Amount",
                        "payload": "I don’t recognize the Amount"
                    },
                    {
                        "type": "postback",
                        "title": "Merchant/Amount",
                        "payload": "I don’t recognize the Merchant/Amount"
                    }
                ]
            }
        }
    };
    callSendAPI(messageData, sender);
}

function callSendAPI(messageData,sender) {
    request({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: PAGE_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData
         }

    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var recipientId = body.recipient_id;
            var messageId = body.message_id;

            console.log("Successfully sent generic message with id %s to recipient %s",
                messageId, recipientId);
        } else {
            console.error("Unable to send message.");
            //console.error(response);
            //console.error(error);
        }
    });
}

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})
