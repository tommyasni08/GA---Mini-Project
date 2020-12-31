// Import Modules and Plugins
const mongoose = require('mongoose')
const mongoose_delete = require('mongoose-delete')

// Create the CollectionSchema
const MovieSchema = new mongoose.Schema({
// Setup the type and requirement(true or false) of each field
  Title:{
    type:String,
    required:true
  },
  Year:{
    type:String,
    required:true
  },
  Released:{
    type:Date,
    required:true
  },
  Runtime:{
    type:String,
    required:true
  },
  Genre:{
    type:String,
    required:true
  },
  Director:{
    type:String,
    required:false
  },
  Writer:{
    type:String,
    required:false
  },
  Actors:{
    type:Array,
    required:true
  },
  Plot:{
    type:String,
    required:true
  },
  Language:{
    type:String,
    required:true
  },
  Country:{
    type:String,
    required:true
  },
  Poster:{
    type:String,
    default:null,
    required:false
  },
  Ratings:{
    type:Number,
    required:false
  },
  Trailer:{
    type:String,
    default:null,
    required:false
  }
}, {
// Add timestamps to the Schema
  timestamps:{
    createdAt:'created_at',
    updatedAt:'updated_at'
  },
  versionKey:false
})

// Add the plugin
MovieSchema.plugin(mongoose_delete,{overrideMethods:'all'});

// Exports the model
module.exports = movie = mongoose.model('movie', MovieSchema , 'movie');
