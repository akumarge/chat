/*'use strict';
var should=require('should');

describe('addition', function () {
 it('should add 1+1 correctly', function (done) {
   var onePlusOne = 1 + 1;
   onePlusOne.should.equal(2);
   done();
 });
});*/

'use strict';

var should=require('should'),
	supertest=require('supertest'),
	app=require('../app.js');

describe('Login', function () {
   
      //Testing the GET call for login 
       it('Login success for user', function (done) {
         supertest(app)
            .get('/home')
            .expect(200)
            .end(function(err,res){
               should.not.exist(err);
               console.log(res.header);
            });
         done();
       }); 

      //Testing the POST call for login
       it('Login success for user', function (done) {
         supertest(app)
         	.post('/login')
            .send({
                  username: 'aa@gmail.com',
                  password: 'ashok'
               })
         	.expect(302)
         	.end(function(err,res){
               should.not.exist(err);
         		res.header.location.should.equal('/home');
         	});
         done();
       });

});