const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require("../app");
const faker = require("faker/locale/en_GB");
// const db = require("../models");


chai.use(chaiHttp);
describe('User', function () {
    describe('Register', function () {
        
        it('it should POST a User', (done) => {
            const user = {
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password()
            }
            chai.request(app)
                .post('/api/register')
                .send(user)
                .end(function (err, res) {

                    expect(res).to.have.status(200);
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('data')
                    expect(res.body).to.have.property('message').eql('User created');
                    done();
                });
        });

    });

    describe('Authenticate', function () {

        it('Login', (done) => {
            const payload = {
                email: "test@gmail.com",
                password: "password"
            }
            chai.request(app)
                .post('/api/login')
                .send(payload)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('message').eql('User successfully logged in');
                    expect(res.body).to.have.property('data')
                    expect(res.body).to.have.property('token')
                    done();
                });
        });

    });

    describe('UserDetails', function () {
        let token;
        // login the user to get the token and id
        before(function (done) {
            chai.request(app)
                .post("/api/login")
                .send({
                    email: "test@gmail.com",
                    password: "password"
                })
                .end((err, res) => {
                    token = res.body.token;
                    id = res.body.data.id;
                    done();
                });
        });

        it('it should GET a User by id', (done) => {

            chai.request(app)
                .get(`/api/user/${id}`)
                .set({ Authorization: `Bearer ${token}` })
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('data')
                    expect(res.body).to.have.property('message').eql('user succesfully fetched');
                    done();
                });
        });

    })
})