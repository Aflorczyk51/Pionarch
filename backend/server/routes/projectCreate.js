const express = require("express");
const router = express.Router();
//const z = require('zod')
//const bcrypt = require("bcrypt");
//const { newUserValidation } = require('../models/userValidator')
const projectModel = require('../models/projectModel')

router.post('/project-create', async (req, res) => {
    
    const { projectName, projectDescription, viewers} = req.body

    //creates a new project
    const createProject = new projectModel({
        projectName: projectName,
        projectDescription: projectDescription,
        viewers: viewers
    });

    router.get('/projects', async (req, res) => {
    try {
        const saveNewProject = await createProject.save();
        res.send(saveNewProject);
    } catch (error) {
        res.status(400).send({ message: "Error trying to create new project" });
    }
}

}); //create a get route

module.exports = router;