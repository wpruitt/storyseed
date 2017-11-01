"use strict";

// Navbar Controller:
// Controller handling DOM <-> DB interactions for Navbar
app.controller('NavbarCtrl', function($scope, FBAuthFactory){

	// sets currentUser variable to null
	let currentUser = null;
	// assigns isLoggedIn scope to false
	$scope.isLoggedIn = false;

	// On auth state change (login/logout) 
	firebase.auth().onAuthStateChanged(function(user){
		// if user exists, assigns isLoggedIn scope
		// and user data to currentUser scope -- ?
		if (user) {
			console.log("userInfo", user);
			$scope.isLoggedIn = true;
			$scope.currentUser = user;
			console.log("$scope.isLoggedIn", $scope.isLoggedIn);
		// else isLoggedIn scope set to false
		}else{
			console.log("no user");
			$scope.isLoggedIn = false;
			console.log("Error-$scope.isLoggedIn", $scope.isLoggedIn);
		}
	});

});