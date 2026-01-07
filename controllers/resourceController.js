const Resource = require('../models/Resource');
const Collection = require('../models/Collection');
const mongoose = require('mongoose');

// Get resource by ID
exports.getResourceById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid resource ID' });
        }

        const resource = await Resource.findById(id).populate('collectionId', 'title subject semester');

        if (!resource) {
            return res.status(404).json({ error: 'Resource not found' });
        }

        const resourceObj = resource.toObject();
        if (resource.collectionId) {
            resourceObj.collection_title = resource.collectionId.title;
            resourceObj.subject = resource.collectionId.subject;
            resourceObj.semester = resource.collectionId.semester;
        }

        res.json(resourceObj);
    } catch (error) {
        console.error('Get resource error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get trending/featured resources
exports.getTrendingResources = async (req, res) => {
    try {
        const featuredCollections = await Collection.find({ isFeatured: true });
        const collectionIds = featuredCollections.map(c => c._id);

        const resources = await Resource.find({ collectionId: { $in: collectionIds } })
            .populate('collectionId', 'title subject')
            .sort({ createdAt: -1 })
            .limit(6);

        const formattedResources = resources.map(r => {
            const obj = r.toObject();
            if (r.collectionId) {
                obj.collection_title = r.collectionId.title;
                obj.subject = r.collectionId.subject;
            }
            return obj;
        });

        res.json(formattedResources);
    } catch (error) {
        console.error('Get trending resources error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
