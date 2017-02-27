var smsFlier = require('../../../libs/smsflier');
var mw = require('../../../libs/middleware');

module.exports = (router) =>{

	router.get('/api/v1/user/validate',function(req,res){


		console.log('NEW REQUESTT ***************')

		console.log(req.body)

		console.log(req.params)

		console.log(req.query)

		res.status(200).json({message:"FIne !"})

		// var numbers = [ 9841834495 ];

		// smsFlier.send(numbers,'For login');


	})
}