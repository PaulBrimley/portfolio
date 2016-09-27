var Project = require('../models/projectModel');

module.exports = {
    addProject: function(req, res, next) {
        console.log(req.body);
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
                    mediaUrl: req.body['mediaUrl' + parsedIndex]
                })
            }
        }
        newProject.media = mediaArray;
        console.log(newProject);
        newProject.save(function (err, result) {
            if (err) {
                return res.status(500).send(err);
            } else {
                console.log('result',result);
                next();
            }
        });
    },
    getProjects: function(req, res, next) {
        Project.find(function (findErr, projects) {
            if (findErr) {
                return res.status(500).send(err);
            } else {
                return res.send(projects);
            }
        })
    }
};