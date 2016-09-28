var mongoose = require('mongoose');

var projectModel = new mongoose.Schema({
    title: {type: 'String', required: true},
    description: {type: 'String'},
    url: {type: 'String'},
    media: [{
        mediaDescription: {type: 'String'},
        mediaTitle: {type: 'String'},
        mediaUrl: {type: 'String'},
        mediaVideoLink: {type: 'String'}
    }]
});

module.exports = mongoose.model('projects', projectModel);