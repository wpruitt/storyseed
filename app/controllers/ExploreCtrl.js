"use strict";

app.controller('ExploreCtrl', function($scope, FBAuthFactory, FBDataFactory, $location){

	FBDataFactory.getAllContent()
		.then((contents) => {
			$scope.contents = contents;
			console.log("contents", $scope.contents);
		});

	$scope.getContent = function(contentId) {
		FBDataFactory.getContent(contentId)
		.then((content) => {
			console.log("content", content);
			$location.url(`content/${content.title}/${content.id}`);
		});
	};
});