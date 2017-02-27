var request = require('request');
var config = require('./config');

var form = {
	role : 'dataentry',
	username : 'khatramanche'
};

var userForm = {
	username : 'khatramanche',
	password : 'cool123',
	first_name : 'Khatra',
	last_name : 'Manche',
	email : 'khatra@dsa.com'
}

// request.put(config.OnaApi.livebaseUrl + '/projects/30730/share',{
//   'auth': {
//     'user': 'testman',
//     'pass': 'cool123',
//     'sendImmediately': false
//   },
//   'form' : form
// },function(err,res){
// 	console.log('ERR',err);
// 	console.log('RESSS',res.body)
// })


// request.post(config.OnaApi.livebaseUrl  + '/profiles',{
// 	form : userForm
// },function(err,res){
// 		console.log('ERR',err);
// 		console.log('RESSS',res.body)
// })



// request.get(config.OnaApi.baseUrl + '/dataviews',{
// 	  'auth': {
// 	    'user': 'testman',
// 	    'pass': 'cool123',
// 	    'sendImmediately': false
// 	  }

// },function(err,res){
// 	console.log('ERR',err);
// 	console.log('RESSS',res.body)
// })


request.get(config.OnaApi.livebaseUrl + '/forms/184994',{
	 

},function(err,res){
	console.log('ERR',err);
	console.log('RESSS',res.body)
})

// request.get(config.OnaApi.livebaseUrl + '/forms/184965/form.json',{
	 

// },function(err,res){
// 	console.log('ERR',err);
// 	console.log('RESSS',res.body)
// })

var submit = {

	"id" : "aCBajuCDtdcWz9uXyHGyZ9",
	"submission" : {

		"uploaded_form_sqkuli" : {
			"What_is_this_form_about_" : "interesting",
			
		},
		"meta" : {
			"instanceID" : "uuid:10e9970f84854c55be592d36b31707bb"
		}

		
	}

}

// request.post(config.OnaApi.livebaseUrl + '/submissions',{
// 	 'form' : submit,
// 	 'auth': {
// 	     'user': 'khatramanche',
// 	     'pass': 'cool123',
// 	     'sendImmediately': false
// 	   },
// 	 'headers' : {
// 	 	'Content-Type': 'application/json'
// 	 }

// },function(err,res){
// 	console.log('ERR',err);
// 	console.log('RESSS',res.body)
// })


// request.get(config.OnaApi.livebaseUrl + '/projects/30730/forms',{
	 

// },function(err,res){
// 	console.log('ERR',err);
// 	console.log('RESSS',res.body)
// })