"use strict";

app.factory('FBDataFactory',  ["$q", "$http", "FBCreds", function($q, $http, FBCreds) {

	const getAllContent = () => {
		return $q((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/content.json`)
			.then((content) => {
				let allContent = content.data;
				console.log("allContent", allContent);
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
				resolve(content);
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
			$http.get(`${FBCreds.databaseURL}/${userId}.json`)
			.then((userObj) => {
				resolve(userObj);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

	return {getAllContent, getContent, createContent, createUser};

}]);