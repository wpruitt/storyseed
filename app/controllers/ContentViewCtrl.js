"use strict";

app.controller('ContentViewCtrl', function($scope, FBAuthFactory, FBDataFactory, $location, $routeParams, $route){


	let currentUser = FBAuthFactory.getUser();

	FBDataFactory.getContent($routeParams.contentId)
		.then((content) => {
			$scope.content = content;
			// console.log("content", $scope.content);
		});

	FBDataFactory.getBranches($routeParams.contentId)
		.then((contentData) => {
			$scope.branches = contentData;
			// console.log("branches", $scope.branches);
		})
		.catch((error) => {
			console.log("error",error);
		});

	let objHasBranches = (obj) => {
		for(var key in obj) {
			if(obj.hasOwnProperty(key))
				return true;
		}
		return false;
	};

		$scope.changeDetected = false;
	$scope.editorCreated = function(editor) {
		console.log(editor);
	};
	$scope.contentChanged = function (editor, html,text) {
		$scope.changeDetected = true;
		console.log('editor: ', editor, 'html: ', html, 'text', text);
	};

	$scope.showDelBtn = function(contentId) {
		console.log("current/content", currentUser, contentId);
		if(currentUser === contentId){
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

	$scope.deleteContent = function(contentId) {
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

