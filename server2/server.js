const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");

//dot env
dotenv.config();

//connect to db
connectDB();
//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//Routes

// to check
// app.get("", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "Hello from server2",
//   });
// });

app.use("/api/v1/auth", require("./routes/userRoutes"));

//PORT
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(`server running ${PORT}`.bgGreen.white);
});
//now to -> cd server -> node server.js enter
