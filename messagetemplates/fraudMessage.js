/**
 * Created by manavkal on 2/23/17.
 */
function getFraudMessage(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text: "You are sure you have not authorized this transaction/purchase, it may be a Fraud. Please select one.",
                    buttons: [{
                        type: "postback",
                        title: "I have the card",
                        payload: "Yes_Card"
                    }, {
                        type: "postback",
                        title: "Compromised card",
                        payload: "Compromised_Card"
                    }, {
                        type: "postback",
                        title: "Don't have card",
                        payload: "No_Card"
                    }]
                }
            }
        }
    };
    return messageData;
}

function  getNoCardMessage(recipientId) {

    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text: "You don`t have your card currently but believe it has been compromised?(select Compromised)",
                    buttons: [{
                        //2.3.1
                        type: "postback",
                        title: "Card Not with me",
                        payload: "where_card"
                    }, {
                        //2.3.2
                        type: "postback",
                        title: "Card Misplaced",
                        payload: "misplaced_card"
                    }, {
                        //2.3.3
                        type: "postback",
                        title: "Lost/Stolen",
                        payload: "loststolen_card"
                    }]
                }
            }
        }

    }
    return messageData;
}

function getTemporaryBlockMessage(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text: "You have your card but believe it is not with you",
                    buttons: [{
                        type: "postback",
                        title: "Temporary Block",
                        payload: "block_card"
                    }]
                }
            }
        }

    }
    return messageData;
}

function getLostStolenCardMessage(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text: "You have lost your card or it is stolen",
                    buttons: [{
                        type: "postback",
                        title: "Stolen",
                        payload: "stolen_card"
                    },{
                        //2.3.3
                        type: "postback",
                        title: "Lost",
                        payload: "lost_card"
                    }]
                }
            }
        }

    }
    return messageData;
}

function getNewCardMessage(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text: "You have lost your card but believe need a new one",
                    buttons: [{
                        type: "postback",
                        title: "New Card",
                        payload: "new_card"
                    }]
                }
            }
        }

    }
    return messageData;
}
function getNewCardDaysMessage(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text: "When do you want to have your card shipped",
                    buttons: [{
                        type: "postback",
                        title: "Urgently",
                        payload: "ship_urgent"
                    },{
                        //2.3.3
                        type: "postback",
                        title: "It can wait",
                        payload: "ship_wait"
                    }]
                }
            }
        }

    }
    return messageData;
}



module.exports = {
    getFraudMessage: getFraudMessage,
    getNoCardMessage: getNoCardMessage,
    getTemporaryBlockMessage:getTemporaryBlockMessage,
    getLostStolenCardMessage:getLostStolenCardMessage,
    getNewCardMessage:getNewCardMessage,
    getNewCardDaysMessage:getNewCardDaysMessage
}