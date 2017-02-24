/**
 * Created by manavkal on 2/23/17.
 */

function problemFishyTransactionMessage(recipientId) {

    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text: "Okay, you believe something has gone wrong with this transaction/purchase",
                    buttons:[{
                        type: "postback",
                        title: "Did not receive item/cash",
                        payload: "No-item-cash"
                    }, {
                        type: "postback",
                        title: "Problem with goods/services",
                        payload: "Problem-goods-services"
                    }, {
                        type: "postback",
                        title: "Problem with transaction",
                        payload: "Problem-transaction"
                    }]
                }
            }
        }
    };

  return messageData;
}
function noItemOrCash(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text: " I didn’t receive the item/s or cash",
                    buttons: [{
                        type: "postback",
                        title: "Any of the it",
                        payload: "any_cash_item"
                    },{
                        //2.3.3
                        type: "postback",
                        title: "Some of the it",
                        payload: "some_cash_item"
                    }]
                }
            }
        }

    }
    return messageData;
}

function problemGoodsServices(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text: " Problem with the goods/services",
                    buttons: [{
                        type: "postback",
                        title: "Goods/Merchandise",
                        payload: "problem_goods"
                    },{

                        type: "postback",
                        title: "Services",
                        payload: "problem_services"
                    }]
                }
            }
        }

    }
     return messageData;
}


//For payload - Problem-transaction of problem transaction
function problemTransaction(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text: " I didn’t receive the item/s or cash",
                    buttons: [{
                        type: "postback",
                        title: "Incorrect Amount",
                        payload: "incorrect_amount"
                    },{

                        type: "postback",
                        title: "Charged Twice",
                        payload: "charged_twice"
                    }]
                }
            }
        }

    }
 return messageData;
}

function problemGoodsMessage(recipientId) {

    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text: " Problem with the goods/services",
                    buttons: [{
                        type: "postback",
                        title: "Different Quality",
                        payload: "problem_quality"
                    },{

                        type: "postback",
                        title: "Not on time",
                        payload: "problem_time"
                    }]
                }
            }
        }

    }
    return messageData
}

//For payload - problem_services of problem transaction
function problemServices(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text: " Problem with the goods/services",
                    buttons: [{
                        type: "postback",
                        title: "Different Quality",
                        payload: "problem_service_quality"
                    },{

                        type: "postback",
                        title: "Not on time",
                        payload: "problem_service_time"
                    }]
                }
            }
        }

    }
  return messageData
}




module.exports = {
    getProblemFishyTransactionMessage: problemFishyTransactionMessage,
    getNoItemOrCashMessage:noItemOrCash,
    getProblemGoodsServicesMessage:problemGoodsServices,
    getProblemTransactionMessage:problemTransaction,
    getProblemGoodsMessage:problemGoodsMessage,
    getProblemServicesMessage:problemServices

}