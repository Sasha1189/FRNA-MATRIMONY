const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");

//DOTENV
dotenv.config();

//MONGODB CONNECTION (after after dotenv only)
connectDB();

// REST OBJECT
const app = express();

//MIDDLEWARES-
// API ko exicute karane ke pahle jo bhi
// content rahega usko yha par exicute karega
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//ROUTES
app.use("/api/v1/auth", require("./routes/userRoutes"));
app.use("/api/v1/post", require("./routes/postRoutes"));
//PORT
const PORT = process.env.PORT || 8080;

//application run- listen
app.listen(PORT, () => {
  console.log(`server running ${PORT}`.bgGreen.white);
});

//now to -> cd server -> node server.js enter
// you can see get request on broser localhost:8080...
//if message updated need refresh in broser
// ..need nodemon to autorefresh browser
// mongodb- sgherade111dKpi72pJBEojOWw
