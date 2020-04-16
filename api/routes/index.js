var express = require('express');
var router = express.Router();
var items = require('../models/Items.models');
var orders = require('../models/Orders.models');
/* GET home page. */
router.get('/items', function(req, res, next) {
  items.find({}).then(data=>res.json(data)).catch(err=>res.json(err));
});

router.post('/items', function(req, res, next) {
 
  items.create(req.body).then(data=>res.json(data)).catch(err=>res.json(err))
});

router.delete('/items/:id', function(req, res, next) {
  items.remove({_id:req.params.id}).then(data=>res.json(data)).catch(err=>res.json(err))
});

router.get('/orders/:user_id/:user_type', function(req, res, next) {
  const query = req.params.user_type==1?{}:{user_id:req.params.user_id};
  orders.find(query).populate({
    path: 'items',
    populate: { path: 'items' }
  }).populate({path:'user_id'}).then(data=>res.json(data)).catch(err=>res.json(err));
});

router.post('/orders', function(req, res, next) {
 
  orders.create(req.body).then(data=>res.json(data)).catch(err=>res.json(err))
});

router.delete('/orders/:id', function(req, res, next) {
  orders.remove({_id:req.params.id}).then(data=>res.json(data)).catch(err=>res.json(err))
});

module.exports = router;
