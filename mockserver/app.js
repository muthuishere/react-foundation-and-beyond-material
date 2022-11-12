var express = require('express');
var jsonServer = require('json-server');
const userService = require('./userservice');
const orderService = require('./orderservice');
const userApi = require('./userapi');
const companyApi = require('./companyApi');
const orderApi = require('./orderApi');
const {authenticatedAdmin,authenticatedUser} = require('./tokenhandler');
const fs = require('fs')
const bodyParser = require('body-parser')

const jwt = require('jsonwebtoken')





const server = express();
server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(jsonServer.defaults());
// ...

// You may want to mount JSON Server on a specific end-point, for example /api
// Optiona,l except if you want to have JSON Server defaults
// server.use('/api', jsonServer.defaults());
server.use('/api', jsonServer.router('full-db.json'));
server.get('/custom', function (req, res) { res.json({ msg: 'hello' }) })

server.post('/auth/login', (req, res) => {
    userApi.handleLogin(req,res)
})

// stripe ready

// payment initiation
// userid , amount, currency, description, status
server.post('/payments/initate',authenticatedUser, (req, res) => {
    orderApi.createOrder(req,res)
})

server.post('/payments/validate',authenticatedUser, (req, res) => {
    orderApi.validateOrder(req,res)

})
server.post('/payments/error',authenticatedUser, (req, res) => {
    orderApi.setAsFailure(req,res)

})
server.post('/auth/register', (req, res) => {
    userApi.registerWithRole(req,res,"USER")
})
server.get('/companies', (req, res) => {
    companyApi.getCompanies(req,res)
})
server.post('/auth/registeradmin',authenticatedAdmin, (req, res) => {
    userApi.registerWithRole(req,res,"ADMIN")
})
userService.initialize();
orderService.initialize();

server.listen(4200);
