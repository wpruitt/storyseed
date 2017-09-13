"use strict";

app.controller('RegisterUserCtrl', function($scope, FBAuthFactory, FBDataFactory, $location, $route){

	if(FBAuthFactory.isAuthenticated()) {
		$location.url('#!/explore');
	}

	$scope.obj = {
		displayName: "",
		email: "",
		image: "",
		bio: ""
	};

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