"use strict";

app.controller('LogoutCtrl', function(FBAuthFactory, $location, $route) {

	if(!FBAuthFactory.isAuthenticated()) {
		$location.url('/explore');
	}

	FBAuthFactory.FBLogoutUser()
	.then((data) => {
		console.log("data", data);
		$location.url('/explore');
		$route.reload();
		console.log("currentUser", FBAuthFactory.isAuthenticated());
	})
	.catch((data) => {
		console.log("data", data);
		$location.url('/explore');
		$route.reload();
	});

});