/**
 * Created by manavkal on 12/21/16.
 */
'use strict'

const
    express = require('express'),
    bodyParser = require('body-parser'),
    request = require('request'),
    prop =  require('./config/properties.json'),
    app = express();

var fs = require('fs');
var http = require('http');
var https = require('https');

var options = {
  key: fs.readFileSync('sslcert/key.pem'),
  cert: fs.readFileSync('sslcert/cert.pem')
};



var VALIDATION_TOKEN = prop.validationToken

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static('public'));

var sendToMessenger = require('./api/sendAPI');

// Index route
app.get('/', function (req, res) {
    res.send('This is TestBot Server');
});

// for Facebook verification
app.get('/webhook', function (req, res) {
    if (req.query['hub.verify_token'] === VALIDATION_TOKEN) {
        console.log('Verify request');
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Invalid verify token');
    }
});

app.get('/test', function (req, res) {

        res.send('hello bot');

});


// app.post('/webhook', function (req, res) {
//     var data = req.body;
//     //console.log(data);
//
//     // Make sure this is a page subscription
//     if (data.object == 'page') {
//         // Iterate over each entry
//         // There may be multiple if batched
//         data.entry.forEach(function(pageEntry) {
//             //var pageID = pageEntry.id;
//             //var timeOfEvent = pageEntry.time;
//             pageEntry.messaging.forEach(function(messagingEvent) {
//                 console.log(messagingEvent);
//                 if (messagingEvent.message && !messagingEvent.message.is_echo) {
//                     receivedMessage(messagingEvent);
//                 }
//                 else if (messagingEvent.delivery) {
//                     receivedDeliveryConfirmation(messagingEvent);
//                 }
//                 else if(messagingEvent.postback) {
//                     receivedPostback(messagingEvent);
//                 }
//
//             });
//         });
//
//         res.sendStatus(200);
//     }
// });


app.post('/webhook', function (req, res) {
    var data = req.body;

    // Make sure this is a page subscription
    if (data.object == 'page') {
        // Iterate over each entry
        // There may be multiple if batched
        data.entry.forEach(function(pageEntry) {
            var pageID = pageEntry.id;
            var timeOfEvent = pageEntry.time;

            // Iterate over each messaging event
            pageEntry.messaging.forEach(function(messagingEvent) {
                if (messagingEvent.optin) {
                    receivedAuthentication(messagingEvent);
                } else if (messagingEvent.message) {
                    receivedMessage(messagingEvent);
                } else if (messagingEvent.delivery) {
                    receivedDeliveryConfirmation(messagingEvent);
                } else if (messagingEvent.postback) {
                    receivedPostback(messagingEvent);
                } else if (messagingEvent.read) {
                  //  receivedMessageRead(messagingEvent);
                } else if (messagingEvent.account_linking) {
                    //receivedAccountLink(messagingEvent);
                } else {
                    console.log("Webhook received unknown messagingEvent: ", messagingEvent);
                }
            });
        });

        // Assume all went well.
        //
        // You must send back a 200, within 20 seconds, to let us know you've
        // successfully received the callback. Otherwise, the request will time out.
        res.sendStatus(200);
    }
});


function receivedMessage(event) {
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfMessage = event.timestamp;
    var message = event.message;

    console.log("Received message for user %d and page %d at %d with message:",
        senderID, recipientID, timeOfMessage);
   // console.log(JSON.stringify(message));

    var isEcho = message.is_echo;
    var messageId = message.mid;
    var appId = message.app_id;
    var metadata = message.metadata;

    // You may get a text or attachment but not both
    var messageText = message.text;
    var messageAttachments = message.attachments;
    var quickReply = message.quick_reply;

    if (isEcho) {
        // Just logging message echoes to console
        console.log("Received echo for message %s and app %d with metadata %s",
            messageId, appId, metadata);
        return;
    } else if (quickReply) {
        var quickReplyPayload = quickReply.payload;
        console.log("Quick reply for message %s with payload %s",
            messageId, quickReplyPayload);

        sendTextMessage(senderID, "Quick reply tapped");
        return;
    }

    if (messageText) {

        // If we receive a text message, check to see if it matches a keyword
        // and send back the example. Otherwise, just echo the text we received.
        switch (messageText) {
            case 'Invoke Dispute':
                sendMerchantMessage(senderID);
                break;

            default:
                sendTextMessage(senderID, messageText);
        }
    } else if (messageAttachments) {
        sendTextMessage(senderID, "Message with attachment received");
    }
}

// function receivedMessage(event) {
//     var senderID = event.sender.id;
//     var recipientID = event.recipient.id;
//     var timeOfMessage = event.timestamp;
//     var message = event.message;
//
//     console.log("Received message for user %d and page %d at %d with message:",
//         senderID, recipientID, timeOfMessage);
//
//
//     var messageText = message.text;
//     var messageAttachments = message.attachments;
//
//     if (messageText) {
//
//         // If we receive a text message, check to see if it matches a keyword
//         // and send back the example. Otherwise, just echo the text we received.
//         switch (messageText) {
//             case 'Create Dispute':
//                 sendGenericMessage(senderID);
//                 break;
//
//             default:
//                 sendTextMessage(senderID, messageText);
//         }
//     } else if (messageAttachments) {
//         sendTextMessage(senderID, "Message with attachment received");
//     }
// }



/*
 * Delivery Confirmation Event
 *
 * This event is sent to confirm the delivery of a message.
 *
 */
function receivedDeliveryConfirmation(event) {
    var delivery = event.delivery;
    var messageIDs = delivery.mids;
    var watermark = delivery.watermark;

    if (messageIDs) {
        messageIDs.forEach(function(messageID) {
            console.log("Received delivery confirmation for message ID: %s",
                messageID);
        });
    }
   // console.log("All message before %d were delivered.", watermark);
}



function receivedPostback(event) {
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfPostback = event.timestamp;

    // The 'payload' param is a developer-defined field which is set in a postback
    // button for Structured Messages.
    var payload = event.postback.payload;

    console.log("Received postback for user %d and page %d with payload '%s' " +
        "at %d", senderID, recipientID, payload, timeOfPostback);

    // When a postback is called, we'll send a message back to the sender to
    // let them know it was successful

    if (payload) {

        // If we receive a specific message, check to see if it matches a keyword
        // and send back the example. Otherwise, just echo the text we received.
        switch (payload) {

            case 'moretransaction':
                sendTransactionMessage(senderID);
                break;

            case 'Invoke Dispute':
                sendMerchantMessage(senderID); //maddy
                break;

            case 'Create Dispute':
                 sendDisputeMessage(senderID)
                 break;

            case 'Unauthorized':
                sendUnAuthorizedMessage(senderID);
                break;
            case 'Fraud':
                sendFraudMessage(senderID);
                break;
            case 'No_Card':
                sendNoCard(senderID);
                break;
            case 'Fishy':
                sendFishyMessage(senderID);
                break;
            case 'No-item-cash':
                sendNoItemOrCash(senderID)
                break;
            case 'Problem-transaction':
                  sendProblemTransaction(senderID);
                 break;
            case 'Problem-goods-services':
                 sendProblemGoodsServices(senderID);
                 break;
            case 'problem_goods':
                sendProblemGoods(senderID);
                break;
            case 'problem_services':
                sendProblemServices(senderID)
                break;

            case 'where_card':
            case 'misplaced_card':
                sendTemporaryBlock(senderID)
                break;
            case 'loststolen_card':
                sendLostStolenCard(senderID)
                break;
            case 'lost_card':
                sendNewCard(senderID)
                break;
            case 'new_card':
                sendNewCardDays(senderID)
                break;

            case 'merchant_info':
                sendMerchantInfo(senderID);
                break;

            case 'amount_info':
                sendAmountInfo(senderID);
                break;

            case 'merchant_amount':
                sendMerchantAmountDetails(senderID);
                break;

            default:
                sendTextMessage(senderID, "Received: "+payload);
        }
    }
}

function sendMerchantAmountDetails(recipientId) {
    var transactionTemplate = require('./messagetemplates/transactionInfo');
    var message = transactionTemplate.getMerchantAmountDetails(recipientId);
    sendToMessenger.sendAPIForMessage(message);
}

function sendAmountInfo(recipientId) {
    var transactionTemplate = require('./messagetemplates/transactionInfo');
    var message = transactionTemplate.getAmount(recipientId);
    sendToMessenger.sendAPIForMessage(message);
}

function sendMerchantInfo(recipientId) {
    var transactionTemplate = require('./messagetemplates/transactionInfo');
    var message = transactionTemplate.getMerchantDetails(recipientId);
    sendToMessenger.sendAPIForMessage(message);
}

function sendTransactionMessage(recipientId) {
    var transactionTemplate = require('./messagetemplates/transactionInfo');
    var message = transactionTemplate.getTransactionMessage(recipientId);
    sendToMessenger.sendAPIForMessage(message);
}


function sendTextMessage(recipientId, messageText) {
    //var messageData = { text:messageText }

   var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            text: messageText,
            metadata: "Test Metadata"
        }
    };
     //callSendAPINew(messageData,recipientId);
    sendToMessenger.sendAPIForMessage(messageData);
}

function sendMerchantMessage(recipientId) {
    var genericTemplate = require('./messagetemplates/genericMessage');
    var message = genericTemplate.getGenericMessage(recipientId);
    sendToMessenger.sendAPIForMessage(message);
}

function sendDisputeMessage(recipientId) {
    var genericTemplate = require('./messagetemplates/genericMessage');
    var message = genericTemplate.getDisputeMessage(recipientId);
    sendToMessenger.sendAPIForMessage(message);
}

//For payload - Unauthorized
function sendUnAuthorizedMessage(recipientId) {

    var notAuthTemplate = require('./messagetemplates/notAuthorized');
    var message = notAuthTemplate.getUnAuthorizedMessage(recipientId);
    sendToMessenger.sendAPIForMessage(message);
}


//Method for fraud postback
function sendFraudMessage(recipientId) {
    var fraudTemplate = require('./messagetemplates/fraudMessage');
    var message = fraudTemplate.getFraudMessage(recipientId);
    sendToMessenger.sendAPIForMessage(message);
}

//For postback No_Card (2.3)
function  sendNoCard(recipientId) {
    var fraudTemplate = require('./messagetemplates/fraudMessage');
    var message = fraudTemplate.getNoCardMessage(recipientId);
    sendToMessenger.sendAPIForMessage(message);
}

//Postback for where_card or stolen_card
function sendTemporaryBlock(recipientId) {
    var fraudTemplate = require('./messagetemplates/fraudMessage');
    var message = fraudTemplate.getTemporaryBlockMessage(recipientId);
    sendToMessenger.sendAPIForMessage(message);
}


//Postback for loststolen_card - 2.3.3.1 and 2.3.3.2
function sendLostStolenCard(recipientId) {
    var fraudTemplate = require('./messagetemplates/fraudMessage');
    var message = fraudTemplate.getLostStolenCardMessage(recipientId);
    sendToMessenger.sendAPIForMessage(message);
}

//Postback for lost_card or stolen_card - 2.3.3.2.1
function sendNewCard(recipientId) {
    var fraudTemplate = require('./messagetemplates/fraudMessage');
    var message = fraudTemplate.getNewCardMessage(recipientId);
    sendToMessenger.sendAPIForMessage(message);

}

//Postback for new_card - 2.3.3.2.1.1 and 2.3.3.2.1.2
function sendNewCardDays(recipientId) {
    var fraudTemplate = require('./messagetemplates/fraudMessage');
    var message = fraudTemplate.getNewCardDaysMessage(recipientId);
    sendToMessenger.sendAPIForMessage(message);

}

//For payload - Fishy of problem transaction
function sendFishyMessage(recipientId) {
    var problemTemplate = require('./messagetemplates/problemTransaction');
    var message = problemTemplate.getProblemFishyTransactionMessage(recipientId);
    sendToMessenger.sendAPIForMessage(message);
}

//For payload - No-item-cash of problem transaction
function sendNoItemOrCash(recipientId) {
    var problemTemplate = require('./messagetemplates/problemTransaction');
    var message = problemTemplate.getNoItemOrCashMessage(recipientId);
    sendToMessenger.sendAPIForMessage(message);
}

//For payload - Problem-goods-services of problem transaction
function sendProblemGoodsServices(recipientId) {
    var problemTemplate = require('./messagetemplates/problemTransaction');
    var message = problemTemplate.getProblemGoodsServicesMessage(recipientId);
    sendToMessenger.sendAPIForMessage(message);
}

//For payload - problem_goods of problem transaction
function sendProblemGoods(recipientId) {

    var problemTemplate = require('./messagetemplates/problemTransaction');
    var message = problemTemplate.getProblemGoodsMessage(recipientId);
    sendToMessenger.sendAPIForMessage(message);
}

//For payload - problem_services of problem transaction
function sendProblemServices(recipientId) {
    var problemTemplate = require('./messagetemplates/problemTransaction');
    var message = problemTemplate.getProblemServicesMessage(recipientId);
    sendToMessenger.sendAPIForMessage(message);
}


//For payload - Problem-transaction of problem transaction
function sendProblemTransaction(recipientId) {
    var problemTemplate = require('./messagetemplates/problemTransaction');
    var message = problemTemplate.getProblemTransactionMessage(recipientId);
    sendToMessenger.sendAPIForMessage(message);
}



function setGreetingText() {
    var messageData = {
        setting_type: "greeting",
        greeting:{
            text:"Hi {{user_full_name}}, welcome!"
        }
    };
    sendToMessenger.sendAPIForGreeting(messageData);
}

function invokeDispute() {

    var messageData = {
        setting_type:"call_to_actions",
        thread_state:"new_thread",
        call_to_actions:[
            {
                payload:"Invoke Dispute"
            }
        ]
    };
    sendToMessenger.sendAPIForGreeting(messageData);
}

var httpsServer = https.createServer(options, app);
httpsServer.listen(8443);

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
    setGreetingText();
    invokeDispute();

});

