const User = require('../models/User');
const Collection = require('../models/Collection');
const Resource = require('../models/Resource');
const mongoose = require('mongoose');

// Save/unsave collection
exports.toggleSaveCollection = async (req, res) => {
    try {
        const userId = req.userId;
        const { collection_id } = req.body;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(collection_id)) {
            return res.status(400).json({ error: 'Invalid collection ID' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if already saved
        const savedIndex = user.savedCollections.findIndex(
            sc => sc.collectionId.toString() === collection_id
        );

        if (savedIndex > -1) {
            // Unsave
            user.savedCollections.splice(savedIndex, 1);
            await user.save();
            res.json({ message: 'Collection removed from saved', saved: false });
        } else {
            // Save
            user.savedCollections.push({ collectionId: collection_id });
            await user.save();
            res.json({ message: 'Collection saved', saved: true });
        }
    } catch (error) {
        console.error('Toggle save collection error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get saved collections
exports.getSavedCollections = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId).populate('savedCollections.collectionId');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const collections = user.savedCollections
            .map(sc => ({
                ...sc.collectionId.toObject(),
                saved_at: sc.savedAt
            }))
            .sort((a, b) => new Date(b.saved_at) - new Date(a.saved_at));

        res.json(collections);
    } catch (error) {
        console.error('Get saved collections error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Save/unsave resource
exports.toggleSaveResource = async (req, res) => {
    try {
        const userId = req.userId;
        const { resource_id } = req.body;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(resource_id)) {
            return res.status(400).json({ error: 'Invalid resource ID' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const savedIndex = user.savedResources.findIndex(
            sr => sr.resourceId.toString() === resource_id
        );

        if (savedIndex > -1) {
            user.savedResources.splice(savedIndex, 1);
            await user.save();
            res.json({ message: 'Resource removed from saved', saved: false });
        } else {
            user.savedResources.push({ resourceId: resource_id });
            await user.save();
            res.json({ message: 'Resource saved', saved: true });
        }
    } catch (error) {
        console.error('Toggle save resource error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get saved resources
exports.getSavedResources = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId)
            .populate({
                path: 'savedResources.resourceId',
                populate: { path: 'collectionId', select: 'title subject' }
            });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const resources = user.savedResources
            .map(sr => {
                const resourceObj = sr.resourceId.toObject();
                return {
                    ...resourceObj,
                    collection_title: sr.resourceId.collectionId?.title,
                    subject: sr.resourceId.collectionId?.subject,
                    saved_at: sr.savedAt
                };
            })
            .sort((a, b) => new Date(b.saved_at) - new Date(a.saved_at));

        res.json(resources);
    } catch (error) {
        console.error('Get saved resources error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Update resource progress
exports.updateProgress = async (req, res) => {
    try {
        const userId = req.userId;
        const { resource_id, is_completed } = req.body;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(resource_id)) {
            return res.status(400).json({ error: 'Invalid resource ID' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const progressIndex = user.resourceProgress.findIndex(
            rp => rp.resourceId.toString() === resource_id
        );

        if (progressIndex > -1) {
            user.resourceProgress[progressIndex].isCompleted = is_completed;
            user.resourceProgress[progressIndex].lastViewedAt = new Date();
        } else {
            user.resourceProgress.push({
                resourceId: resource_id,
                isCompleted: is_completed,
                lastViewedAt: new Date()
            });
        }

        await user.save();
        res.json({ message: 'Progress updated' });
    } catch (error) {
        console.error('Update progress error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get dashboard data
exports.getDashboard = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.findById(userId)
            .populate('savedCollections.collectionId')
            .populate({
                path: 'savedResources.resourceId',
                populate: { path: 'collectionId', select: 'title' }
            })
            .populate({
                path: 'resourceProgress.resourceId',
                populate: { path: 'collectionId', select: 'title' }
            });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Get saved collections (limit 5, sorted by saved date)
        const savedCollections = user.savedCollections
            .sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt))
            .slice(0, 5)
            .map(sc => sc.collectionId);

        // Get saved resources (limit 5, sorted by saved date)
        const savedResources = user.savedResources
            .sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt))
            .slice(0, 5)
            .map(sr => ({
                ...sr.resourceId.toObject(),
                collection_title: sr.resourceId.collectionId?.title
            }));

        // Get recently viewed resources (limit 10, sorted by last viewed)
        const recentResources = user.resourceProgress
            .sort((a, b) => new Date(b.lastViewedAt) - new Date(a.lastViewedAt))
            .slice(0, 10)
            .map(rp => ({
                ...rp.resourceId.toObject(),
                collection_title: rp.resourceId.collectionId?.title,
                last_viewed_at: rp.lastViewedAt,
                is_completed: rp.isCompleted
            }));

        res.json({
            savedCollections,
            savedResources,
            recentResources
        });
    } catch (error) {
        console.error('Get dashboard error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
