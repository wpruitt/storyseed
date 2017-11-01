"use strict";

// CreateBranch Controller:
// Controller handling DOM <-> DB interactions for CreateBranch page
app.controller('CreateBranchCtrl', function($scope, FBAuthFactory, FBDataFactory, $location, $routeParams, $timeout) {

	// Assigns user data to currentUser variable 
	let currentUser = FBAuthFactory.getUser();

	// Assigns user inputs to scope obj
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

	// Sets placeholders for descriptions and content inputs
	$scope.placeholder = {
		description: `Give a little description of your branch.
Talk about any large changes from your seeded content.`,
		content: "Type out story here."
	};

	// Quill-editor:
	$scope.changeDetected = false;
	$scope.editorCreated = function(editor) {
		console.log(editor);
	};
	$scope.contentChanged = function (editor, html,text) {
		$scope.changeDetected = true;
		console.log('editor: ', editor, 'html: ', html, 'text', text);
	};

	// Submits obj scope to Firebase DB
	$scope.submit = function() {
		FBDataFactory.createContent($scope.obj)
		.then((response) => {
			console.log("$scope.obj", $scope.obj);
			console.log("response", response);
			let idObj = {
				id: response.data.name
			};
			// Adds response id to obj 
			FBDataFactory.addId(response.data.name, idObj)
			.then((response) => {
					console.log("response from addId", response);
					let branchObj = {
					[response.data.id] : $routeParams.contentId
				};
				// Adds branchId to obj then redirects to /explore
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