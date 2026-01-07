const Collection = require('../models/Collection');
const Resource = require('../models/Resource');
const mongoose = require('mongoose');

// Get all collections
exports.getAllCollections = async (req, res) => {
    try {
        const { subject, semester, search, is_featured } = req.query;
        
        let query = {};

        if (subject) {
            query.subject = subject;
        }

        if (semester) {
            query.semester = semester;
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        if (is_featured === 'true') {
            query.isFeatured = true;
        }

        const collections = await Collection.find(query).sort({ createdAt: -1 });
        res.json(collections);
    } catch (error) {
        console.error('Get collections error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get single collection with resources
exports.getCollectionById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid collection ID' });
        }

        const collection = await Collection.findById(id);

        if (!collection) {
            return res.status(404).json({ error: 'Collection not found' });
        }

        const resources = await Resource.find({ collectionId: id }).sort({ createdAt: 1 });

        res.json({
            ...collection.toObject(),
            resources
        });
    } catch (error) {
        console.error('Get collection error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
