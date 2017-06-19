"use strict";

const app = angular.module('StorySeedApp', ["ngRoute"]);

let isAuth = (AuthFactory) => new Promise((resolve, reject) => {
	AuthFactory.isAutheticated() 
	.then((userExists) => {
		if(userExists){
			console.log("Authenticated, go ahead");
			resolve();
		}else {
			console.lgo("Authentication reject, GO AWAY");
			reject();
		}
	});
});

app.config(($routeProvider) => {
	$routeProvider
	.when('/', {
		templateUrl: 'partials/Login.html',
		controller: 'LoginCtrl'
	})
	.when('/login', {
		templateUrl: 'partials/Login.html',
		controller: 'LoginCtrl'
	})
	.when('/register', {
		templateUrl: 'partials/RegisterUser.html',
		controller: 'RegisterUserCtrl'
	})
	.when('/upload', {
		templateUrl: 'partials/Upload.html',
		controller: 'UploadCtrl'/*,
		resolve: {isAuth}*/
	})
	.when('/explore', {
		templateUrl: 'partials/Explore.html',
		controller: 'ExploreCtrl'
	})
	.when('/profile', {
		templateUrl: 'partials/Profile.html',
		controller: 'ProfileCtrl',
		resolve: {isAuth}
	})
	.when('/content-view/:contentId', {
		templateUrl: 'partials/ContentView.html',
		controller: 'ContentView'
	})
	.when('/logout', {
		templateUrl: 'partials/Logout.html',
		controller: 'LogoutCtrl'
	})
	.otherwise('/');
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

	// document.getElementById("StorySeedApp").addEventListener("click", function(event){
	// 	console.log(event);
	// });