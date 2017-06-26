"use strict";

app.controller('LogoutCtrl', function(FBAuthFactory, $location) {

	FBAuthFactory.FBLogoutUser()
	.then((data) => {
		console.log("data", data);
		$location.url('!#/explore');
		console.log("currentUser", FBAuthFactory.isAuthenticated());
	})
	.catch((data) => {
		console.log("data", data);
		$location.url('!#/explore');
	});

});