"use strict";

app.controller('LoginCtrl', function($scope, FBAuthFactory, FBDataFactory, $location) {

	// if(FBAuthFactory.isAuthenticated()) {
	// 	$location.url('/explore');
	// }

	$scope.login = function() {
		FBAuthFactory.FBLoginUser($scope.obj.email, $scope.loginPassword)
		.then((loginData) => {
			console.log('loginData', loginData);
			$location.url("/explore");
		})
		.catch((error) =>{
			console.log("loginError", error);
		});
	};

});