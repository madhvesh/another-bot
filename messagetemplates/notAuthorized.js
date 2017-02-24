/**
 * Created by manavkal on 2/23/17.
 */
//For payload - Unauthorized
function getUnAuthorizedMessage(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text: "I see, so you are not sure if you had authorized the transaction/purchase. What exactly you don't recognize?",
                    buttons:[{
                        type: "postback",
                        title: "Merchant",
                        payload: "merchant_notrecognized"
                    }, {
                        type: "postback",
                        title: "Amount",
                        payload: "I don’t recognize the Amount"
                    }, {
                        type: "postback",
                        title: "Merchant/Amount",
                        payload: "I don’t recognize the Merchant/Amount"
                    }]
                }
            }
        }
    }
    return messageData;
}

module.exports = {
    getUnAuthorizedMessage: getUnAuthorizedMessage
}