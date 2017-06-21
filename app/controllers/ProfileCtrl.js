"use strict";

app.controller('ProfileCtrl', function($scope, FBAuthFactory, FBDataFactory, $location, $route){

	FBAuthFactory.isAuthenticated();

	let profile = "";
	let userKey = "";
	let currentUser = FBAuthFactory.getUser();
	console.log("currentUser", currentUser);

	FBDataFactory.getUser(currentUser.uid)
		.then((userData) => {
			let user = userData;
			console.log("user", user);
			userKey = Object.keys(user.data);
			$scope.profile = user.data[Object.keys(user.data)];
			profile =  user.data[Object.keys(user.data)];
		})
		.then(() => {
			FBDataFactory.getUsersContent(currentUser.uid)
			.then((usersContents) => {
				$scope.usersContents = usersContents.data;
				console.log("usersContent", $scope.usersContents);
			})
			.catch((error) => {
				console.log("error", error);
			});
		})
		.catch((error) => {
			console.log("error", error);
		});

	$scope.editedImage = {
		image: profile.image
	};
	$scope.editedDisplayName = {
		displayName: profile.displayName
	};
	// $scope.editedEmail = {
	// 	email: profile.email
	// };
	$scope.editedBio = {
		bio: profile.bio
	};


	$scope.editProfilePicture = function() {
		console.log("image", $scope.editedImage);
		FBDataFactory.editProfile($scope.editedImage, userKey)
		.then((data) => {
			$route.reload();
		})
		.catch((error) => {
			console.log("error", error);
		});
	};

	$scope.editDisplayName = function() {
		console.log("displayName", $scope.editedDisplayName);
		FBDataFactory.editProfile($scope.editedDisplayName, userKey)
		.then((data) => {
			$route.reload();
		})
		.catch((error) => {
			console.log("error", error);
		});
	};

	// $scope.editemail

	$scope.editBio = function() {
		console.log("bio", $scope.editedBio);
		FBDataFactory.editProfile($scope.editedBio, userKey)
		.then((data) => {
			$route.reload();
		})
		.catch((error) => {
			console.log("error", error);
		});
	};

	$scope.getContent = function(contentId) {
		FBDataFactory.getContent(contentId)
		.then((content) => {
			console.log("content", content);
			$location.url(`content/${content.title}/${content.id}`);
		});
	};
});

