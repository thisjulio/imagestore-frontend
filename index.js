const angular = require("angular");
const angularAria = require("angular-aria");
const angularAnimate = require("angular-animate");
const angularMaterial = require("angular-material");
const angularRoute = require("angular-route");

const app = angular.module("imageStore",[angularMaterial,angularRoute]);

app.config(["$routeProvider",($routeProvider)=>{
	require("./route")($routeProvider);
}]);

app.run(["$rootScope","$location","imageStore",function($rootScope,$location,imageStore){
	$rootScope.$on("$routeChangeStart", function (event, next, current) {
		if(!imageStore.user.isLogged()) $location.path("/login");
		else if($location.path() == "/login") $location.path("/main");
	});
}]);

app.controller("Main",require("./Controller/Main"));
app.controller("Login",require("./Controller/Login"));

app.factory('imageStore',require("./Service/imageStore"));
