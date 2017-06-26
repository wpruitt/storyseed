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
				resolve(content.data);
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
			$http.set(`${FBCreds.databaseURL}/users.json`, object)
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

}]);