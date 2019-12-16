const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let RecordSchema = new Schema({
    id:{type:Number, required:true},
    gid:{type:Number, required:true},
    attribute:{type:String, required:true},
    targetValue:{type:Number, required:true},
    actualValue:{type:Number, required:true},
    bonus:{type:Number, required:true}
});

module.exports = mongoose.model('evaluationrecord',RecordSchema);