const reportModel = require("../models/reportModel")

const createReport = async (req, res)=>{
    try{
        const reportData = req.body
    const report = await reportModel.create(reportData)
    return res.status(201).send({status: true,message: "report is created!", data: report})
    }catch(err){
        return res.status(500).send({status: false, message: err.message})
    }
}

const getReport = async (req, res)=>{
    try{
        const reportData= await reportModel.find()
        if(reportData.length==0){
            return res.status(404).send({status: false, message: "No report found!"})
        }
        return res.status(200).json(reportData)
    }catch(err){
        return res.status(500).send({status: false, message: err.message})
    }
}

module.exports.createReport = createReport
module.exports.getReport = getReport