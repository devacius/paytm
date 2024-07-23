// backend/index.js
const express = require("express");
const rootRouter = require("./routes/index");
const app = express();
const dotenv=require("dotenv");
const cors=require("cors");
const cookieParser = require("cookie-parser");
const PORT=3000;
const connectDB=require("./config");
dotenv.config({path:'.env.local'});
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use("/api/v1", rootRouter);
connectDB();
app.listen(PORT,()=>{
    console.log("app is running")
});