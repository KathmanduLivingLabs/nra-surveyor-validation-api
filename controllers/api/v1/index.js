var smsFlier = require('../../../libs/smsflier');
var xmlParser = require('../../../libs/xlsparser');
var mw = require('../../../libs/middleware');
var OnaAdapter = require('./onaadapter');
var passwordGenerator = require('../../../libs/passwordgen');
var crypt = require('../../../libs/crypt');
var request = require('request');
var config = require('../../../config');

module.exports = (router) => {

	router.get('/api/v1/user/validate', function(req, res, next) {

		console.log('&&&&')

		console.log(req.query)

		// req.query.from = "9841834495";


		if (req.query && req.query.from) {

			var mobile = req.query.from.split('+977')[1];

			if(!mobile || mobile.length<10){
				return res.status(200).send("Mobile number is not valid");
			}

			var imei = req.query.text ? req.query.text.split(' ')[1] : ' ' ;
			console.log('IMEI',imei);

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
						var userName = 'nra' + req.surveyor.mobile.split(' ')[0];
						// var userName = "nrasurveyor" + "12234556784"

						onaaccounts.findOne({
							where : {
								username : userName
							}
						})
						.then(function(existingUser){
							if(existingUser){
								res.status(200).send("validated  " + existingUser['first_name'] + " " + existingUser['last_name'] + ". Login Credentials - Username : " + existingUser.username + " , Password : " + crypt.decrypt(existingUser.hash) );
							}else{

								var name = req.surveyor.name.split(' ');

								var userForm = {
									username: userName,
									password: createdPassword,
									first_name: name[0],
									last_name: name[1],
									email: 'kathmandulivinglabs+' + userName + '@gmail.com'
								}

								// console.log('YOYO',userForm);

								request.post(config.OnaApi.livebaseUrl + '/profiles', {
									form: userForm
								}, function(err, responseona) {
									// console.log('ERR',err)
									// console.log('NICCIE', responseona.body)
									// console.log('err', err)
									// console.log('BODY',responseona)
									if (err) {
										res.status(200).send("There was an error while creating account");
									} else {

										if(responseona && responseona.body){

											// console.log('RARAR',responseona.body)
											req.surveyorInfo = {};
											req.surveyorInfo.surveyorID = JSON.parse(responseona.body).id;
											// console.log('VALUUUUUU*********',responseona.body.id, '^^^^',JSON.parse(responseona.body).id)
											req.surveyorInfo.createdPassword = createdPassword;
											req.surveyorInfo.username = userName;

											console.log('MAATHI',req.surveyorInfo)


											var onaaccount = {
												ona_id: Number(req.surveyorInfo.surveyorID),
												username: req.surveyorInfo.username,
												hash: crypt.encrypt(req.surveyorInfo.createdPassword),
												first_name: userForm.first_name,
												last_name: userForm.last_name,
												email: userForm.email,
												imei : imei

											}
											
											onaaccounts.create(onaaccount)

												.then(function(responseaccountcreate) {

													if(responseaccountcreate){

														var form = {
															role: 'dataentry',
															username: userName
														}

														request.put(config.OnaApi.livebaseUrl + '/projects/'+config.OnaApi.projectID+'/share', {
															'auth': {
																'user': config.OnaApi.credentials.user,
																'pass': config.OnaApi.credentials.pass
															},
															'form': form
														}, function(err, responseprojectshare) {
															if (err) {
																res.status(200).send("There was an error while assigning form");
															}else{

																res.status(200).send("validated  " + req.surveyor['name'] + ". Login Credentials - Username : " + req.surveyorInfo.username + " , Password : " + req.surveyorInfo.createdPassword);

															}

															

														})

													}else{
														res.status(200).send("There was an error while creating db account");
													}
													
													

													
												})
												.catch(function(err) {
													// console.log('NNNI',err)
													res.status(200).send("There was an error while creating db account");
												})


										}else{
											res.status(200).send("There was an error while creating account");
										}

										

									}

								})
							}

						})
						.catch(function(erruser){
							res.status(200).send("There was an error  in validation ");
						})

						


					} else {
						res.status(200).send("Your number is not registered. Please contact KLL.")
					}

				})
				.catch(function(err) {
					console.log(err)
					res.status(200).send("Your number is not registered. Please contact KLL.")
				})


		} else {
			res.status(200).send("Your number is not registered. Please contact KLL.")
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


	}, OnaAdapter.createUser, function(req, res, next) {

		res.status(200).send("User validation success  for user " + req.surveyor['name'] + "Login Credentials - Username : " + req.surveyor.username + " , Password : " + req.surveyor.createdPassword);



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


	router.post('/api/v1/surveyor/update', function(req, res) {

		var number = req.body.number;
		var localdbId = req.body.localdbId;

		if(!number || !localdbId){
			return res.json({
					success: 0,
					message : 'No localdbId or number provided'
				})
		}else{
			surveyors.update({
				mobile : number
			},{
				where : {
					id : localdbId
				}
			})
			.then(function(updateresponse){
				console.log(updateresponse)
				if(updateresponse){
					res.json({
						success: 1,
						message : updateresponse
					})
				}
			})
			.catch(function(err){
				res.json({
					error: err
				})
			})
		}

		

	})


	router.get('/api/v1/surveyors/list', function(req, res) {

		var authorizationHeader = req.headers.authorization.split(' ')[1];

		if(authorizationHeader && authorizationHeader === config.authorizationHeader){

			surveyors.findAll()
			.then(function(surveyorsList){
				res.json({
					success: 1,
					surveyors : surveyorsList
				})
			})
			.catch(function(err){
				res.json({
					error: err
				})
			})


		}else{
			return res.json({
				error: 'No authorization header present'
			})
		}

	})
	

	router.get('/api/v1/onaaccounts/list', function(req, res) {

		var authorizationHeader = req.headers.authorization.split(' ')[1];

		if(authorizationHeader && authorizationHeader === config.authorizationHeader){

			onaaccounts.findAll()
			.then(function(onaAccountList){
				onaAccountList.forEach(function(onaaccount){
					onaaccount.hash = crypt.decrypt(onaaccount.hash);
				})
				res.json({
					success: 1,
					surveyors : onaAccountList
				})
			})
			.catch(function(err){
				res.json({
					error: err
				})
			})

		}else{

			return res.json({
				error: 'No authorization header present'
			})

		}

	})


	router.post('/api/v1/onaaccounts/surveyor/create/server',function(req,res){

		

		var authorizationHeader = req.headers.authorization.split(' ')[1];

		if(authorizationHeader && authorizationHeader === config.authorizationHeader){

			var userForm = {
				username: req.body.username,
				password: req.body.password,
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				email: req.body.email
			};

			request.post(config.nraOna.url + '/profiles', {
				form: userForm
			}, function(err, responseona) {

				if (err) {
					return res.json({
						success: 0,
						error: 'Error creating account NRA Ona Core'
					})
				} else {

					if (responseona && responseona.body) {

						var form = {
							role: 'dataentry',
							username: req.body.username
						}

						request.put(config.nraOna.url + '/projects/' + config.nraOna.projectID + '/share', {
							'auth': {
								'user': config.nraOna.credentials.user,
								'pass': config.nraOna.credentials.pass
							},
							'form': form
						}, function(err, responseprojectshare) {
							if (err) {
								return res.json({
									success: 0,
									error: 'Error assigning to project '
								})
							} else {

								return res.json({
									success: 1,
									message: 'Successfully created account in NRA Ona Core'
								})

							}



						})



					} else {
						return res.json({
							success: 0,
							error: 'Error creating account in NRA Ona Core '
						})
					}



				}

			})

			

		}else{

			return res.json({
				error: 'No authorization header present'
			})

		}


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