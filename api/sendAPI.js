/**
 * Created by manavkal on 2/21/17.
 */

'use strict';

const
    request = require('request'),
    prop =  require('../config/properties.json');

//var PAGE_ACCESS_TOKEN = 'EAAYxYoSrxRABAPsdBeZB6hR4FmUJR8dTZCP8kvlStkkU3xqUwTHzaBABbh0NESZA2UMtBqpx6ZAQ5FscE7ERe9u9xDsId52U6l6EOy8SqiZAsM3r0ZBUUwNfROtyZA9jiDB8uj8H4a22YZC5gKsumbiVRruxy323ErEYjAmjyW0KOQZDZD';
// Generate a page access token for your page from the App Dashboard
const PAGE_ACCESS_TOKEN = (process.env.MESSENGER_PAGE_ACCESS_TOKEN) ?
    (process.env.MESSENGER_PAGE_ACCESS_TOKEN) :
     prop.pageAccessToken;


function callSendAPIForMessage(messageData) {
    request({
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: PAGE_ACCESS_TOKEN },
        method: 'POST',
        json: messageData

    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var recipientId = body.recipient_id;
            var messageId = body.message_id;

            if (messageId) {
                console.log("Successfully sent message with id %s to recipient %s",
                    messageId, recipientId);
            } else {
                console.log("Successfully called Send API for recipient %s",
                    recipientId);
            }
        } else {
            console.error("Failed calling Send API", response.statusCode, response.statusMessage, body.error);
        }
    });
}

function callSendAPIForGreeting(messageData) {
    request({
        uri: 'https://graph.facebook.com/v2.6/me/thread_settings',
        qs: { access_token: PAGE_ACCESS_TOKEN },
        method: 'POST',
        json: messageData

    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("Greeting set successfully!");
        } else {
            console.error("Failed calling Thread Reference API", response.statusCode,     response.statusMessage, body.error);
        }
    });
}

module.exports = {
    sendAPIForGreeting : callSendAPIForGreeting,
    sendAPIForMessage : callSendAPIForMessage
}
