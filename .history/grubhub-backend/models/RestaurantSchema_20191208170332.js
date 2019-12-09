var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//schema
RestaurantSchema = new Schema({
  
  restaurantName: {
    type: String,
    default: ''
  },
  
  restaurantEmailId: {
    type: String,
    default: ''
  },
  
  restaurantPassword: {
    type: String,
    default: ''
  },
  
  restaurantImg: {
    type: String,
    default: ''
  },
 
  restaurantPhone: {
    type: String,
    default: ''
  },
  
  restaurantAddress: {
    type: String,
    default: ''
  },
  restaurantCuisine: {
    type: String,
    default: ''
  },
  
  sections:[]
  
});
    
module.exports = mongoose.model('Restaurant', RestaurantSchema);