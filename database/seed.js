const mongoose = require('mongoose');
const Collection = require('../models/Collection');
const Resource = require('../models/Resource');
require('dotenv').config();

const seedDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/studyhub');
        console.log('MongoDB Connected');

        // Clear existing data
        await Collection.deleteMany({});
        await Resource.deleteMany({});
        console.log('Cleared existing data');

        // Insert sample collections
        const collections = await Collection.insertMany([
            {
                title: 'Data Structures & Algorithms',
                description: 'Complete notes and practice problems for DSA',
                subject: 'Computer Science',
                semester: '4th Sem',
                isFeatured: true
            },
            {
                title: 'Operating Systems Fundamentals',
                description: 'OS concepts, processes, memory management',
                subject: 'Computer Science',
                semester: '4th Sem',
                isFeatured: true
            },
            {
                title: 'Database Management Systems',
                description: 'SQL, normalization, transactions, and more',
                subject: 'Computer Science',
                semester: '5th Sem',
                isFeatured: true
            },
            {
                title: 'Computer Networks',
                description: 'Networking protocols, TCP/IP, OSI model',
                subject: 'Computer Science',
                semester: '5th Sem',
                isFeatured: false
            },
            {
                title: 'Software Engineering',
                description: 'SDLC, design patterns, testing',
                subject: 'Computer Science',
                semester: '6th Sem',
                isFeatured: false
            },
            {
                title: 'Machine Learning Basics',
                description: 'Introduction to ML algorithms and concepts',
                subject: 'Computer Science',
                semester: '7th Sem',
                isFeatured: true
            }
        ]);

        console.log('Collections inserted');

        // Insert sample resources for DSA
        await Resource.insertMany([
            {
                collectionId: collections[0]._id,
                title: 'Arrays and Strings Notes',
                description: 'Comprehensive guide to arrays and string manipulation',
                type: 'notes',
                url: '#',
                tags: 'arrays,strings,basics'
            },
            {
                collectionId: collections[0]._id,
                title: 'Linked List Implementation',
                description: 'Complete linked list operations with examples',
                type: 'pdf',
                url: '/resources/linked-list.pdf',
                tags: 'linked-list,data-structures'
            },
            {
                collectionId: collections[0]._id,
                title: 'Tree Traversal Techniques',
                description: 'In-order, pre-order, post-order explained',
                type: 'notes',
                url: '#',
                tags: 'trees,traversal'
            },
            {
                collectionId: collections[0]._id,
                title: 'Graph Algorithms Cheat Sheet',
                description: 'BFS, DFS, Dijkstra quick reference',
                type: 'pdf',
                url: '/resources/graph-algorithms.pdf',
                tags: 'graphs,algorithms'
            },
            {
                collectionId: collections[0]._id,
                title: 'Dynamic Programming Practice',
                description: '50 DP problems with solutions',
                type: 'question_bank',
                url: '#',
                tags: 'dp,practice,problems'
            }
        ]);

        // Insert sample resources for OS
        await Resource.insertMany([
            {
                collectionId: collections[1]._id,
                title: 'Process Scheduling Algorithms',
                description: 'FCFS, SJF, Round Robin explained',
                type: 'notes',
                url: '#',
                tags: 'scheduling,processes'
            },
            {
                collectionId: collections[1]._id,
                title: 'Memory Management Notes',
                description: 'Paging, segmentation, virtual memory',
                type: 'pdf',
                url: '/resources/memory-management.pdf',
                tags: 'memory,virtual-memory'
            },
            {
                collectionId: collections[1]._id,
                title: 'Deadlock Prevention Guide',
                description: 'Understanding and preventing deadlocks',
                type: 'notes',
                url: '#',
                tags: 'deadlock,concurrency'
            },
            {
                collectionId: collections[1]._id,
                title: 'OS Important Questions',
                description: '100 most asked OS interview questions',
                type: 'question_bank',
                url: '#',
                tags: 'interview,questions'
            }
        ]);

        // Insert sample resources for DBMS
        await Resource.insertMany([
            {
                collectionId: collections[2]._id,
                title: 'SQL Query Tutorial',
                description: 'From basics to advanced SQL queries',
                type: 'notes',
                url: '#',
                tags: 'sql,queries'
            },
            {
                collectionId: collections[2]._id,
                title: 'Normalization Complete Guide',
                description: '1NF to BCNF with examples',
                type: 'pdf',
                url: '/resources/normalization.pdf',
                tags: 'normalization,database-design'
            },
            {
                collectionId: collections[2]._id,
                title: 'Transaction Management',
                description: 'ACID properties and concurrency control',
                type: 'notes',
                url: '#',
                tags: 'transactions,acid'
            },
            {
                collectionId: collections[2]._id,
                title: 'DBMS Midterm Question Bank',
                description: 'Previous year questions with solutions',
                type: 'question_bank',
                url: '#',
                tags: 'exam,midterm'
            }
        ]);

        console.log('Resources inserted');
        console.log('Database seeded successfully!');
        
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
