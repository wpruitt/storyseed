"use strict";

app.controller('ExploreCtrl', function($scope, FBAuthFactory, FBDataFactory, $location){

	FBDataFactory.getAllContent()
		.then((contents) => {
			$scope.contents = contents;
			console.log("contents", $scope.contents);
		});
});