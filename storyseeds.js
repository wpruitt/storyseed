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

;
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

});;
"use strict";

app.controller('ExploreCtrl', function($scope, FBAuthFactory, FBDataFactory, $location){

	let currentUser = FBAuthFactory.getUser();

	FBDataFactory.getAllContent()
		.then((contents) => {
			$scope.contents = contents;
			console.log("contents", $scope.contents);
		});

	$scope.getContent = function(contentId) {
		FBDataFactory.getContent(contentId)
		.then((content) => {
			console.log("content", content);
			$location.url(`content/${content.title}/${content.id}`);
		});
	};
});;
"use strict";

app.controller('LoginCtrl', function($scope, FBAuthFactory, FBDataFactory, $location, $route) {

	if(!FBAuthFactory.isAuthenticated()) {
		$location.url('/explore');

	}

	$scope.login = function() {
		FBAuthFactory.FBLoginUser($scope.obj.email, $scope.loginPassword);
	};

	firebase.auth().onAuthStateChanged(user => {
		if(user) {
			$location.url('/explore');
			$route.reload();
		}
	});

});;
"use strict";

app.controller('LogoutCtrl', function(FBAuthFactory, $location, $route) {

	if(!FBAuthFactory.isAuthenticated()) {
		$location.url('/explore');
	}

	FBAuthFactory.FBLogoutUser()
	.then((data) => {
		console.log("data", data);
		$location.url('/explore');
		$route.reload();
		console.log("currentUser", FBAuthFactory.isAuthenticated());
	})
	.catch((data) => {
		console.log("data", data);
		$location.url('/explore');
		$route.reload();
	});

});;
"use strict";

app.controller('NavbarCtrl', function($scope, FBAuthFactory){

	let currentUser = null;
	$scope.isLoggedIn = false;

	firebase.auth().onAuthStateChanged(function(user){
		if (user) {
			console.log("userInfo", user);
			$scope.isLoggedIn = true;
			$scope.currentUser = user;
			console.log("$scope.isLoggedIn", $scope.isLoggedIn);
		}else{
			console.log("no user");
			$scope.isLoggedIn = false;
			console.log("Error-$scope.isLoggedIn", $scope.isLoggedIn);
		}
	});

});;
"use strict";

app.controller('ProfileCtrl', function($scope, FBAuthFactory, FBDataFactory, $location, $route){

	let profile = "";
	let userKey = "";
	let currentUser = FBAuthFactory.getUser();
	console.log("currentUser", currentUser);

	FBDataFactory.getUser(currentUser)
		.then((userData) => {
			let user = userData;
			console.log("user", user, currentUser);
			userKey = Object.keys(user.data);
			$scope.profile = user.data[Object.keys(user.data)];
			profile =  user.data[Object.keys(user.data)];
		})
		.then(() => {
			FBDataFactory.getUsersContent(currentUser)
			.then((usersContents) => {
				$scope.usersContents = usersContents;
				console.log("usersContent", usersContents);
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
	$scope.editedEmail = {
		email: profile.email
	};
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

	$scope.editEmail = function() {
		console.log("displayName", $scope.editedDisplayName);
		FBDataFactory.editEmail($scope.editedEmail, userKey)
		.then((data) => {
			$route.reload();
		})
		.catch((error) => {
			console.log("error", error);
		});
	};

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

;
"use strict";

app.controller('RegisterUserCtrl', function($scope, FBAuthFactory, FBDataFactory, $location, $route){

	if(FBAuthFactory.isAuthenticated()) {
		$location.url('#!/explore');
	}

	$scope.obj = {
		displayName: "",
		email: "",
		image: "",
		bio: ""
	};

	$scope.register = function() {
		FBAuthFactory.FBRegisterUser($scope.obj.email, $scope.registerPassword)
		.then((regData) => {
			console.log("regData", regData);
			$scope.obj.uid = regData.uid;
			console.log("$scope.obj", $scope.obj);
			FBDataFactory.createUser($scope.obj)
			.then((userData) => {
				console.log("userData", userData);
				$location.url("/explore");
			});
		})
		.catch((error) => {
			console.log("registerError", error);
		});
	};

	
});;
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

});;
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
  			if (errorCode === 'auth/wrong-password') {
				alert('Wrong password.');
			} else {
			    alert(errorMessage);
			}
			console.log("error:", error);
		});	
	};

	let FBLogoutUser = function() {
		return firebase.auth().signOut()
		.then(function() {
			$location.url("#!/explore");
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
		 			currentUser = user.uid;
		  			console.log("user", user);
		  			resolve(user);
				} else {
					resolve();
				}
			});
		});

	};

	let getUser = function(){
		return currentUser;
	};

	return {FBRegisterUser, FBLoginUser, FBLogoutUser, isAuthenticated, getUser};
});;
"use strict";

app.factory('FBDataFactory',  ["$q", "$http", "FBCreds", function($q, $http, FBCreds) {

	const getAllContent = () => {
		return $q((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/content.json`)
			.then((content) => {
				let allContent = Object.values(content.data);
				console.log("allContent", allContent, content.data);
				resolve(allContent);
			})
			.catch((error) => {
				reject(error);
			});	
		});
	};

	const getContent = (id) => {
		return $q((resolve, reject) =>{
			$http.get(`${FBCreds.databaseURL}/content/${id}.json`)
			.then((content) => {
				console.log("content", content);
				resolve(content.data);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	const getBranches = (seedId) => {
		return $q((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/content.json?orderBy="seedId"&equalTo="${seedId}"`)
			.then((content) => {
				console.log("content", content);
				resolve(Object.values(content.data));
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	const getUsersContent = (userId) =>{
		return $q((resolve, reject) => {
			console.log(`${FBCreds.databaseURL}/content.json?orderBy="uid"&equalTo="${userId}"`);
			$http.get(`${FBCreds.databaseURL}/content.json?orderBy="uid"&equalTo="${userId}"`)
			.then ((content) => {
				let usersContent = Object.values(content.data);
				resolve(usersContent);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	const createContent = (contentObj) => {
		return $q((resolve, reject) =>{
			let object = JSON.stringify(contentObj);
			$http.post(`${FBCreds.databaseURL}/content.json`, object)
			.then ((contentId) => {
				resolve(contentId);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	const addId = (contentId, idObj) => {
		return $q((resolve, reject) => {
			let object = JSON.stringify(idObj);
			$http.patch(`${FBCreds.databaseURL}/content/${contentId}.json`, object)
			.then ((response) => {
				resolve(response);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	const addBranchId = (contentId, branchObj) => {
		return $q((resolve, reject) => {
			let object = JSON.stringify(branchObj);
			$http.patch(`${FBCreds.databaseURL}/content/${contentId}/branchIds.json`, object)
			.then((response) => {
				resolve(response);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	const createUser = (userObj) => {
		return $q((resolve, reject) => {
			let object = JSON.stringify(userObj);
			console.log(`${FBCreds.databaseURL}/users.json`);
			$http.post(`${FBCreds.databaseURL}/users.json`, object)
			.then((userId) => {
				resolve(userId);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	const getUser = (userId) => {
		return $q((resolve, reject) => {
			console.log(`${FBCreds.databaseURL}/users.json?orderBy="uid"&equalTo="${userId}"`);
			$http.get(`${FBCreds.databaseURL}/users.json?orderBy="uid"&equalTo="${userId}"`)
			.then((userObj) => {
				resolve(userObj);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	const delUser = (userId) => {
		return $q((resolve, reject) => {
			$http.delete(`${FBCreds.databaseURL}/users.json?orderBy="uid"&equalTo="${userId}"`)
			.then((response) => {
				resolve(response);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	const editProfile = (editedObj, userId) => {
		return $q((resolve, reject) =>{
			let newObj = JSON.stringify(editedObj);
			console.log("userId", userId);
			console.log("patch position", `${FBCreds.databaseURL}/users/${userId}.json`, newObj);
			$http.patch(`${FBCreds.databaseURL}/users/${userId}.json`, newObj)
			.then((profileObj) => {
				console.log("profileObj", profileObj);
				resolve(profileObj);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	const makeContentAnon = (contentId) => {
		return $q((resolve, reject) => {
			$http.delete(`${FBCreds.databaseURL}/content/${contentId}/uid.json`)
			.then((response) => {
				resolve(response);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	const deleteContent = (contentId) => {
		return $q((resolve, reject) => {
			$http.delete(`${FBCreds.databaseURL}/content/${contentId}.json`)
			.then((response) => {
				resolve(response);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	return {getAllContent, getContent, getUsersContent, createContent, getBranches, addId, addBranchId, createUser, getUser, delUser, editProfile, makeContentAnon, deleteContent};

}]);;
"use strict";

const app = angular.module("StorySeedApp", ["ngRoute", "ngQuill", "ngSanitize"]);

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
	// });;
"use strict";

app.constant('FBCreds', {    
	apiKey: "AIzaSyCcQTbchX7iZHH86q6csvEmicJBivHF5Jg",
    authDomain: "storyseed-13f65.firebaseapp.com",
    databaseURL: "https://storyseed-13f65.firebaseio.com"
});