const userService = require('./userservice');
const {createToken} = require("./tokenhandler");


function registerWithRole(req, res, role) {

    console.log("register endpoint called; request body:");
    console.log(req.body);
    const {email, password, firstName, lastName, gender, salary} = req.body;


    const existingUser = userService.getUserByEmail({email})
    if (existingUser) {
        const status = 401;
        const message = 'Email  already exist';
        res.status(status).json({status, message});
        return
    }
    var ipAddress = req.headers['x-forwarded-for'] ||    req.socket.remoteAddress ||    null;

    let newUser =  userService.registerUser({email, password, firstName, lastName, gender, ipAddress,salary,role});
// Create token for new user
      let payload = removePassword(newUser);
    const access_token = createToken(payload)
    console.log("Access Token:" + access_token);
    res.status(200).json({access_token, user:payload})
}

function  isEmpty(str) {
    return (!!str == false);
}
function  isNotEmpty(str) {
    return !isEmpty(str);
}

function  removePassword(obj) {
    let payload = {...obj};
    delete payload.password;
    return payload;
}

// server.post('/auth/login', (req, res) => {

function handleLogin(req, res) {
    console.log("login endpoint called; request body:");
    console.log(req.body);
    const {email, password} = req.body;
    const result = userService.getUser({email, password})
    if (isEmpty(result )) {
        const status = 401
        const message = 'Incorrect email or password'
        res.status(status).json({status, message})
        return
    }
    let payload = removePassword(result);

    const access_token = createToken(payload)
    console.log("Access Token:" + access_token);
    res.status(200).json({access_token, user: payload})
}

module.exports = {
    registerWithRole,
    handleLogin
}
