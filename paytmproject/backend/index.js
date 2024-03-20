// backend/index.js
const express = require("express");
const rootRouter = require("./routes/index");
const app = express();
const cors=require("cors");
const cookieParser = require("cookie-parser");
const PORT=3000;

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use("/api/v1", rootRouter);

app.listen(PORT,()=>{
    console.log("app is running")
});