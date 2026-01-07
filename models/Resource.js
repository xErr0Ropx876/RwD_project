const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    collectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collection',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    type: {
        type: String,
        enum: ['pdf', 'link', 'notes', 'question_bank'],
        default: 'notes'
    },
    url: {
        type: String
    },
    tags: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Resource', resourceSchema);
