const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//the geo data schema

const geoSchema = new Schema({
type: {
    type:String,
    dafault:'point'
},
coordinates:{
    type:[Number],
    index:'2dsphere'
}
})
//the ninja schema
const ninjaSchema = new Schema({
    name:{
        type:String,required: true,
    },
    rank:{
        type :String,required :true
    },
    available:{
        type:Boolean, default: false,required :true
    },
    geometry: geoSchema
})

module.exports = mongoose.model('Ninja',ninjaSchema);