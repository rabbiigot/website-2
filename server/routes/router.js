const express = require('express');
const route = express.Router();
const services = require('../services/service')
const controller = require('../controller/controller')

route.get('/', services.homepage);

route.get('/products', services.products);

route.get('/inquiries', services.inquiries);

route.get('/about', services.about);

route.get('/contactus', services.contactus);

route.get('/order', services.orderpage, services.orderUpdate);

// API Controller
route.post('/api/addorder', controller.create);

route.get('/api/allorders', controller.find);

route.put('/api/updateorder/:id', controller.update);

route.delete('/api/deleteorder/:id', controller.delete);

module.exports = route