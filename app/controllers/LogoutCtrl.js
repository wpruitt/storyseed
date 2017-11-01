"use strict";

// Logout Controller:
// Controller handling DOM <-> DB interactions for logout page
app.controller('LogoutCtrl', function(FBAuthFactory, $location, $route) {

	// on page load
	// if user is not logged in, redirect to /explore
	if(!FBAuthFactory.isAuthenticated()) {
		$location.url('/explore');
	}

	// Log user out and redirect to /explore
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