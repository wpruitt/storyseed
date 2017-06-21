"use strict";

app.controller('CreateBranchCtrl', function($scope, FBAuthFactory, FBDataFactory, $location, $routeParams) {

	let currentUser = FBAuthFactory.getUser();

	$scope.obj = {
		uid: currentUser.uid,
		type: "",
		title: "",
		description: "",
		image: "",
		genre: ["test1", "test2"],
		tags: ["test1", "test2"],
		NSFW: false,
		seedId: $routeParams.contentId,
		content: ""
	};

	$scope.submit = function() {
		FBDataFactory.createContent($scope.obj)
		.then((response) => {
			console.log("$scope.obj", $scope.obj);
			console.log("response", response);
			let idObj = {
				id: response.data.name
			};
			FBDataFactory.addId(response.data.name, idObj)
			.then((response) => {
					console.log("response from addId", response);
					let branchObj = {
					[response.data.id] : $routeParams.contentId
				};
				FBDataFactory.addBranchId($routeParams.contentId, branchObj)
				.then((response) => {
					$location.url("/explore");
				})
				.catch((error) => {
					console.log("error", error);
				});
			})
			.catch((error) => {
				console.log("error", error);
			});
		})
		.catch((error) => {
				console.log("Error:", error);
		});
	};
});