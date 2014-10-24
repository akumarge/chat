//mongoose connection with mongodb
var mongoose=require('mongoose');
    var Schema = mongoose.Schema;

    var userSchema = new Schema({
		name : {
			type: String,
			default: '',
			required: 'Please fill Username',
			trim: true
		},
		password: {
			type: String,
			default: '',
			required: 'Please fill user password',
			trim: true,
		},	
		email: {
			type: String,
			default: '',
			required: 'Please fill user Email',
			trim: true,
		},
		mobile: {
			type: String,
			default: '',
			required: 'Please fill user password',
			trim: true,
		}
	});

	var userdetails_model=mongoose.model('user_details', userSchema);
	module.exports.user_details=userdetails_model;