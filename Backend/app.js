var express=require('express')
var app=express()
var path=require('path')
var mongodb=require('mongodb')

var mongoClient=mongodb.MongoClient
var url='mongodb://localhost:27017'

// var pathName=path.join(__dirname+'../public')
app.use(express.static("static"))

app.set('view engine','hbs')


app.get('/signup',(req,res)=>{
    res.sendFile(path.join(__dirname+'/static/signup.html'))
    //res.render('index')
})

app.get('/signin',(req,res)=>{
    res.render('signin',{
        message:" "
     })
})

app.get('/userSignup',(req,res)=>{
    
    var uname1 = req.query.first_name;
    var uname2 = req.query.last_name;
    var uemail = req.query.email;
    var phone=req.query.phoneno;
    var rno=req.query.regno;
    var pass=req.query.password;
    

    mongoClient.connect(url,function(err,database){
        if(err)
        {
            throw err
        }

        var dbselect=database.db('record')
        var addData={name1:uname1,
                    name2:uname2,
                    email:uemail,
                    password:pass,
                    phone_no:phone,
                    reg:rno}

        dbselect.collection('table').insertOne(addData,function(error,response){
            if(error)
            {
                throw error
            }
            console.log("1 document inserted")
            database.close()
        })
        
        

    })
    res.render('signin',{
        message:" "
     })

})

app.get('/userlogin',(req,res)=>{
   
    var lname = req.query.email;
    var lpass= req.query.password;
    

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

            var ctr=0
            for(i=0;i<userData.length;i++)
            {
                var user=userData[i]
                if(user.email==lname && user.password==lpass)
                {
                    console.log('welcome '+ user.name1+ " " +user.name2)
                    ctr=1
                }
                
            }
            if(ctr==0)
            {
                res.render('signin',{
                   message:"Invalid email or password "
                })
            }

    else
            {
                res.sendFile(path.join(__dirname+'/static/index.html'))
            }

            databases.close()
        })
    })

    
})


app.get('/webexam',function(err,res){
    mongoClient.connect(url,function(err,database){
        if(err)
    {
        throw err
    }
    dbselect=database.db('tech_web')

    dbselect.collection('web').find({}).toArray(function(err,userTest){
        if(err)
        {
            throw err
        }
        var n=userTest.length
        
        var arr=[]
        l=[]
        ctr=0
        while(ctr!=10)
        {
            x=Math.floor(Math.random()*n)
            if(l.includes(x)==false)
            {
                l.push(x)
                ctr=ctr+1
            }
        }
        
        for(i=0;i<10;i++)
        {
            var value=userTest[l[i]].ques
            arr.push(value)
        }
            
    
        
        res.render('webexam',{
            ques1:arr[0],
            ques2:arr[1],
            ques3:arr[2],
            ques4:arr[3],
            ques5:arr[4],
            ques6:arr[5],
            ques7:arr[6],
            ques8:arr[7],
            ques9:arr[8],
            ques10:arr[9]
            
        })
    })
    })

    
})

app.get('/opexam',function(err,res){
    mongoClient.connect(url,function(err,database){
        if(err)
    {
        throw err
    }
    dbselect=database.db('management')

    dbselect.collection('manage').find({}).toArray(function(err,userTest){
        if(err)
        {
            throw err
        }
        var n=userTest.length
        //console.log(n)
        var arr=[]
        l=[]
        ctr=0
        while(ctr!=10)
        {
            x=Math.floor(Math.random()*n)
            if(l.includes(x)==false)
            {
                l.push(x)
                ctr=ctr+1
            }
        }
        
        for(i=0;i<10;i++)
        {
            var value=userTest[l[i]].ques
            arr.push(value)
        }
           
        
        res.render('opexam',{
            ques1:arr[0],
            ques2:arr[1],
            ques3:arr[2],
            ques4:arr[3],
            ques5:arr[4],
            ques6:arr[5],
            ques7:arr[6],
            ques8:arr[7],
            ques9:arr[8],
            ques10:arr[9]
            
        })
    })
    })

    
})


app.listen(3002,()=>
{
    console.log('server is running on http://localhost:3002')
})

