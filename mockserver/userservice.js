
let users =[]

function initialize(){
    users= require('./users.json')
}
//get all users
function getAllUsers(){
    return users;
}
function getUser({email, password}){
    return users.find(user => user.email === email && user.password === password)
}
function getUserByEmail({email}){
    return users.find(user => user.email === email )
}
// register user
function registerUser({firstName, role, lastName,email, password,gender,ipAddress,salary}){

    var last_item_id = users[users.length-1].id;
    const newUser= {
        "id" : last_item_id + 1,
        "firstName" : firstName,
        "role" : role,
        "lastName" :lastName,
        "email" : email,
        "password" : password,
        "gender" : gender,
        "ipAddress" : ipAddress,
        "salary" : salary
    }

    //Add new user
    users.push(newUser);
    return newUser;
}


module.exports = {
    getUser,
    registerUser,
    getAllUsers,
    initialize,
    getUserByEmail
}
