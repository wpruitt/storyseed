"use strict";

app.factory('FBAuthFactory', function ($location) {

	let currentUser = null;

	let FBRegisterUser = function(email, password) {
		return  firebase.auth().createUserWithEmailAndPassword(email, password)
		.catch(function(error) {
		  	let errorCode = error.code;
		  	let errorMessage = error.message;
  			console.log("error:", errorCode, errorMessage);
		});
	};

	let FBLoginUser = function(email, password) {
		return firebase.auth().signInWithEmailAndPassword(email, password)
		.catch(function(error) {
			let errorCode = error.code;
			let errorMessage = error.message;
			console.log("error:", errorCode, errorMessage);
		});
	};

	let FBLogoutUser = function() {
		return firebase.auth().signOut()
		.then(function() {
			$location.url("/explore");
		})
		.catch(function(error) {
  			let errorCode = error.code;
  			let errorMessage = error.message;
  			console.log("error:", errorCode, errorMessage);
  		});	
	};

	let isAuthenticated = function (){
		return new Promise ((resolve,reject) => {
			firebase.auth().onAuthStateChanged(function(user) {
		 		if (user) {
		 			currentUser = user;
		  			console.log("user", user);
		  			resolve(true);
				} else {
					resolve(false);
				}
			});
		});

	};

	let getUser = function(){
		return currentUser;
	};

	return {FBRegisterUser, FBLoginUser, FBLogoutUser, isAuthenticated, getUser};
});