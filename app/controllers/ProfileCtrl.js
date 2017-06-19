"use strict";

app.controller('ProfileCtrl', function($scope, FBAuthFactory, FBDataFactory, $location){

	var user = FBAuthFactory.getUser();
	console.log("user", user);

	$scope.userObj = {
		displayName: "",
		email: ""
	};

	if (user !== null) {
		let displayName = user.displayName;
		let email = user.email;
		let photoUrl = user.photoURL;
		let emailVerified = user.emailVerified;
		let uid = user.uid;
	}

});