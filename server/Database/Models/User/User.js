const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const _id = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema({
    firstname: {type:String,required:true},
    lastname: {type:String, required:true},
    password: {type:String, required:true},
    dateOfBirth: {type:Date, required:true},
    email:{type: String, trim: true, required:false, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Please fill a valid email address'] },
    gender:{type:String, required:true},
    city:{type:String,required:true},
    address: {type:String, required:true},
    studentDetails:{type:String,required:false},
    studentPhoneNumber:{type:Number,required:true},
    parentPhoneNumber:{type:Number,required:true},
    parentFirstName:{type:String, required:true},
    parentLastName:{type:String, required:true},
    parentEmail:{type: String, trim: true, required:false, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Please fill a valid email address'] },
    schoolClass: {type:String,required:true},
    role: [{ type: _id, required: false, ref: "Role" }], 
},{
    timestamps:true
})

UserSchema.pre('save', function(next){
    var user = this;

     if (!user.isModified('password')) return next();

     bcrypt.genSalt(10, function(err, salt) {
         if (err) return next(err);

         bcrypt.hash(user.password, salt, function(err, hash) {
             if (err) return next(err);

             user.password = hash;
             next();
         });
     });
})

const User = mongoose.model('User', UserSchema);

module.exports = User;