const express=require("express");
const zod=require("zod");
const router=express.Router();
const jwt=require("jsonwebtoken");
const {User, Account}=require("../db");
const {JWT_SECRET}=require("../config");
const bcrypt=require("bcryptjs");
const   authMiddleware  = require("../middleware");

const searchuser=zod.object({
    firstName:zod.string(),
    lastName:zod.string()
})

const updatebody= zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional(),
})

const Userverification =zod.object({
    username:zod.string(),
    firstName:zod.string().min(2),
    lastName:zod.string(),
    password:zod.string().min(7),

})
const signupBody = zod.object({
    username: zod.string(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string(),
})
const Usersigninbody=zod.object({
    username:zod.string(),
    password:zod.string().min(7)
})


//* sign up route by me 

router.post('/signup',async function(req,res,next){
    try{
        const result=Userverification.safeParseAsync(req.body);
        if(!result){
            return res.status(411).json({
                msg:"Incorrect input"
            })
        }
    const existinguser=await User.findOne({
        username:req.body.username
    })
    if(existinguser){
        return res.status(411).json({
            msg:"User already exist"
        })
    }
    bcrypt.hash(req.body.password,10).then(async(hash)=>{
        const user = await User.create({
            username: req.body.username,
            password: hash,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            
        })

        const userId=user._id;
        await Account.create({
            userId,
            balance:1+ Math.random()*1000
        })
        const token=jwt.sign({
            userId
        },JWT_SECRET);
        res.json({
            msg:"user create successfully",
            token:token
        })
    })
   
   
    }
    catch(err){
        console.log(err);
    }

});

//* sign up route of harkirat
// router.post("/signup", async (req, res) => {
//     const  result = signupBody.safeParse(req.body);
    
//     if (!result.success) {
        
//         return res.status(411).json({
//             message: "Incorrect credentials"
//         })
//     }

//     const existingUser = await User.findOne({
//         username: req.body.username
//     })

//     if (existingUser) {
//         return res.status(411).json({
//             message: "Email already taken/Incorrect inputs"
//         })
//     }

//     const user = await User.create({
//         username: req.body.username,
//         password: req.body.password,
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//     })
//     const userId = user._id;

//     await Account.create({
//         userId,
//         balance: 1 + Math.random() * 10000
//     })

//     const token = jwt.sign({
//         userId
//     }, JWT_SECRET);

//     res.json({
//         message: "User created successfully",
//         token: token
//     })
// })

// //* signin route
router.post('/signin',async function(req,res,next){
    const userinfo=req.body;
    try{
        const result=Usersigninbody.safeParseAsync(userinfo);
        if(!result){
            return res.status(411).json({
                msg:"Incorrect input"
            })
        }
        const finduser=await User.findOne({
            username:req.body.username
        })
        if(!finduser){
            res.status(400).json({
                message: "Login not successful",
                error: "User not found",
              })
            }
            else{
            bcrypt.compare(req.body.password,finduser.password).then(function(result){
            const userId=finduser._id;
            const maxage=3*60*60;
            const token=jwt.sign({
                userId
            },JWT_SECRET,{expiresIn:maxage});
            res.cookie("jwt",token,{
                httpOnly:true,
                maxAge:maxage*1000,
            });
            result?
            res.status(200).json({

                msg:"Welcome",
                token:token

            })
            :res.status(400).json({
                msg:"Login not successful"
            })
            return ;
        })

        }
        
      
    }
    catch(err){
        console.log(err);
    }
})

// //* update route
router.put('/', authMiddleware, async(req,res)=>{
    const {success}=updatebody.safeParse(req.body);
    if(!success){
        res.status(411).json({
            msg:"Incorrect credentials"
        })
    }
    await User.updateOne({
        _id:req.userId
    },req.body)
        res.json({
            msg:"Update Successfully"
        })
})

// //* get route for sending money
router.get('/search',async function(req,res){
const filter=req.query.filter || "";  //* used to take query from the request header and with filter=? as the parameter
const users=await User.find({
    $or:[{
        firstName:{
            "$regrex":filter
        }
    },{lastName:{
        "$regrex":filter
    }

    
    }]
})
res.json({
    user:users.map(user=>({
        username:user.username,
        firstName:user.firstName,
        lastName:user.lastName,
        _id:user._id
    }))
})

});




module.exports=router;