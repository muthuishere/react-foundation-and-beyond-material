const jwt = require("jsonwebtoken");

const SECRET_KEY = '123456789'

const expiresIn = '24h'

// Create a token from a payload
function createToken(payload){
    return jwt.sign(payload, SECRET_KEY, {expiresIn})
}
function verifyToken(token){
    return  jwt.verify(token, SECRET_KEY, (err, decode) => decode !== undefined ?  decode : err)
}

function oldauthenticatedUser(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = verifyToken(token);
        const userId = decodedToken.id;
        if (!!userId) {
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};

function authenticatedUser(req, res, next) {
    authenticatedUserWithPredicate(req,res,next,(decodedToken)=>{
        console.log("decodedToken:",decodedToken);
        const userId = decodedToken.id;
        if (!!userId === false) {
            console.log("Invalid user ID");
           throw 'Invalid user ID';
        }
    })
}

function authenticatedAdmin(req, res, next) {
    authenticatedUserWithPredicate(req,res,next,(decodedToken)=>{
        console.log("decodedToken:",decodedToken);
        const role = decodedToken.role;


            if (role !== 'ADMIN')
            throw  'Invalid Privileage';

    })
}

function authenticatedUserWithPredicate(req, res, next,fn) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = verifyToken(token);
        req.user = decodedToken
         fn(decodedToken)
        console.log("authenticatedUserWithPredicate next:");
            next();


    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};

function oldauthenticatedAdmin(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const data = verifyToken(token);
     console.log("authenticated:"+data);
     const role = data.role;
     console.log("Role:"+role);
        if (role !== 'ADMIN') {
            throw 'Invalid Privileage';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};

module.exports = {
    createToken,
    authenticatedUser,
    authenticatedAdmin,
    verifyToken
}
