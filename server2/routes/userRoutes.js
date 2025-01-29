const express = require("express");
const {
  requireSingIn,
  registerController,
  loginController,
  updateUserController,
} = require("../controllers/userController");

//router object
const router = express.Router();

// routes
router.post("/register", registerController); //register route

router.post("/login", loginController); //login route

//UPDATE || PUT
router.put("/update-user", requireSingIn, updateUserController);

//export router
module.exports = router;
