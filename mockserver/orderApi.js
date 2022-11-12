// const stripe = require("stripe")('sk_test_GOWePsYfVVYqtgbN9tgO3fCy000gergbj9');
const Razorpay = require('razorpay');
var crypto = require("crypto");
let razorPayKeySecret = '3BW6Z825ybhDdd3VV4dLUWtx';
var instance = new Razorpay({
    key_id: 'rzp_test_T9gKoGl91lbANn',
    key_secret: razorPayKeySecret,
});



const orderService = require('./orderservice.js');


function getuserId(req){
    return req.user.id;
}

async function allOrders(req, res) {
    const userId = getuserId(req);
    const orders = orderService.getAllOrders(userId);
    res.status(200).json(orders);
}
async function createOrder(req, res) {

    const {items,amount} = req.body;
    const userId = getuserId(req);
    let currency = "INR";
   const neworder = orderService.registerOrder({items,amount,userId,currency});
   console.log("new order",neworder);
    // generate random order id
    const orderId =neworder.id;
    try {

        const order=  await instance.orders.create({
            amount: amount *100,
            currency: currency,
            receipt: orderId,
            notes: {
                items: JSON.stringify(items).substring(0, 300),
            }
        })
        res.status(200).json({...order,orderId,razorpayOrderId: order.id});
    }catch (e) {
        console.log(e);
        res.status(500).json({error: e});
    }


}


async function validateOrder(req,res) {



    console.log("validateOrder",req.body);
    console.log("validateOrder",JSON.stringify(req.body));


    const {razorpay_payment_id,razorpay_order_id,razorpay_signature,orderId} = req.body;

    let body=razorpay_order_id + "|" + razorpay_payment_id;


    var expectedSignature = crypto.createHmac('sha256', razorPayKeySecret)
        .update(body.toString())
        .digest('hex');
    console.log("sig received " ,razorpay_signature);
    console.log("sig generated " ,expectedSignature);
    var response = {"signatureIsValid":"false"}
    if(expectedSignature === razorpay_signature){
        //send success response, update orders
        const order = orderService.updateOrderStatusToSuccess({id:orderId,razorpayOrderId:razorpay_order_id,paymentId:razorpay_payment_id});
        res.status(200).json(order);
    }else{
        //send failure response
        res.status(500).json({error: "Invalid Signature"});
    }
}
async function setAsFailure(req,res) {

    // const inp = {"razorpay_payment_id":"pay_KeaMl2VHeCa8NN",
    //     "razorpay_order_id":"order_KeaLwNsiUY4zv6",
    //     "razorpay_signature":"7bc2ac7e4c0a802f823c77033d007bcbe6d8d753e6d35399e5fe8b5e3068ee53"}
    // const inp = {"code":"BAD_REQUEST_ERROR",
    //     "description":"Your payment has been cancelled. Try again or complete the payment later.",
    //     "source":"customer","step":"payment_authentication",
    //     "reason":"payment_cancelled",
    //     "metadata":{"payment_id":"pay_KeaPCADOxMIO5r","order_id":"order_KeaOgyJscAVgXq"}}

/*
 {
  STATUS: 'FAILURE',
  receiptId: '17',
  error: {
    code: 'BAD_REQUEST_ERROR',
    description: 'Your payment has been cancelled. Try again or complete the payment later.',
    source: 'customer',
    step: 'payment_authentication',
    reason: 'payment_cancelled',
    metadata: {
      payment_id: 'pay_KedHTvymQ34PSC',
      order_id: 'order_KedFugyDC0WRoX'
    }
  }
}

 */

    console.log("set as failure",req.body);
    console.log("set as failure",JSON.stringify(req.body));
    const {error,orderId} = req.body;
    const {code,description,reason,metadata} = error;
    const {payment_id,order_id} = metadata;

    const errorParams = {code,description,reason,metadata};

    const order = orderService.updateOrderStatusToError({id:orderId,razorpayOrderId:order_id, paymentId:payment_id,error:errorParams});
     res.status(200).json(order);

}


module.exports = {
    createOrder: createOrder,
    validateOrder,
    setAsFailure
}
