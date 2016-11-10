var Project = require('../models/projectModel');
var q = require('q');

module.exports = {
    addProject: function(req, res, next) {
        var newProject = new Project();
        newProject.title = req.body.title;
        newProject.description = req.body.description;
        newProject.url = req.body.url;
        var mediaArray = [];
        for (var prop in req.body) {
            if (prop.indexOf('mediaTitle') > -1) {
                var parsedIndex = prop.split('mediaTitle').splice(1);
                mediaArray.push({
                    mediaDescription: req.body['mediaDescription' + parsedIndex],
                    mediaTitle: req.body[prop],
                    mediaUrl: req.body['mediaUrl' + parsedIndex],
                    mediaVideoLink: req.body['mediaVideoLink' + parsedIndex]
                })
            }
        }
        newProject.media = mediaArray;
        newProject.save(function (err, result) {
            if (err) {
                return res.status(500).send(err);
            } else {
                next();
            }
        });
    },
    populateData: function(data) {
        var dfd = q.defer();
        var newProject = new Project(data);
        newProject.save(function (err, response) {
            if (err) {
                dfd.reject(false);
            } else {
                dfd.resolve(true);
            }
        });
        return dfd.promise;
    },
    getProjects: function(req, res, next) {
        Project.find(function (findErr, projects) {
            if (findErr) {
                return res.status(500).send(err);
            } else {
                return res.send(projects);
            }
        })
    },
    updateProject: function(req, res, next) {
        Project.findById(req.body._id, function(err, result) {
            result.title = req.body.project.title;
            result.description = req.body.project.description;
            result.url = req.body.project.url;
            var mediaArray = [];
            for (var prop in req.body.project) {
                if (prop.indexOf('mediaTitle') > -1) {
                    var parsedIndex = prop.split('mediaTitle').splice(1);
                    mediaArray.push({
                        mediaDescription: req.body.project['mediaDescription' + parsedIndex],
                        mediaTitle: req.body.project[prop],
                        mediaUrl: req.body.project['mediaUrl' + parsedIndex],
                        mediaVideoLink: req.body.project['mediaVideoLink' + parsedIndex]
                    })
                }
            }
            result.media = mediaArray;
            result.save(function (err, saveResult) {
                if (err) {
                    return res.status(500).send(false);
                } else {
                    return res.send(true);
                }
            });
        })
    }
};