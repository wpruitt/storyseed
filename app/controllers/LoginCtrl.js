"use strict";

// Login Controller:
// Controller handling DOM <-> DB interactions for login page
app.controller('LoginCtrl', function($scope, FBAuthFactory, FBDataFactory, $location, $route) {

	// On page load
	// if user is not logged in redirect to /explore
	if(!FBAuthFactory.isAuthenticated()) {
		$location.url('/explore');

	}

	// Takes user input (email/password) to login to Firebase
	$scope.login = function() {
		FBAuthFactory.FBLoginUser($scope.obj.email, $scope.loginPassword);
	};

	// On authroization state change
	firebase.auth().onAuthStateChanged(user => {
		// if user exists redirect to /explore
		if(user) {
			$location.url('/explore');
			$route.reload();
		}
	});

});