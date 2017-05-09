const axios = require("axios");
const store = require("store");

module.exports = function(){
	let apiUrl = "http://localhost:3000";

	// Axios Instance API
	let http = axios.create({baseURL:apiUrl});

	// User API
	let user = {};
	user.apiPathLogin = "user/login";
	user.storeUserTokenKey = "userToken";
	user.storeUserKey = "user";

	user.getToken = () => store.get(user.storeUserTokenKey);
	user.setToken = (token) => store.set(user.storeUserTokenKey,token);
	user.removeToken = () => store.remove(user.storeUserTokenKey);

	user.getUser = () => store.get(user.storeUserKey);
	user.setUser = (userData) => store.set(user.storeUserKey,userData);
	user.removeUser = () => store.remove(user.storeUserKey);

	user.isLogged = () => user.getToken() ? true : false;
	user.login = (email,password) =>
		user.isLogged() ? Promise.resolve(user.getUser(user.storeUserKey)) : http.post(user.apiPathLogin,{email:email,password:password}).then(
			(response) => {
				user.setUser(response.data.user);
				user.setToken(response.data.token);
				return response.data.user;
			}
	);
	user.logout = () => {
		user.removeUser();
		user.removeToken();
	};

	return {
		apiUrl: apiUrl,
		user:user
	};
};
