const reportModel = require("../models/reportModel")

const createReport = async (req, res)=>{
    try{
        const {state, district, subDistrict, block,FPO,shareHolders, percentageWomenFarmers} = req.body
        if(Object.keys(req.body).length==0){
            return res.status(400).send({status: false,message: 'Please provide data to create report'})
        }
        if(state===null || typeof state==='undefined' || state===''){
            return res.status(400).send({status: false,message: 'Please select state'})
        }
        if(district===null || typeof district==='undefined'||district===''){
            return res.status(400).send({status: false,message: 'Please add district'})
        }
        if(subDistrict===null || typeof subDistrict==='undefined'||subDistrict===''){
            return res.status(400).send({status: false,message: 'Please add Sub District'})
        }
        if(block===null || typeof block==='undefined'||block===''){
            return res.status(400).send({status: false,message: 'Please add block'})
        }
        if(FPO===null || typeof FPO==='undefined'||FPO===''){
            return res.status(400).send({status: false,message: 'Please add PFO'})
        }
        if(shareHolders===null || typeof shareHolders==='undefined' || shareHolders===''){
            return res.status(400).send({status: false,message: 'Please add Shareholders'})
        }
        if(percentageWomenFarmers===null || typeof percentageWomenFarmers==='undefined' || percentageWomenFarmers===''){
            return res.status(400).send({status: false,message: 'Please add Women Farmer Percentage(%)'})
        }
    const report = await reportModel.create(req.body)
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