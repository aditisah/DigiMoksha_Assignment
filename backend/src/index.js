const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const route = require('./routes/route')
const app = express();

app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorization')
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE')
    next()
});
mongoose.connect('mongodb+srv://aditisah:HdtoVDUgrpCUNRmS@cluster0.jjd4zhp.mongodb.net/DigiMoksha_assignment?retryWrites=true&w=majority',{
    useNewUrlParser: true
    })
    .then(()=>console.log('database is connected...'))
    .catch(err=>console.log(err))

app.use('/', route)

app.listen(process.env.PORT||3000,()=>{
    console.log('server is listening on ' + (process.env.PORT||3000))
})