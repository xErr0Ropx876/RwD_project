const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    subject: {
        type: String
    },
    semester: {
        type: String
    },
    isFeatured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Collection', collectionSchema);
