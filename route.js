module.exports = ($routeProvider) => {
	$routeProvider.when("/login", {
		template: "",
		controller: "Login"
	}).when("/main",{
		template: "junda",
		controller: "Main"
	}).otherwise({redirectTo:'/main'});
};
