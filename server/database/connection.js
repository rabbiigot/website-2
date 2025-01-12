const mongoose = require('mongoose');

exports.mongoose = async() => {
    try{
        const con = await mongoose.connect(process.env.MONGO_URI, {})

        console.log(`MongoDB Connected: ${con.connection.host}`);
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}

