const app = require('./app');
const request = require('supertest')(app);
var mocha = require('mocha');
var faker = require('faker');
const should = require('should');
const assert = require('assert');

const frontEndUser = async() => {
    let _email = faker.internet.email(), _password = faker.random.words(), jwt, symbol, _name = faker.internet.userName;
    describe('intergration testing of user function', async function(){
      this.timeout(3000);  
      it('sign up an user', async function(){
        await request
          .post('/users/register')
          .send({ address: {address_nation: '台灣', address_city: '台北市', address_dist: '文山區', address_street: '指南路', address_section: '二段', address_other: '64號'}, name: "test" + faker.random.number(99999), email: _email, password: _password})
          .set('Accept', 'application/json')
          .expect(200)
          .then(async function(res){
              console.log(_email);
              console.log(_password);

              console.log(res.body)
            await res.body.status.should.equal(true);
            await res.body.msg.should.not.empty();
          })
      });
      it('login an user', async function(){
        await request
          .post('/users/login')
          .send({email: _email, password: _password})
          .set('Accept', 'application/json')
          .expect(200)
          .then(async function(res){
            console.log(res.body)
            await res.body.status.should.equal(true);
            await res.body.msg.should.not.empty();
            await res.body.jwt.should.not.empty();
            jwt = (res.header["set-cookie"]);
          })
      });
      it('get category', async function(){
        await request
          .get('/goods/classify')
          .set('Cookie', jwt)
          .expect(200)
          .then(async function(res){
            console.log(res.body)
            await res.body.msg.length.should.not.equal(0);
          })
      });
    })
}
frontEndUser()