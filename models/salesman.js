const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let SalesSchema = new Schema({
    id:{type:Number, required:true},
    name:{type:String, required:true},
    department:{type:String, required:true},
    yearOfPerformance:{type:Number, required:true}
    /*
    role:{type: String,required:true},
    salary:{type: String,required:true},
    gender:{type: String,required:true},
     */
});

module.exports = mongoose.model('salesman',SalesSchema);