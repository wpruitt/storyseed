"use strict";

app.controller('UploadCtrl', function($scope, $routeParams, FBDataFactory, FBAuthFactory, $location, $timeout) {

	let currentUser = FBAuthFactory.getUser();
	// let quillContent = quill.getContents();
	
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

	$scope.placeholder = {
		description: `Tell us what your seed will grow into.
Keep in mind that others may take your idea in a different direction.
Explain the theme, identify key characters, initial setting, etc....`,
		content: `Write out your Story here.`
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