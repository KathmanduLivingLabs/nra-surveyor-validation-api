var appDependencies = [
	'ui.router',
	'nraAdmin.routes'
]

angular.module('nraAdmin',appDependencies)

.controller('loginController',function($state,$scope,$http){

	$scope.credentials = {};
	$scope.login = function(){
		$http.post('/api/v1/admin/login',$scope.credentials).
		then(function(response){
			if(response.data.success){
				$state.go('dash',{authenticated:true});
			}else{
				alert('User not validated !')
			}
		})
		.catch(function(err){
			alert(err);
		})


	}
})

.controller('dashController',function($state,$scope,$http,$stateParams){
	
	if(!$stateParams.authenticated){
		$state.go('login');
	}else{

		$http.get('/api/v1/admin/surveyors/list').
		then(function(response){
			console.log(response)
			if(response.data.success){
				$scope.surveyorsList = response.data.surveyors;
			}
		})
		.catch(function(err){
			alert(JSON.stringify(err));
		})
	}

	$scope.editNumber = function(surveyor){
		var number = prompt("Please enter the number to update for " +surveyor.name);

		if(!number){
			return;
		}
		
		if(isNaN(number) || number.length<10){
			return alert("Must be a valid number")
		}

		var updateOptions = {
			number : number,
			localdbId : surveyor.id
		}

		$http
			.post('/api/v1/surveyor/update',updateOptions)
			.then(function(updateresponse){
				alert(JSON.stringify(updateresponse));
				surveyor.mobile = number;

			})
			.catch(function(err){
				alert(JSON.stringify(err));
			})
	}



	
})

.controller('registrationController',function($scope,$window,$state,$http){

	if($window.localStorage.nraToken){

		$http.get('/api/v1/onaaccounts/list',{
			headers : {
				'Authorization' : 'Auth ' + $window.localStorage.nraToken
			}
		}).
		then(function(response){
			console.log(response)
			if(response.data.success){
				$scope.surveyorOnaAccounts = response.data.surveyors;
			}
			
		})
		.catch(function(err){
			alert(JSON.stringify(err));
		})


	}else{
		alert('Token Not Found !');
		$state.go('login');
	}


	$scope.registerOna = function(onaaccount){

		var createOptions = {

			username : onaaccount.username,
			first_name : onaaccount.first_name,
			last_name : onaaccount.last_name,
			email : onaaccount.email,
			password : onaaccount.hash

		}

		$http
			.post('/api/v1/onaaccounts/surveyor/create/server',createOptions,{
			headers : {
				'Authorization' : 'Auth ' + $window.localStorage.nraToken
			}
		})
			.then(function(updateresponse){
				alert(JSON.stringify(updateresponse));

			})
			.catch(function(err){
				alert(JSON.stringify(err));
			})

	}

})