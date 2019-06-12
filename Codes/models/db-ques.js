var mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/ques',{useNewUrlParser:true})

var ques=new mongoose.Schema({
    ques:{
        type:String,
        required:true
    }
})

var webq=mongoose.model('webq',ques)
var appq=mongoose.model('appq',ques)
var iosq=mongoose.model('iosq',ques)
var blockchainq=mongoose.model('blockchainq',ques)
var designq=mongoose.model('designq',ques)
var mlq=mongoose.model('mlaiq',ques)
var aiq=mongoose.model('aiq',ques)
var comcodq= mongoose.model('comcodq',ques)
var vrq=mongoose.model('vrq',ques)
var contentq=mongoose.model('contentq',ques)
var manageq=mongoose.model('manageq',ques)
var sponsq=mongoose.model('sponsq',ques)

module.exports={webq,appq,iosq,blockchainq,designq,mlq,aiq,comcodq,vrq,contentq,manageq,sponsq}


