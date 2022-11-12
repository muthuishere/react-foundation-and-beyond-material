const {expect} =require("chai") ;
const {createToken} =require("./tokenhandler") ;


it('should create token', async function () {

    const res =  createToken({email:"invalid@mail.com"});
    expect(res).not.to.be.null;
});
