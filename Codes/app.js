var express=require('express')
var app=express()
var path=require('path')
var mongodb=require('mongodb')
var session=require('express-session')
var userRegister=require('./models/db-mongoose')
var {webq,appq,iosq,blockchainq,designq,mlq,aiq,comcodq,vrq,contentq,manageq,sponsq}=require('./models/db-ques')

app.use(session({
    secret: 'hello',
    resave: true,
    saveUninitialized: true
}));

var mongoClient=mongodb.MongoClient
var url='mongodb://localhost:27017'

app.use(express.static("static"))
app.set('view engine','hbs')

var auth = function(req, res, next) {
    userSession = req.session;

    if (req.session.userName){
    
        return next();
        
    }
     
    else
      return res.sendStatus(401);
  };
var userSession
var Name
var message1
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/static/signup.html'))
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

    user=new userRegister({
        name:uname1+" "+uname2,
        email:uemail,
        phone,
        regno:rno,
        password:pass
    })
    user.save()
    res.render('signin',{
        message:" "
     })

})

app.get('/userlogin',(req,res)=>{

    userSession=req.session
    var lname = req.query.email;
    var lpass= req.query.password;

    userRegister.find({email:lname,password:lpass},(err,user)=>{
        if(err)
        {
            throw err
        }
        console.log(user)
        if(user.length==0)
        {
            res.render('signin',{
                message:"Invalid email or password "
            })
        }
        else{
            Name=user[0].name
            message1=user[0].name
            console.log("message1: "+message1)
            req.session.userName=Name
            res.render('index',{
                msg:message1
            })
        }
    })
})
app.get('/index',auth,function(req,res){
    res.render('index',{
        msg:message1
    })
})
app.get('/exam',auth,function(req,res){
    res.render('exam',{
        msg:message1
    })
})
app.get('/tech',auth,function(req,res){
    res.render('tech',{
        msg:message1
    })
})
app.get('/manage',auth,function(req,res){
    res.render('manag',{
        msg:message1
    })
})

app.get('/logout' ,auth, function(req,res){
    userSession = req.session;
    Name=undefined
	req.session.destroy(function(err){
        if(err)
        {
			throw err;
        }
        else
        {
            console.log("Session is destroyed, You are redirected to the login page.");
			res.render('signin',{
                message:" "
             })
        }
		})
	})


app.get('/webexam',auth,function(err,res){

    webq.find({},(err,userTest)=>{
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

app.get('/comcodexam',auth,function(err,res){

    comcodq.find({},(err,userTest)=>{
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
        
        res.render('comcod',{
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


app.get('/mlaiexam',auth,function(err,res){

    mlq.find({},(err,userTest1)=>{
        var n=userTest1.length
        var arr=[]
        l=[]
        ctr1=0
        while(ctr1!=5)
        {
            x=Math.floor(Math.random()*n)
            if(l.includes(x)==false)
            {
                l.push(x)
                ctr1=ctr1+1
            }
        }
        
        for(i=0;i<5;i++)
        {
            var value=userTest1[l[i]].ques
            arr.push(value)
        }

        aiq.find({},(err,userTest2)=>{

            var n1=userTest2.length
            var brr=[]
            l1=[]
            ctr2=0
            while(ctr2!=5)
            {
                y=Math.floor(Math.random()*n1)
                if(l1.includes(y)==false)
                {
                    l1.push(y)
                    ctr2=ctr2+1
                }
            }
        
            for(i=0;i<5;i++)
            {
                var value=userTest2[l1[i]].ques
                brr.push(value)
            }    
        
        res.render('mlai',{
            qa1:arr[0],
            qa2:arr[1],
            qa3:arr[2],
            qa4:arr[3],
            qa5:arr[4],
            qb1:brr[0],
            qb2:brr[1],
            qb3:brr[2],
            qb4:brr[3],
            qb5:brr[4]
            
        })

        })


    })
    
})

app.get('/appexam',auth,function(err,res){
    
    appq.find({},(err,userTest1)=>{
        var n=userTest1.length
        var arr=[]
        l=[]
        ctr1=0
        while(ctr1!=5)
        {
            x=Math.floor(Math.random()*n)
            if(l.includes(x)==false)
            {
                l.push(x)
                ctr1=ctr1+1
            }
        }
        
        for(i=0;i<5;i++)
        {
            var value=userTest1[l[i]].ques
            arr.push(value)
        }

        iosq.find({},(err,userTest2)=>{

            var n1=userTest2.length
            var brr=[]
            l1=[]
            ctr2=0
            while(ctr2!=5)
            {
                y=Math.floor(Math.random()*n1)
                if(l1.includes(y)==false)
                {
                    l1.push(y)
                    ctr2=ctr2+1
                }
            }
        
            for(i=0;i<5;i++)
            {
                var value=userTest2[l1[i]].ques
                brr.push(value)
            }    
        
        res.render('app',{
            qa1:arr[0],
            qa2:arr[1],
            qa3:arr[2],
            qa4:arr[3],
            qa5:arr[4],
            qb1:brr[0],
            qb2:brr[1],
            qb3:brr[2],
            qb4:brr[3],
            qb5:brr[4]
            
        })

        })


    })
    
})

app.get('/blockchain',auth,function(err,res){
    
    blockchainq.find({},(err,userTest)=>{
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
        
        res.render('blockchain',{
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

app.get('/vrexam',auth,function(err,res){
    
    vrq.find({},(err,userTest)=>{
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
        
        for(i=0;i<5;i++)
        {
            var value=userTest[l[i]].ques
            arr.push(value)
        }
        
        res.render('vr',{
            ques1:arr[0],
            ques2:arr[1],
            ques3:arr[2],
            ques4:arr[3],
            ques5:arr[4]
            
        })
    
    })
    
})

app.get('/opexam',auth,function(err,res){

    manageq.find({},(err,userTest)=>{
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

app.get('/sponsexam',auth,function(err,res){
    
    sponsq.find({},(err,userTest)=>{
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
        
        for(i=0;i<3;i++)
        {
            var value=userTest[l[i]].ques
            arr.push(value)
        }
        
        res.render('spon',{
            ques1:arr[0],
            ques2:arr[1],
            ques3:arr[2]
            
        })
    
    })    
})

app.get('/cwexam',auth,function(err,res){

    contentq.find({},(err,userTest)=>{
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
        
        for(i=0;i<2;i++)
        {
            var value=userTest[l[i]].ques
            arr.push(value)
        }
        
        res.render('cw',{
            ques1:arr[0],
            ques2:arr[1]
            
        })
    
    })   
})

app.get('/designexam',auth,function(err,res){

    designq.find({},(err,userTest)=>{
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
        
        res.render('design',{
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

app.listen(3002,()=>
{
    console.log('server is running on http://localhost:3002')
})