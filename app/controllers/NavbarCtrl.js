"use strict";

app.controller('NavbarCtrl', function($scope, FBAuthFactory){

	let currentUser = null;
	$scope.isLoggedIn = false;

	firebase.auth().onAuthStateChanged(function(user){
		if (user) {
			console.log("userInfo", user);
			$scope.isLoggedIn = true;
			$scope.currentUser = user;
			console.log("$scope.isLoggedIn", $scope.isLoggedIn);
		}else{
			console.log("no user");
			$scope.isLoggedIn = false;
			console.log("Error-$scope.isLoggedIn", $scope.isLoggedIn);
		}
	});

});