const {expect} =require("chai") ;
const {createToken} =require("./tokenhandler") ;
const userService = require('./userservice');
describe('userservice tests', function () {

    before(function () {
        userService.initialize()
    });

    it('should initialize by default', async function () {

        const res =  userService.getUser({email:"user@test.com",password:"password"});
        console.log(res);
        expect(res).not.to.be.null;
    });

});
