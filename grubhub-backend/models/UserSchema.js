var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//schema
UserSchema = new Schema({
  
  buyerName: {
    type: String,
    default: ''
  },

  buyerEmailId: {
    type: String,
    default: ''
  },

  buyerPassword: {
    type: String,
    default: ''
  },

  buyerImg: {
    type: String,
    default: ''
  },
  
  buyerPhone: {
    type: String,
    default: ''
  },
  
  buyerAddress: {
    type: String,
    default: ''
  },
});
    
module.exports = mongoose.model('Users', UserSchema);