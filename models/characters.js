// Import Modules and Plugins
const mongoose = require('mongoose')
const mongoose_delete = require('mongoose-delete')

// Create the CollectionSchema
const CharactersSchema = new mongoose.Schema({
// Setup the type and requirement(true or false) of each field
  Nama:{
    type:String,
    required:true
  },
  Picture:{
    type:String,
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
CharactersSchema.plugin(mongoose_delete,{overrideMethods:'all'});

// Exports the model
module.exports = characters = mongoose.model('characters', CharactersSchema , 'characters');
