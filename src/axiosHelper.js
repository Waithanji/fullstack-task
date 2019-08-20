import axios from 'axios'

var localStorage = window.localStorage;
var user = localStorage.getItem('user')
var jsonUser = user == null ? "" : JSON.parse(user)
var token =  jsonUser != "" ? jsonUser.api_token : "";

const instance = axios.create({
    baseURL: 'http://142.93.26.83/fullstack-task-api/public/api/v1',
    headers: {'x-api-key': token, 'Content-Type':'application/json'}
})

instance.interceptors.request.use(function(config) {

    return config
}, function(error) {

    return Promise.reject(error);
});

export default instance
