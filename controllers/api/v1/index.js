var smsFlier = require('../../../libs/smsflier');
var xmlParser = require('../../../libs/xlsparser');
var mw = require('../../../libs/middleware');

module.exports = (router) => {

	router.get('/api/v1/user/validate', function(req, res) {

		var mobile = req.query.mobile;

		surveyors.findOne({
		    where : {
		        mobile: {
		                $like: '%'+mobile+'%'
		        }
		    }
		})
		.then(function(response){
			res.status(200).json({
				message: "User validation success  for user " + response['name']
			})
		})
		.catch(function(err){
			console.log(err)
			res.status(200).json({
				message: "User validation failed !"
			})
		})



		// console.log('NEW REQUESTT ***************')

		// console.log(req.body)

		// console.log(req.params)

		// console.log(req.query)

		// res.status(200).json({
		// 	message: "FIne !"
		// })

		// var numbers = [ 9841834495 ];

		// smsFlier.send(numbers,'For login');


	});

	// router.post('/api/v1/surveyor/create', function(req, res) {

	// 	var surveyorsList = xmlParser.parse();

	// 	function promiseGenerator(surveyor) {
	// 		return new Promise(function(resolve, reject) {
	// 			surveyors.create(surveyor)
	// 				.then(function(res) {
	// 					resolve(res);
	// 				})
	// 				.catch(function(err) {
	// 					reject(err);
	// 				})
	// 		})
	// 	}


	// 	var promises = [];
	// 	surveyorsList.forEach(function(surveyor) {
	// 		promises.push(promiseGenerator(surveyor));

	// 	})

	// 	Promise.all(promises)
	// 		.then(function(response) {
	// 			res.json({
	// 				success: 1
	// 			})
	// 		})
	// 		.catch(function(err) {
	// 			res.json({
	// 				error: err
	// 			})
	// 		})

	// })

}