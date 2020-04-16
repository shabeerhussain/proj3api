const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user_id:{ type: Schema.Types.ObjectId, ref: 'Users' },
  total:{type:Number},
  items: [{ type: Schema.Types.ObjectId, ref: 'Items' }],
  status:{type:Number,default:1},
  is_active:{type:Number, default:1}
});

// orderSchema.pre('save', function(next) {
//   this.ingredients = this.ingredients.split(',');
//   next();
// });

const orders = mongoose.model('orders', orderSchema);
module.exports = orders;
