const express = require("express")
const router = express.Router()
const {signUp, logIn} = require("../controllers/userController")
const {createReport, getReport} = require("../controllers/reportController")

router.post("/admin/signup", signUp)
router.post("/admin/login", logIn)
router.post("/report", createReport)
router.get("/report", getReport)

module.exports = router