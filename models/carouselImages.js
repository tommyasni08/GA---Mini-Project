// Import Modules and Plugins
const mongoose = require('mongoose')
const mongoose_delete = require('mongoose-delete')

// Create the CollectionSchema
const CarouselImagesSchema = new mongoose.Schema({
// Setup the type and requirement(true or false) of each field
  Title:{
    type:String,
    required:true
  },
  Poster:{
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
CarouselImagesSchema.plugin(mongoose_delete,{overrideMethods:'all'});

// Exports the model
module.exports = carouselImages = mongoose.model('carouselImages', CarouselImagesSchema , 'carouselImages');
