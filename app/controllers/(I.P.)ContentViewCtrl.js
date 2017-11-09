"use strict";

// Controller:
// Controller handling DOM <-> DB interactions for ContentView page
app.controller('ContentViewCtrl', function($scope, FBAuthFactory, FBDataFactory, $location, $routeParams, $route){

	// Assigns user data to currentUser variable
	let currentUser = FBAuthFactory.getUser();

	// Retrieves content specified by contentId in url +
	FBDataFactory.getContent($routeParams.contentId)
		.then((content) => {
			$scope.content = content;
			// console.log("content", $scope.content);
		});

	// Retrieves branches of content
	FBDataFactory.getBranches($routeParams.contentId)
		.then((contentData) => {
			$scope.branches = contentData;
			// console.log("branches", $scope.branches);
		})
		.catch((error) => {
			console.log("error",error);
		});

	// Assigns 
	let objHasBranches = (obj) => {
		for(var key in obj) {
			if(obj.hasOwnProperty(key))
				return true;
		}
		return false;
	};

	// Quill editor:
	$scope.changeDetected = false;
	$scope.editorCreated = function(editor) {
		console.log(editor);
	};
	$scope.contentChanged = function (editor, html,text) {
		$scope.changeDetected = true;
		console.log('editor: ', editor, 'html: ', html, 'text', text);
	};

	// Assigns true/false based on equality of currentUser and content owner
	$scope.showDelBtn = function(contentId) {
		console.log("current/content", currentUser, contentId);
		if(currentUser === contentId){
			return true;
		}else{
			return false;
		}
	};

	// Retrieves content and assigns to scope +
	$scope.getBranch = function(contentId) {
		FBDataFactory.getContent(contentId)
		.then((content) => {
			console.log("content", content);
			$location.url(`content/${content.title}/${content.id}`);
		});
	};

	// Creates branch obj to page content
	$scope.createBranch = function(contentId) {
		$location.url(`/createbranch/${contentId}`);
	};

	// Deletes content/makes content anon
	$scope.deleteContent = function(contentId) {
		// if object has branched content
		// make content anonymous
		if(objHasBranches($scope.branches)) {
			console.log("goanon", true, $scope.branches);
			FBDataFactory.makeContentAnon(contentId)
			.then((response) => {
				$('.modal-backdrop').remove();
				console.log("response", response);
				$route.reload();
			})
			.catch((error) => {
				console.log("error", error);
			});
		// else delete the object
		}else{
			console.log("candel", false);
			FBDataFactory.deleteContent(contentId)
			.then((response) => {
				$('.modal-backdrop').remove();
				console.log("response", response);
				console.log("scope.content.uid", $scope.content.uid);
				if ($scope.content.seedId) {
					$location.url(`/content/${$scope.content.seedId}`);
					$route.reload();
				}else{
					$location.url('/explore');
					$route.reload();
				}
			})
			.catch((error) => {
				console.log("error", error);
			});
		}
	};

	// Removes creator identifier from object
	$scope.makeAnon = function(contentId){
		FBDataFactory.makeContentAnon(contentId)
		.then((response) => {
			console.log("response", response);
			$route.reload();
		})
		.catch((error) => {
			console.log("error", error);
		});
	};

});

	// $scope.moDesc = function(description, event) {
	// 	event.currentTarget.innerHTML = description;
	// };




// iterate though list of objs showing key and value pair
// angular.forEach($scope.branches, function(key, value) {
// 				console.log("key/value", key, value);
// 				FBDataFactory.makeContentAnon()
// 			});

