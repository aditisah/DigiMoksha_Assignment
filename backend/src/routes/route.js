const express = require("express")
const router = express.Router()
const {signUp, logIn} = require("../controllers/userController")
const {createReport, getReport} = require("../controllers/reportController")
const {auth} = require("../middlewares/auth")

router.post("/admin/signup", signUp)
router.post("/admin/login", logIn)
router.post("/report",auth, createReport)
router.get("/report",auth, getReport)

module.exports = router