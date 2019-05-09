//serving up the webpages on localhost and registering the user if not registered. otherwise logging him to his dashboard.
//data is sored in mongo DB database and then is retrieved if the information of logging user matches with the information in stored data.

var express=require('express')
var app=express()
var path=require('path')
var mongodb=require('mongodb')

var mongoClient=mongodb.MongoClient
var url='mongodb://localhost:27017'

// var pathName=path.join(__dirname+'../public')
// app.use('/',express.static(pathName))
// console.log(__dirname)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/index.html'))
})

app.get('/signup.html',(req,res)=>{
    res.sendFile(path.join(__dirname+'/signup.html'))
})

app.get('/login.html',(req,res)=>{
    res.sendFile(path.join(__dirname+'/login.html'))
app.use(express.static("static"))
// console.log(__dirname)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/static/index.html'))
})

app.get('/signup',(req,res)=>{
    res.sendFile(path.join(__dirname+'/static/signup.html'))
})

app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname+'/static/login.html'))
})

app.get('/userSignup',(req,res)=>{
    //res.sendFile(path.join(__dirname+'/login.html'))
    //console.log("req.query 1111111111111>>> " + JSON.stringify(req.query));
    var uname = req.query.uname;
    var uemail = req.query.email;
    var pass=req.query.pass;
    var phone=req.query.phone;
    var wphn=req.query.wphn;
    var rno=req.query.rno;
    var info=req.query.info;
    // console.log("username >>> " + uname);
    // console.log("username >>> " + email);
    // console.log("username >>> " + password);
    // console.log("username >>> " + phone);
    // console.log("username >>> " + wphn);
    // console.log("username >>> " + rno);
    // console.log("username >>> " + info);

    mongoClient.connect(url,function(err,database){
        if(err)
        {
            throw err
        }

        var dbselect=database.db('record')
        var addData={name:uname,
                    email:uemail,
                    password:pass,
                    phone_no:phone,
                    wphone_no:wphn,
                    reg:rno,
                    room:info}

        dbselect.collection('table').insertOne(addData,function(error,response){
            if(error)
            {
                throw error
            }
            console.log("1 document inserted")
            database.close()
        })

    })
})

app.get('/userlogin',(req,res)=>{
    //res.sendFile(path.join(__dirname+'/login.html'))
    //console.log("req.query 1111111111111>>> " + JSON.stringify(req.query));
    var lname = req.query.uname;
    var lpass= req.query.pass;


    mongoClient.connect(url,function(err,databases){
        if(err)
        {
            throw err
        }
    
        var dbselected=databases.db('record')
    
        dbselected.collection('table').find({}).toArray(function(error,userData){
            if(error)
            {
                throw error
            }
            
            for(i=0;i<userData.length;i++)
            {
                var user=userData[i]
                if(user.email==lname && user.password==lpass)
                {
                    console.log('welcome '+ user.name)
                }
                
            }
            
            databases.close()
        })
    })
})



app.listen(3000,()=>
{
    console.log('server is running on http://localhost:3000')

