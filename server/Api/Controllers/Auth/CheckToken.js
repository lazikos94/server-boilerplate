const Response = require('../../Helpers/Response');
const {secret,crypto_secret} = require('../../../config');
const CryptoJS = require('crypto-js');
const jwt = require("jsonwebtoken");
const User = require('../../../Database/Models/User/User');

async function CheckToken(req,res){
    try{
        const encrypted_token = req.header("Authentication");

        if (!encrypted_token) return res.json(false);

        const decrypted_jwtaToken = CryptoJS.AES.decrypt(encrypted_token,crypto_secret).toString(CryptoJS.enc.Utf8)

        const verified = jwt.verify(decrypted_jwtToken, secret);
        const user = await User.findOne({'_id': verified.sub.user}, { password: 0 }).populate("role",{"name":1,"roleType":1,"_id":0});

        if(!user) return res.json(false);
       
        if (!verified) return res.json(false);
        Response(res,200,{user:user})
    }catch(err){
        Response(res, 500, {success:false, error_message: "Internal Server Error"})
    }
}

module.exports = CheckToken;