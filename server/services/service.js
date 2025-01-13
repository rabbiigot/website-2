const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config({path: 'config.env'})

const API_URL = process.env.API_URL;

exports.orderpage = (req, res)=>{
    axios.get(`${API_URL}/api/allorders`)
    .then((response) => {
        // console.log(response)
        res.render('order', {orders: response.data})
    })
    .catch(err => {
        res.send(err);
    })
}

exports.orderUpdate = (req, res)=>{
    axios.get(`${API_URL}/api/updateorder`, {params: {id: req.query.id}})
    .then((response) => {
        res.render('order', {order: response.data});
    })
    .catch((err)=>{
        res.send(err);
    })
}

exports.homepage = (req, res)=>{
    res.render('index');
}

exports.products = (req, res)=>{
    res.render('home-pages/_products');
}

exports.inquiries = (req, res)=>{
    res.render('home-pages/_inquiries');
}

exports.about = (req, res)=>{
    res.render('home-pages/_about');
}

exports.contactus = (req, res)=>{
    res.render('home-pages/_contactus');
}

