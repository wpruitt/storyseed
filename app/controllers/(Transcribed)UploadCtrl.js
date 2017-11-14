"use strict";

// UploadCtrl:
// Manages data binding to upload content
app.controller('UploadCtrl', function($scope, $routeParams, FBDataFactory, FBAuthFactory, $location, $timeout) {

	// Assigns current logged in user to currentUser variable +
	let currentUser = FBAuthFactory.getUser();
	// let quillContent = quill.getContents();
	
	// Content object +
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
		content: "",
		branchIds: ""
	};

	// Placeholder for description/content to explain usage +
	$scope.placeholder = {
		description: `Tell us what your seed will grow into.
Keep in mind that others may take your idea in a different direction.
Explain the theme, identify key characters, initial setting, etc....`,
		content: `Write out your Story here.`
	};

	// Quill -
	$scope.changeDetected = false;
	
	// Quill -
	$scope.editorCreated = function(editor) {
		console.log(editor);
	};
	
	// Quill -
	$scope.contentChanged = function (editor, html,text) {
		$scope.changeDetected = true;
		console.log('editor: ', editor, 'html: ', html, 'text', text);
	};

	// Submits user object via createContent function +
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
				console.log("response", response);
				$location.url("/explore");
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