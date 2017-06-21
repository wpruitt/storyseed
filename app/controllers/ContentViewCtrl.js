"use strict";

app.controller('ContentViewCtrl', function($scope, FBAuthFactory, FBDataFactory, $location, $routeParams){

	let currentUser = FBAuthFactory.getUser();

	FBDataFactory.getContent($routeParams.contentId)
		.then((content) => {
			$scope.content = content;
			console.log("content", $scope.content);
		});

	FBDataFactory.getBranches($routeParams.contentId)
		.then((contentData) => {
			$scope.branches = contentData;
			console.log("branches", $scope.branches);
		})
		.catch((error) => {
			console.log("error",error);
		});

	$scope.showDelBtn = function(contentId) {
		console.log("current/content", currentUser.uid, contentId);
		if(currentUser.uid === contentId){
			return true;
		}else{
			return false;
		}
	};

	$scope.getBranch = function(contentId) {
		FBDataFactory.getContent(contentId)
		.then((content) => {
			console.log("content", content);
			$location.url(`content/${content.title}/${content.id}`);
		});
	};

	$scope.createBranch = function(contentId) {
		$location.url(`/createbranch/${contentId}`);
	};

	$scope.deletContent = function(contentId) {
		FBDataFactory.getContent
	};
});