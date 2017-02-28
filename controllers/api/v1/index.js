var smsFlier = require('../../../libs/smsflier');
var xmlParser = require('../../../libs/xlsparser');
var mw = require('../../../libs/middleware');
var OnaAdapter = require('./onaadapter');
var passwordGenerator = require('../../../libs/passwordgen');
var request = require('request');
var config = require('../../../config');

module.exports = (router) => {

	router.get('/api/v1/user/validate', function(req, res, next) {

		console.log('&&&&')

		console.log(req.query)


		if (req.query && req.query.from) {

			var mobile = req.query.from.split('+977')[1];

			surveyors.findOne({
					where: {
						mobile: {
							$like: '%' + mobile + '%'
						}
					}
				})
				.then(function(response) {

					// console.log('&&&&',response)
					if (response) {
						req.surveyor = response;
						var createdPassword = passwordGenerator.generate();
						// var userName = 'nrasurveyor' + req.surveyor.mobile.split(' ')[0];
						var userName = "nrasurveyor" + new Date().getTime();
						var name = req.surveyor.name.split(' ');

						var userForm = {
							username: userName,
							password: createdPassword,
							first_name: name[0],
							last_name: name[1],
							email: 'kathmandulivinglabs+' + userName + '@gmail.com'
						}

						// console.log('YOYO',userForm);

						request.post('https://api.ona.io/api/v1'+ '/profiles', {
							form: userForm
						}, function(err, responseona) {
							// console.log('ERR',err)
							console.log('NICCIE',responseona.body)
							console.log('err',err)
							// console.log('BODY',responseona)
							if(err) {
								res.status(200).send("The user could not be validated !");
							}

							if (responseona && responseona.body && responseona.body.id) {
								console.log('FINNEE',responseona.body)
								req.surveyor.surveyorID = responseona.body.id;
								req.surveyor.createdPassword = createdPassword;
								req.surveyor.username = userName;

								res.status(200).send("User validation success  for user " + req.surveyor['name'] + "Login Credentials - Username : " + req.surveyor.username + " , Password : " + req.surveyor.createdPassword );
							}else{
								res.status(200).send("The user could not be validated !");
							}

							

						})


					} else {
						res.status(200).send("The user could not be validated !")
					}

				})
				.catch(function(err) {
					console.log(err)
					res.status(200).send("User validation failed !")
				})


		} else {
			res.status(200).send("The user could not be validated !")
		}



		// console.log('NEW REQUESTT ***************')

		// console.log(req.body)

		// console.log(req.params)

		// console.log(req.query)

		// res.status(200).json({
		// 	message: "FIne !"
		// })

		// var numbers = [ 9841834495 ];

		// smsFlier.send(numbers,'For login');


	},OnaAdapter.createUser,function(req,res,next){

		res.status(200).send("User validation success  for user " + req.surveyor['name'] + "Login Credentials - Username : " + req.surveyor.username + " , Password : " + req.surveyor.createdPassword );



	});

	router.post('/api/v1/surveyor/create', function(req, res) {

		var surveyorsList = xmlParser.parse();

		function promiseGenerator(surveyor) {
			return new Promise(function(resolve, reject) {
				surveyors.create(surveyor)
					.then(function(res) {
						resolve(res);
					})
					.catch(function(err) {
						reject(err);
					})
			})
		}


		var promises = [];
		surveyorsList.forEach(function(surveyor) {
			promises.push(promiseGenerator(surveyor));

		})

		Promise.all(promises)
			.then(function(response) {
				res.json({
					success: 1
				})
			})
			.catch(function(err) {
				res.json({
					error: err
				})
			})

	})

}


// { to: '32200',
// 2017-02-27T13:25:13.369213+00:00 app[web.1]:   smsc: '',
// 2017-02-27T13:25:13.369214+00:00 app[web.1]:   from: '+9779841834495',
// 2017-02-27T13:25:13.369215+00:00 app[web.1]:   keyword: 'kll',
// 2017-02-27T13:25:13.369215+00:00 app[web.1]:   text: 'kll trying' }


// RESSS {
// 	"id": 24139,
// 	"is_org": false,
// 	"url": "https://api.ona.io/api/v1/profiles/khatramanchema",
// 	"username": "khatramanchema",
// 	"first_name": "Khatra",
// 	"last_name": "Manche",
// 	"city": "",
// 	"country": "",
// 	"organization": "",
// 	"website": "",
// 	"twitter": "",
// 	"gravatar": "https://secure.gravatar.com/avatar/176b886340323bdf9e3dcc65e3599da8?s=60&d=https%3A%2F%2Fona.io%2Fstatic%2Fimages%2Fdefault_avatar.png",
// 	"require_auth": false,
// 	"user": "https://api.ona.io/api/v1/users/khatramanchema",
// 	"metadata": {},
// 	"joined_on": "2017-02-27T13:34:08.477Z",
// 	"name": "Khatra Manche",
// 	"account_info": null,
// 	"private_forms": 0,
// 	"private_projects": 0,
// 	"monthly_submissions": 0
// }