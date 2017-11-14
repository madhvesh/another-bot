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
                    text: "I see, so you are not sure if about this transaction/purchase. What exactly don't you recognize?",
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
                        title: "Merchant and Amount",
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