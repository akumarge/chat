/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var express=require('express'),
        app=express(),
        mongoose=require('mongoose');
        mongoose.connect('mongodb://localhost/tutorial');
        var Schema = mongoose.Schema;
        var userSchema = new Schema({
			name : String
			
			
			});
       var User = mongoose.model('user_details', userSchema);
		app.get('/',function(req,res){
			    User.find({}, function(err,users){
				res.send(users);
			});
		});

		/*var arvind = new User({
			name : 'dfdfs'
			
			});
		 
		arvind.save(function (err, data) {
		if (err) console.log(err);
		else console.log('Saved : ', data );
		});*/


app.listen('8000');
console.log('sever is waiting in 8000');