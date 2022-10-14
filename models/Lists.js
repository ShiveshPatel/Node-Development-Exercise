const mongoose=require('mongoose');
const {Schema}=mongoose;
const listsSchema=new Schema({

user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
},

title:{
    type:String,
    required:true
},

description:{
    type:String,
    required:true
    //unique:true
},

tag:{
    type:String,
    required:true,
    default:"General"
},

date:{
    type:String,
    default:Date.now
},
});
const Lists=mongoose.model('Lists',listsSchema);
module.exports=Lists;

//Lists = model
//listsSchema = schema