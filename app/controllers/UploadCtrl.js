"use strict";

app.controller('UploadCtrl', function($scope, $routeParams, FBDataFactory, FBAuthFactory, $location) {

	let currentUser = FBAuthFactory.getUser();

	$scope.obj = {
		uid: currentUser,
		type: "",
		title: "",
		description: "",
		image: "",
		genre: ["test1", "test2"],
		tags: ["test1", "test2"],
		NSFW: false,
		seedId: "",
		content: ""
	};

	$scope.submit = function() {
		FBDataFactory.createContent($scope.obj)
		.then((response) => {
			console.log("$scope.obj", $scope.obj);
			console.log("response", response);
			$location.url("/explore");
		})
		.catch((error) => {
				console.log("Error:", error);
		});
	};
});