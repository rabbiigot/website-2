const Userdb = require('../model/model');
const axios = require('axios');

exports.create = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Content cannot be empty'
        });
    }

    const order = new Userdb({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        creditnumber: req.body.creditnumber,
        schedule: req.body.schedule
    });

    try {
        const savedOrder = await order.save();

        // Convert to raw JSON string
        const rawBody = JSON.stringify(savedOrder);

        // Send to n8n webhook
        await axios.post(
            'https://simpleflowai.app.n8n.cloud/webhook-test/ec57c677-ee25-404c-a900-2749925a8ba8',
            rawBody,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        res.redirect('/order');

    } catch (err) {
        res.status(500).send({
            message: err.message || "Internal Server Error"
        });
    }
};

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
