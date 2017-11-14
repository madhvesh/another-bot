function sendDisputeMessage(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text: "Here to help - What's the nature of your query?",
                    buttons:[{
                        type: "postback",
                        title: "Unrecognized Transaction",
                        payload: "Unauthorized" //change to Unrecognized
                    }, {
                        type: "postback",
                        title: "Fraudulent Transaction",
                        payload: "Fraud"
                    }, {
                        type: "postback",
                        title: "Encountered problem",
                        payload: "Fishy"
                    }]
                }
            }
        }
    };
    return messageData;

}

function sendTransactionMessage(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "list",
                    top_element_style: "compact",
                    elements: [
                        {
                            title: "Rift + Touch",
                            image_url: "https://eb30d2be.ngrok.io/assets/rift.png",
                            subtitle: "Next-generation virtual reality just got better",
                            default_action: {
                                type: "web_url",
                                url: "https://messengerdemo.parseapp.com/img/rift.png",
                                messenger_extensions: true,
                                webview_height_ratio: "tall",
                                fallback_url: "https://google.com/"
                            },
                            buttons: [
                                {
                                    title: "Dispute",
                                    type: "postback",
                                    payload: "Create Dispute"
                                    //type: "web_url",
                                    //url: "https://messengerdemo.parseapp.com/img/rift.png",
                                    //messenger_extensions: true,
                                    //webview_height_ratio: "tall",
                                    //fallback_url: "https://messengerdemo.parseapp.com/"
                                }
                            ]
                        },
                        {
                            title: "Gululu Interactive Water Bottle",
                            image_url: "https://eb30d2be.ngrok.io/assets/gululu.png",
                            subtitle: "100% Cotton, 200% Comfortable",
                            default_action: {
                                type: "web_url",
                                url: "https://messengerdemo.parseapp.com/img/rift.png",
                                messenger_extensions: true,
                                webview_height_ratio: "tall",
                                fallback_url: "https://messengerdemo.parseapp.com/"
                            },
                            buttons:[{
                                type: "postback",
                                title: "More Info",
                                payload: "moretransaction" //change to Unrecognized
                            }]
                        }
                    ],
                    buttons: [
                        {
                            title: "View More",
                            type: "postback",
                            payload: "payload"
                        }
                    ]
                }
            }
        }
    }
    return messageData;
}

module.exports = {
    //getGenericMessage: getGenericMessage
    getGenericMessage: sendTransactionMessage,
    getDisputeMessage:sendDisputeMessage
}