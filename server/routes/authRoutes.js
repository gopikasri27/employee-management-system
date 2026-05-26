const express = require("express");
const router = express.Router();

router.post("/login", async (req, res) => {

  const { email, password } = req.body;

  if(email === "admin@gmail.com" && password === "123456") {

    res.json({
      success: true,
      message: "Login Successful"
    });

  } else {

    res.status(401).json({
      success: false,
      message: "Invalid Credentials"
    });
  }
});

module.exports = router;