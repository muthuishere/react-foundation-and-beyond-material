const fs = require('fs')
const bodyParser = require('body-parser')
const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')

const server = jsonServer.create()
const router = jsonServer.router('./orders.json')
const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'))

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(jsonServer.defaults());

const SECRET_KEY = '123456789'

const expiresIn = '1h'

// Create a token from a payload
function createToken(payload){
  return jwt.sign(payload, SECRET_KEY, {expiresIn})
}



// Verify the token
function verifyToken(token){
  return  jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ?  decode : err)
}

// Check if the user exists in database
function isAuthenticated({email, password}){
  return userdb.users.findIndex(user => user.email === email && user.password === password) !== -1
}

function getUser({email, password}){
  return userdb.users.find(user => user.email === email && user.password === password)
}

function registerWithRole(req,res,role){

  console.log("register endpoint called; request body:");
  console.log(req.body);
  const {email, password,firstName,lastName,gender,salary} = req.body;




  if(isAuthenticated({email, password}) === true) {
    const status = 401;
    const message = 'Email and Password already exist';
    res.status(status).json({status, message});
    return
  }

fs.readFile("./users.json", (err, data) => {
    if (err) {
      const status = 401
      const message = err
      res.status(status).json({status, message})
      return
    };

    // Get current users data
    var data = JSON.parse(data.toString());

    // Get the id of last user

    var ip = req.headers['x-forwarded-for'] ||    req.socket.remoteAddress ||    null;

  var last_item_id = data.users[data.users.length-1].id;
    const newUser= {
      "id" : last_item_id + 1,
      "firstName" : firstName,
      "role" : role,
      "lastName" :lastName,
      "email" : email,
      "password" : password,
      "gender" : gender,
      "ipAddress" : ip,
      "salary" : salary
    }

    //Add new user
    data.users.push(newUser); //add some data
    var writeData = fs.writeFile("./users.json", JSON.stringify(data), (err, result) => {  // WRITE
        if (err) {
          const status = 401
          const message = err
          res.status(status).json({status, message})
          return
        }
    });
});

// Create token for new user
  const access_token = createToken({...newUser,password:""})
  console.log("Access Token:" + access_token);
  res.status(200).json({access_token,email})
}

// Register New User
server.post('/auth/register', (req, res) => {


  registerWithRole(req,res,"USER")
})


// Register New User
server.post('/auth/registeradmin', (req, res) => {


  registerWithRole(req,res,"ADMIN")
})

// Login to one of the users from ./users.json
server.post('/auth/login', (req, res) => {
  console.log("login endpoint called; request body:");
  console.log(req.body);
  const {email, password} = req.body;
  const result = getUser({email, password})
  if (!!result) {
    const status = 401
    const message = 'Incorrect email or password'
    res.status(status).json({status, message})
    return
  }
  const access_token = createToken({...result, password:""})
  console.log("Access Token:" + access_token);
  res.status(200).json({access_token,user:result})
})

server.use(/^(?!\/auth).*$/,  (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401
    const message = 'Error in authorization format'
    res.status(status).json({status, message})
    return
  }
  try {
    let verifyTokenResult;
     verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);

     if (verifyTokenResult instanceof Error) {
       const status = 401
       const message = 'Access token not provided'
       res.status(status).json({status, message})
       return
     }
     next()
  } catch (err) {
    const status = 401
    const message = 'Error access_token is revoked'
    res.status(status).json({status, message})
  }
})

server.use(router)

server.listen(8000, () => {
  console.log('Run Auth API Server')
})
