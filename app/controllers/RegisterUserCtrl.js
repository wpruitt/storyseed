"use strict";

// RegisterUserCtrl:
// Controller handling DOM <-> DB interactions for registering a user
app.controller('RegisterUserCtrl', function($scope, FBAuthFactory, FBDataFactory, $location, $route){

	// Verifies if user is already logged in and sends to explore page
	if(FBAuthFactory.isAuthenticated()) {
		$location.url('#!/explore');
	}

	// Binding of regstrations object
	$scope.obj = {
		displayName: "",
		email: "",
		image: "",
		bio: ""
	};

	// Sends user registrations object to Firebase
	$scope.register = function() {
		FBAuthFactory.FBRegisterUser($scope.obj.email, $scope.registerPassword)
		.then((regData) => {
			console.log("regData", regData);
			$scope.obj.uid = regData.uid;
			console.log("$scope.obj", $scope.obj);
			FBDataFactory.createUser($scope.obj)
			.then((userData) => {
				console.log("userData", userData);
				$location.url("/explore");
			});
		})
		.catch((error) => {
			console.log("registerError", error);
		});
	};

	
});