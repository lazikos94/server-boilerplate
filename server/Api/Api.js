const express = require('express');
const cors = require('cors');
const Login = require('./Controllers/Auth/Login');
const CheckToken = require('./Controllers/Auth/CheckToken');
const Register = require('./Controllers/Auth/Register');
const api = express();

//user routes
api.post('/login',Login);
api.get('/auth',CheckToken);
api.post('/register',Register);




module.exports = api