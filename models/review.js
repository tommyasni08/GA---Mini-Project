// Import Modules and Plugins
const mongoose = require('mongoose')
const mongoose_delete = require('mongoose-delete')

// Create the CollectionSchema
const ReviewSchema = new mongoose.Schema({
// Setup the type and requirement(true or false) of each field
  Nama:{
    type:String,
    required:true
  },
  Email:{
    type:String,
    required:true
  },
  Picture:{
    type:String,
    default:null,
    required:false,
    get: val=> "/img/"+val
  },
  Movie:{
    type:String,
    required:true
  },
  Review:{
    type:String,
    required:true
  },
  Rating:{
    type:Number,
    required:true
  }
}, {
// Add timestamps to the Schema
  timestamps:{
    createdAt:'created_at',
    updatedAt:'updated_at'
  },
  versionKey:false,
  toJSON:{getters:true}
})

// Add the plugin
ReviewSchema.plugin(mongoose_delete,{overrideMethods:'all'});

// Exports the model
module.exports = review = mongoose.model('review', ReviewSchema , 'review');
