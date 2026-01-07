const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password_hash: {
        type: String,
        required: true
    },
    savedCollections: [{
        collectionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Collection'
        },
        savedAt: {
            type: Date,
            default: Date.now
        }
    }],
    savedResources: [{
        resourceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Resource'
        },
        savedAt: {
            type: Date,
            default: Date.now
        }
    }],
    resourceProgress: [{
        resourceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Resource'
        },
        isCompleted: {
            type: Boolean,
            default: false
        },
        lastViewedAt: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
