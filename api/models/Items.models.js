const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const itemsSchema = new Schema({
  name: {type: String},
  description: {type: String},
  price: {type: String},
  image: {type: String, default:"https://images.media-allrecipes.com/images/75131.jpg"},
  stock: {type: Number},
  is_active:{type:Number, default:1}
});

// itemsSchema.pre('save', function(next) {
//   this.ingredients = this.ingredients.split(',');
//   next();
// });

const items = mongoose.model('Items', itemsSchema);
module.exports = items;
