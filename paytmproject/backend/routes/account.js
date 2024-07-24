const { Account } = require("../db");
const zod=require("zod");
const authMiddleware = require("../middleware");
const  mongoose  = require("mongoose");
const express=require("express");
const cookieParser = require("cookie-parser");
const transfer=zod.object({
    to:zod.string(),
    amount:zod.number()
})
const router=express.Router();
router.use(cookieParser());

router.get('/balance',authMiddleware,async(req,res)=>{
    const account=await Account.findOne({
        userId:req.userId
    });
    if(!account){
        return res.status(411).json({
            msg:"Account not found"
        })

    }
    else{
        return res.status(200).json({
            balance:account.balance

        })
    }
   
})

router.post('/transfer', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { amount, to } = req.body;

        if (!amount || !to) {
            await session.abortTransaction();
            return res.status(400).json({
                msg: "Invalid request"
            });
        }

        const account = await Account.findOne({ userId: req.userId }).session(session);
        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                msg: "Insufficient balance"
            });
        }

        const toAccount = await Account.findOne({ userId: to }).session(session);
        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                msg: "Invalid account"
            });
        }

        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        // Commit the transaction
        await session.commitTransaction();
        res.json({
            msg: "Transfer successful"
        });
    } catch (error) {
        // Abort the transaction in case of an error
        await session.abortTransaction();
        res.status(500).json({
            msg: "Something went wrong",
            error: error.message
        });
    } finally {
        // End the session
        session.endSession();
    }
});

module.exports=router;
