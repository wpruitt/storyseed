"use strict";

app.controller('LoginCtrl', function($scope, FBAuthFactory, FBDataFactory, $location, $route) {

	if(!FBAuthFactory.isAuthenticated()) {
		$location.url('/explore');

	}

	$scope.login = function() {
		FBAuthFactory.FBLoginUser($scope.obj.email, $scope.loginPassword);
	};

	firebase.auth().onAuthStateChanged(user => {
		if(user) {
			$location.url('/explore');
			$route.reload();
		}
	});

});