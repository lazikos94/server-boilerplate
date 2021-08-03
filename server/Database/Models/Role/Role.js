const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    name: {type:String, required:true},
    roleType: {type:String, required:true, default:'student',enum:['student','teacher','admin']},
    description: {type:String,required:false},
    active: {type:Boolean, required:true}
})

const Role = mongoose.model('Role',RoleSchema);

module.exports = Role;