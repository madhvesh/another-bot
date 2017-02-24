function getGenericMessage(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text: "How can I help you. What do you want to report?",
                    buttons:[{
                        type: "postback",
                        title: "UnAuthorized Transaction",
                        payload: "Unauthorized"
                    }, {
                        type: "postback",
                        title: "Fraud Transaction",
                        payload: "Fraud"
                    }, {
                        type: "postback",
                        title: "Problem Transaction",
                        payload: "Fishy"
                    }]
                }
            }
        }
    };
    return messageData;

}

module.exports = {
    getGenericMessage: getGenericMessage
}