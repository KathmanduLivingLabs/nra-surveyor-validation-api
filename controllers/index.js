var config = require('../config');

module.exports = (router)=>{

	router.get('/',(req,res)=>{

		// res.send('Welcome to NRA SMS Validator API');
		res.render('layout');

		
	})


	router.get('/template/:template',function(req,res){
	   switch(req.params.template){
	       case 'login' :
	           res.render('login');
	           break;
	       case 'dash' :
	           res.render('dash');
	           break;
	       case 'home' :
	           res.render('home');
	           break;
	       case 'register' :
	           res.render('register');
	           break;
	       default :

	   }
	});

	router.post('/api/v1/admin/login',function(req,res){
		
		if(req.body.username === config.admin.username && req.body.password === config.admin.password){
			res.json({
				success : 1
			})
		}else{
			res.json({
				success : 0
			})
		}

	});


	router.get('/api/v1/admin/surveyors/list',function(req,res){

		surveyors.findAll()
			.then(function(surveyors){
				res.json({
					success : 1,
					surveyors : surveyors
				})
			})
			.catch(function(err){
				res.json({
					success : 0
				})
			})

	})
}