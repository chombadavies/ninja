const express = require ('express')
const router = express.Router();
const Ninja = require('../models/ninjamodels')


router.get('/ninja',(req,res,next)=>{
 /* Ninja.find({}).then(function(ninjas){
    res.send(ninjas)
  })*/
Ninja.aggregate([{
    $geoNear: {
      near: {
        'type': 'Point',
        'coordinates': [parseFloat(req.query.lng), parseFloat(req.query.lat)]
      },
      distanceField: "dist.calculated",
      maxDistance: 100000,
      spherical: true
    }
  }]).then((ninjas) => {
    res.send(ninjas);
  });
})

router.post('/ninja',(req,res,next)=>{
console.log(req.body)
Ninja.create(req.body).then(function(ninja){
  res.send(ninja);
})
.catch(next)
//const ninja = new Ninja(req.body);
//ninja.save();
});

router.patch('/ninja/:id',(req,res,next)=>{
  Ninja.findByIdAndUpdate({_id:req.params.id},req.body)
  .then(function(){
    Ninja.findOne({_id:req.params.id}).then(function(ninja){
      res.send(ninja)
    })
 
  })
  
})

router.delete('/ninja/:id',(req,res,next)=>{
  const id = req.params.id
  Ninja.remove({_id:id})
  //Ninja.findByIdAndRemove({_id:req.params.id}).then()
  .then(function(ninja){})
 res.send(ninja)
 console.log(ninja)
})

module.exports = router;