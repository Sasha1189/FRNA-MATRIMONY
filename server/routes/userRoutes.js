const express = require("express");
const {
  requireSingIn,
  registerController,
  loginController,
  updateUserController,
} = require("../controllers/userController");

//router object
const router = express.Router();

//routes
//REGISTER || POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//UPDATE || PUT
router.put("/update-user", requireSingIn, updateUserController);

//export
module.exports = router;
