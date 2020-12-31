// Import Modules and Plugins
const mongoose = require('mongoose')
const mongoose_delete = require('mongoose-delete')

// Create the CollectionSchema
const UserSchema = new mongoose.Schema({
// Setup the type and requirement(true or false) of each field
  nama: {
    type: String,
    index: {
      unique: true
    },
    required: true
  },
  email: {
    type: String,
    index: {
      unique: true
    },
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  picture:{
    type:String,
    default:null,
    required:false,
    get: val=> "/img/"+val
  }
}, {
  timestamps: {
// Add timestamps to the Schema
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  versionKey: false,
  toJSON:{getters:true}
})

// Add the plugin
UserSchema.plugin(mongoose_delete, {overrideMethods: 'all'});

// Exports the model
module.exports = user = mongoose.model('user', UserSchema, 'user');
