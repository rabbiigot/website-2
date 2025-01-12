const axios = require('axios');

exports.orderpage = (req, res)=>{
    axios.get('http://localhost:7000/api/allorders')
    .then((response) => {
        // console.log(response)
        res.render('order', {orders: response.data})
    })
    .catch(err => {
        res.send(err);
    })
}

exports.orderUpdate = (req, res)=>{
    axios.get('http://localhost:7000/api/updateorder', {params: {id: req.query.id}})
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

