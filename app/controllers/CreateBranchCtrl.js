"use strict";

app.controller('CreateBranchCtrl', function($scope, FBAuthFactory, FBDataFactory, $location, $routeParams, $timeout) {

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
		seedId: $routeParams.contentId,
		content: ""
	};

	$scope.placeholder = {
		description: `Give a little description of your branch.
Talk about any large changes from your seeded content.`,
		content: "Type out story here."
	};

	$scope.changeDetected = false;
	$scope.editorCreated = function(editor) {
		console.log(editor);
	};
	$scope.contentChanged = function (editor, html,text) {
		$scope.changeDetected = true;
		console.log('editor: ', editor, 'html: ', html, 'text', text);
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