const User = require('../../../Database/Models/User/User');
const Role = require('../../../Database/Models/Role/Role');

const Response = require('../../Helpers/Response');
const CryptoJS = require('crypto-js');
const jwt  = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const {secret,crypto_secret} = require('../../../config');

async function Login(req,res){
    try{
        let body = req.body;
        console.log("Login Body",body);
        if(!body){
            Response(res, 400, {error_message: 'No credentials provided'})
        }

        let user = await User.findOne({email:body.email},(err,user)=>{
            if(err){
                Response(res, 400, {error_message:err.name == 'ValidationError'?err.message:"Error While Quering"})
            }
            else if(!user){
                Response(res, 400, {error_message: "User not found"})
            }else {
                bcrypt.compare(body.password,user.password,async (err,isMatch)=>{
                    if(err){
                        return cb(err);
                    }
                    let login = false;
                    if(isMatch===true){
                        let login = true;
                        const jwtToken = jwt.sign({iss:'OnlineClass',sub:{user:user._id}}, secret,{expiresIn:"1h"});
                        
                        const encrypted_jwtToken = CryptoJS.AES.encrypt(jwtToken,crypto_secret).toString()
                       
                        const userSend = await User.findOne({_id: user._id}, {password: 0}).populate("role",{"name":1,"roleType":1,"_id":0});
                        Response(res, 200, {success:login, token:encrypted_jwtToken, user:userSend,message:"User logged in"})
    
                    }else{
                        Response(res, 400, {success:login,error_message: "You must provide credentials"})
                    }
                })
             } 
        })
    }catch(err){
        Response(res,500,{success:false,error_message:err.message})
    }
}

module.exports = Login;