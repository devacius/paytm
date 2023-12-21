const express= require ('express');
const app=express();


function userMiddle(req,res,next){
    if(username != "Deepansh" && password!="pass"){
        res.status(403).json({
            msg:"incorrect",
        });

    }
    else{
        next();
    }
};
function Middle(req,res,next){
    if(kidneyId !=1 && kidneyId !=2){
        res.status(403).json({
            msg:"incorrect",
        });

    }
    else{
        next();
    }
};

app.get("/",userMiddle,Middle,(req,res)=>{
    res.send("your heart is healthy");
    const kidneyId=req.query.kidneyId;
    const username= req.headers.username;
    const password=req.headers.password;
})
app.listen(3000,function(){
    console.log("servier is not working");
})