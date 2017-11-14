"use strict";

const app = angular.module("StorySeedApp", ["ngRoute", "ngQuill", "ngSanitize"]);

// 
let isAuth = (FBAuthFactory) => new Promise((resolve, reject) => {
	FBAuthFactory.isAuthenticated() 
	.then((userExists) => {
		if(userExists){
			console.log("Authenticated, go ahead", userExists);
			resolve();
		}else {
			console.log("Authentication reject, GO AWAY");
			reject();
		}
	});
});

app.config(($routeProvider) => {
	$routeProvider
	.when("/", {
		templateUrl: "partials/Login.html",
		controller: "LoginCtrl"
	})
	.when("/login", {
		templateUrl: "partials/Login.html",
		controller: "LoginCtrl"
	})
	.when("/register", {
		templateUrl: "partials/RegisterUser.html",
		controller: "RegisterUserCtrl"
	})
	.when("/upload", {
		templateUrl: "partials/Upload.html",
		controller: "UploadCtrl",
		resolve: {isAuth}
	})
	.when("/createbranch/:contentId", {
		templateUrl: "partials/CreateBranch.html",
		controller: "CreateBranchCtrl",
		resolve: {isAuth}
	})
	.when("/explore", {
		templateUrl: "partials/Explore.html",
		controller: "ExploreCtrl"
	})
	.when("/profile/:userId", {
		templateUrl: "partials/Profile.html",
		controller: "ProfileCtrl",
		resolve: {isAuth}
	})
	.when("/content/:contentTitle/:contentId", {
		templateUrl: "partials/ContentView.html",
		controller: "ContentViewCtrl"
	})
	.when("/logout", {
		templateUrl: "partials/Logout.html",
		controller: "LogoutCtrl"
	})
	.otherwise("/");
});

	app.config((ngQuillConfigProvider) => {
		ngQuillConfigProvider.set();
	});

	app.run(( FBCreds) => {
	let creds = FBCreds;
	let authConfig = {
		apiKey: creds.apiKey,
		authDomain: creds.authDomain,
		databaseURL: creds.databaseURL
	};

	firebase.initializeApp(authConfig);
});

	Quill.registerModule('counter', function(quill, options) {
		var container = document.querySelector('#counter');
		quill.on('text-change', function() {
			var text = quill.getText();
			// There are a couple issues with counting words
			// this way but we'll fix these later
			container.innerHTML = text.split(/\s+/).length;
		});
});

	// document.getElementById("StorySeedApp").addEventListener("click", function(event){
	// 	console.log(event);
	// });