"use strict";

app.controller('ContentViewCtrl', function($scope, FBAuthFactory, FBDataFactory, $location, $routeParams){


	FBDataFactory.getContent($routeParams.contentId)
		.then((contents) => {
			$scope.contents = contents;
			console.log("contents", $scope.contents);
		});
});