const Userdb = require('../model/model');

exports.create = (req, res)=>{
    if(!req.body) {
        res.status(400).send({
            message: 'Content cannot be empty'
        })
    }

    const order = new Userdb({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        creditnumber: req.body.creditnumber,
        schedule: req.body.schedule
    })

    order
    .save(order)
    .then(data => {
        // res.send(data)
        res.redirect('/order');
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Internal Server Error"
        })
    })
}

exports.find = (req, res) => {
    var id = req.query.id;

    if(id){
        Userdb
        .findById(id)
        .then(order => {
            if(!order) {
                res.status(404).send({
                    message: 'ID not found'
                })
            }
            else{
                res.send(order);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Internal Server Error'
            })
        })
    }
    else{
        Userdb
        .find()
        .then(order => {
            res.send(order);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Internal Server Error'
            })
        })
    }
}

exports.update = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: 'Content cannot be empty'
        })
    }

    const id = req.params.id

    Userdb
    .findByIdAndUpdate(id, req.body)
    .then(order => {
        if(!order) {
            res.status('404').send({
                message: 'Order ID not found'
            })
        }
        else{
            res.send(order);
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Internal Server Error'
        })
    })
}

exports.delete = (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: 'Content cannot be empty'
        })
    }

    const id = req.params.id

    Userdb
    .findByIdAndDelete(id)
    .then(order => {
        if(!order) {
            res.status('404').send({
                message: 'Order ID not found'
            })
        }
        else{
            res.send({
                message: 'Order was deleted successfully'
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Internal Server Error'
        })
    })
}