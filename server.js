const express = require('express')
const routes = require('./routes/api')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express();

//connect to database
const dburl = "mongodb://localhost/yakyik";
mongoose.connect(dburl, 
    (err,res)=>{
if (err){
    console.log('DB connection failed')
}else{
    console.log('DB connection successful')
}
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/api',routes)
//error handling middleware.please maintain the order
app.use(function(error,req,res,next){
    console.log(error)
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    })
      
    
})


const port = process.env.PORT || 4000
app.listen(port ,()=>{
    console.log(`ninja app listening on port ${port}!`)
})