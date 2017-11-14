/**
 * Created by manavkal on 2/23/17.
 */

function getMerchantMessage(recipientId) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            attachment: {
                type: "template",

                payload: {
                    template_type: "generic",
                    elements: [{
                        title: "Amazon",
                        subtitle: "Online commerce reality",
                        buttons: [{
                            type: "postback",
                            title: "Merchant",
                            payload: "merchant_info"
                        }, {
                            type: "postback",
                            title: "Amount",
                            payload: "amount_info",
                        },{
                            type: "postback",
                            title: "Merchant and Amount",
                            payload: "merchant_amount",
                        }]
                    }]
                }
            }
        }
    }

    return messageData;

}




function getMerchantDetails(recipientId) {
    // Generate a random receipt ID as the API requires a unique ID
    var receiptId = "order" + Math.floor(Math.random()*1000);

    var messageData = {
        recipient: {
            id: recipientId
        },
        message:{
            attachment: {
                type: "template",
                payload: {
                    template_type: "receipt",
                    recipient_name: "Madhvesh Navkal",
                    merchant_name: "Amazon Online",
                    order_number: receiptId,
                    currency: "USD",
                    payment_method: "Visa",
                    timestamp: "1428444852",
                    elements: [{
                        title: "Amazon Inc USA online books " +
                        "bookwormbookstore.com online books bookwormbookstore.com",
                        subtitle: "Amazon USA" +
                        "online books bookwormbookstore.com took my brown bag online books bookwormbookstore.com",
                        quantity: 1,
                        price: 0,
                        currency: "USD",
                        //image_url: "https://3e619d5a.ngrok.io/assets/gululu.png"
                    }],
                    address: {
                        street_1: "900 Metro Center Blvd",
                        street_2: "M2",
                        city: "Foster City",
                        postal_code: "94118",
                        state: "CA",
                        country: "USA"
                    },
                    summary: {
                        //subtotal: 698.99,
                        //shipping_cost: 20.00,
                        //total_tax: 57.67,
                        total_cost: 0
                    }
                }
            }
        }
    }

    return(messageData);
}

function getAmount(recipientId) {
    // Generate a random receipt ID as the API requires a unique ID
    var receiptId = "order" + Math.floor(Math.random()*1000);

    var messageData = {
        recipient: {
            id: recipientId
        },
        message:{
            attachment: {
                type: "template",
                payload: {
                    template_type: "receipt",
                    recipient_name: "Madhvesh Navkal",
                    //merchant_name: "Amazon Online",
                    order_number: receiptId,
                    currency: "USD",
                    payment_method: "Visa",
                    //timestamp: "1428444852",
                    elements: [{
                        title: "Amazon Inc USA",
                        subtitle: "Amazon USA",
                        quantity: 1,
                        price: 0,
                        currency: "USD",
                        //image_url: "https://3e619d5a.ngrok.io/assets/gululu.png"
                    }],
                    summary: {
                        total_cost: 626.66
                    }
                }
            }
        }
    }

    return(messageData);
}

function getMerchantAmountDetails(recipientId) {
    // Generate a random receipt ID as the API requires a unique ID
    var receiptId = "order" + Math.floor(Math.random()*1000);

    var messageData = {
        recipient: {
            id: recipientId
        },
        message:{
            attachment: {
                type: "template",
                payload: {
                    template_type: "receipt",
                    recipient_name: "Madhvesh Navkal",
                    merchant_name: "Madhvesh Navkal",
                    order_number: receiptId,
                    currency: "USD",
                    payment_method: "Visa 1234",
                    timestamp: "1428444852",
                    elements: [{
                        title: "Amazon Inc USA",
                        subtitle: "Amazon USA",
                        quantity: 1,
                        price: 0,
                        currency: "USD",
                        //image_url: "https://3e619d5a.ngrok.io/assets/gululu.png"
                    }],
                    address: {
                        street_1: "900 Metro Center Blvd",
                        street_2: "",
                        city: "Foster City",
                        postal_code: "94118",
                        state: "CA",
                        country: "US"
                    },
                    summary: {
                        //subtotal: 698.99,
                        //shipping_cost: 20.00,
                        //total_tax: 57.67,
                        total_cost: 626.66
                    }
                }
            }
        }
    }

    return(messageData);
}





//For payload - Unauthorized
// function getTransactionMessage(recipientId) {
//     var messageData = {
//         recipient: {
//             id: recipientId
//         },
//         message: {
//             text:"Select where you want more information:",
//             quick_replies:[
//                 {
//                     content_type:"text",
//                     title:"Merchant",
//                     payload:"merchant_info"
//                 },
//                 {
//                     content_type:"text",
//                     title:"Amount",
//                     payload:"amount_info"
//                 },
//                 {
//                     content_type:"text",
//                     title:"Merchant and Amount",
//                     payload:"merch_amt_info"
//                 }
//             ]
//         }
//     }
//     return messageData;
// }




// function getMerchantMessage(recipientId) {
//     var messageData = {
//         recipient: {
//             id: recipientId
//         },
//         message: {
//             text:"Select where you want more information:",
//             quick_replies:[
//                 {
//                     content_type:"text",
//                     title:"Merchant",
//                     payload:"merchant_info"
//                 },
//                 {
//                     content_type:"text",
//                     title:"Amount",
//                     payload:"amount_info"
//                 },
//                 {
//                     content_type:"text",
//                     title:"Merchant and Amount",
//                     payload:"merch_amt_info"
//                 }
//             ]
//         }
//     }
//     return messageData;
// }


module.exports = {
    getTransactionMessage: getMerchantMessage,
    getMerchantDetails: getMerchantDetails,
    getAmount: getAmount,
    getMerchantAmountDetails: getMerchantAmountDetails
}
