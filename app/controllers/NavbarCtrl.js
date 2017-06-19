"use strict";

app.controller('NavbarCtrl', function($scope, FBAuthFactory){

	FBAuthFactory.isAuthenticated()
	.then((user) => {
		console.log("userInfo", user);
		$scope.login = "Logout";
		$scope.isLoggedIn = true;
		console.log("$scope.login", $scope.login);
	})
	.catch((error) => {
		console.log("userError", error);
		$scope.login = "Login";
		$scope.isLoggedIn = false;
		console.log("$scope.login", $scope.login);
	});


});