const mongoose = require('mongoose');

const ConversionSchema = new mongoose.Schema({

    members: {
        type: Array,
    }

},
    { timestamps: true }
);

module.exports = mongoose.model('conversion', ConversionSchema);