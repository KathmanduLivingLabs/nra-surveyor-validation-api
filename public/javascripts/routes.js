var routes = angular.module('nraAdmin.routes',[]);

routes.config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home',{
            url : '/home',
            templateUrl : '/template/home',
        })
        .state('login',{
            url : '/login',
            templateUrl : '/template/login',
            controller : 'loginController'
        })
        .state('dash',{
            url : '/dash',
            templateUrl : '/template/dash',
            controller : 'dashController',
            params : {
                authenticated : null
            }
        })


}]);