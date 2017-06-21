"use strict";

app.controller('ContentViewCtrl', function($scope, FBAuthFactory, FBDataFactory, $location, $routeParams){

	let currentUser = FBAuthFactory.getUser();

	FBDataFactory.getContent($routeParams.contentId)
		.then((content) => {
			$scope.content = content;
			console.log("content", $scope.content);
		});

	$scope.showDelBtn = function(contentId) {
		console.log("current/content", currentUser.uid, contentId);
		if(currentUser.uid === contentId){
			return true;
		}else{
			return false;
		}
	};

	$scope.createBranch = function(contentId) {
		$location.url(`/createbranch/${contentId}`);
	};

	$scope.deletContent = function(contentId) {
	};
});