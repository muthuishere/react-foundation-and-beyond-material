const {faker} = require('@faker-js/faker');

function createRandomCompany(){
    return {
        name:  faker.company.name(),
        phrase:   faker.company.catchPhrase(),
        startedOn: faker.date.past(),
        turnover: faker.finance.amount(50000, 90000000, 2, '$'),
        employees: faker.random.numeric(5),
        address: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        country: faker.address.country(),
        zip: faker.address.zipCode(),
        url: faker.internet.url(),
        logo: faker.image.imageUrl()
    };
}
function getCompanies(req,res) {

    // get company based on id
    console.log(req.params)
    console.log(req.query)

    const count = req.query.count || 10;
    const companies = Array.from({ length: count}).map(createRandomCompany);
    res.status(200).json(companies);

    //http://localhost:3000/companies?count=100000

}

module.exports = {
    getCompanies
}
