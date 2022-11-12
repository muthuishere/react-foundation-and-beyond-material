const fs = require('fs');
let orders =[]

function initialize(){
    orders= require('./orders.json')
}
//get all orders
function getAllOrders(){
    return orders;
}
//get orders by user id
function getOrdersByUserId(userId){
    return orders.filter(order => order.userId === userId);
}

function getOrderById({id}){
    return orders.find(order => order.id === id)
}
// register order
function registerOrder(order){
    let last_item_id =1;
    if (orders.length > 0) {
        last_item_id = orders[orders.length-1].id;
    }

    const newOrder= {
        ...order, "id" : last_item_id + 1,status:"CREATED",paymentId:"",error:null
    }

    //Add new order
    orders.push(newOrder);
    updateJsonFile();
    return newOrder;
}

function updateOrderStatusToSuccess({id,razorpayOrderId,paymentId}){

    console.log("updateOrderStatusToSuccess",id,paymentId);

    let orderToBeReturned=  null;

    //update order status
    for (let i = 0; i <= orders.length; i++) {
        console.log("updateOrderStatusToSuccess check ",orders[i].id,id , orders[i].id === id);
        if (orders[i].id == id) {
            console.log("found order");
            orders[i].status = "SUCCESS";
            orders[i].paymentId = paymentId;
            orders[i].paymentOrderId = razorpayOrderId;
            orders[i].error = null;
            orderToBeReturned = orders[i];
            break;
        }
    }

    updateJsonFile();
    if(null
        === orderToBeReturned){
        console.log("order not found");
        console.log("updateOrderStatusToSuccess",id,paymentId);
    }
    return orderToBeReturned;
}

function updateOrderStatusToError({id,paymentId,razorpayOrderId,error}){


    let orderToBeReturned=  null;

    //update order status
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].id == id) {
            orders[i].status = "ERROR";
            orders[i].paymentId = paymentId;
            orders[i].paymentOrderId = razorpayOrderId;
            orders[i].error = error;
            orderToBeReturned = orders[i];
            break;
        }
    }

    updateJsonFile();
    if(null
        === orderToBeReturned){
        console.log("order not found");
        console.log("updateOrderStatusToSuccess",id,paymentId);
    }
    return orderToBeReturned;
}


function updateJsonFile(){


    setTimeout(function(){
        fs.writeFile('./orders.json', JSON.stringify(orders), function (err) {
            if (err) return console.log(err);
            console.log('writing to ' + './orders.json');
        });
    },1000);

}


module.exports = {

    registerOrder,
    updateOrderStatusToSuccess,
    updateOrderStatusToError,
    getAllOrders,
    initialize,
    getOrdersByUserId,
    getOrderById
}
