var mongoose = require('mongoose');

// Uploaded Airbnb Dataset Schema
var AirbnbHomeSchema = new mongoose.Schema({
  id: String,
  amenities: [{type:String}],
  summary: String,
  name: String,
  host_picture_url: String,
  smart_location: String,
  description: String,
  country_code: String,
  price: String,
  longitude: String,
  latitude: String,
  property_type: String,
  number_of_reviews: String,
  host_name: String,
  reviews:[{
    comments:String,
    reviewer_id:String,
    reviewer_name:String
  }]
});
module.exports = mongoose.model('AirbnbHome', AirbnbHomeSchema,'listing');
