module.exports = ["$scope","$mdDialog","$location","imageStore",function($scope,$mdDialog,$location,imageStore){
	// imageStore.user.login("mock@user.com","123456").then((r)=>console.log(r,imageStore.user.isLogged())).catch((r)=>console.log(r));
	// console.log(imageStore.user.isLogged());
	// console.log(imageStore.user.getUser());
	$mdDialog.show({
		controller: ["$scope","$mdDialog",function($scope,$mdDialog){
		  $scope.login = () => {
			  imageStore.user.login($scope.login.email,$scope.login.password).then(
				  (r) => {
					  $mdDialog.hide();
				  }
			  ).catch(
				  (r) => console.log(r.response)
			  );
		  }
		}],
		templateUrl: 'Template/LoginDialog.html',
		parent: angular.element(document.body),
		clickOutsideToClose:false,
		escapeToClose: false,
	}).then(
		() => {
			$location.path("/main");
		}
	);
}];
