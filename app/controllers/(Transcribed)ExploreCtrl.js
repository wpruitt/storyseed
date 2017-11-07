"use strict";

// Explore Controller:
// Controller handling DOM <-> DB interactions for explore page
app.controller('ExploreCtrl', function($scope, FBAuthFactory, FBDataFactory, $location){

	// assign user data to currentUser
	let currentUser = FBAuthFactory.getUser();

	// Retrieve all available content and assign to scope +
	FBDataFactory.getAllContent()
		.then((contents) => {
			$scope.contents = contents;
			console.log("contents", $scope.contents);
		});

	// Retrieve content of specified contentId +
	$scope.getContent = function(contentId) {
		FBDataFactory.getContent(contentId)
		.then((content) => {
			console.log("content", content);
			$location.url(`content/${content.title}/${content.id}`);
		});
	};
});