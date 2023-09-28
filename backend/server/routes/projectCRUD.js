const express = require("express");
const router = express.Router();
const projectModel = require('../models/projectModel');

// Create a new project
router.post('/projects', async (req, res) => {
    const { projectName, projectDescription, viewers } = req.body;

    try {
        const newProject = new projectModel({
            projectName: projectName,
            projectDescription: projectDescription,
            viewers: viewers
        });

        const savedProject = await newProject.save();
        res.status(201).send(savedProject);
    } catch (error) {
        res.status(400).send({ message: "Error trying to create a new project" });
    }
});

// Read/view projects
router.get('/projects', async (req, res) => {
    try {
        const projects = await projectModel.find();
        res.send(projects);
    } catch (error) {
        res.status(500).send({ message: "Error trying to retrieve projects" });
    }
});

// Update a project
router.put('/projects/:projectId', async (req, res) => {
    const { projectName, projectDescription, viewers } = req.body;

    try {
        const updatedProject = await projectModel.findByIdAndUpdate(
            req.params.projectId,
            {
                projectName: projectName,
                projectDescription: projectDescription,
                viewers: viewers
            },
            { new: true }
        );

        res.send(updatedProject);
    } catch (error) {
        res.status(500).send({ message: "Error trying to update the project" });
    }
});

// Delete a project
router.delete('/projects/:projectId', async (req, res) => {
    try {
        await projectModel.findByIdAndRemove(req.params.projectId);
        res.status(204).send();
    } catch (error) {
        res.status(500).send({ message: "Error trying to delete the project" });
    }
});

module.exports = router;
