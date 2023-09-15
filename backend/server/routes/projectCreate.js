const express = require("express");
const router = express.Router();
const z = require('zod')
const bcrypt = require("bcrypt");
//const { newUserValidation } = require('../models/userValidator')
const newProjectModel = require('../models/projectModel')

/*router.post('/signup', async (req, res) => {
    const { error } = newUserValidation(req.body);
    console.log(error)
    if (error) return res.status(400).send({ message: error.errors[0].message });*/

    const { projectName, projectDescription /*viewers*/} = req.body

    //creates a new project
    const createProject = new newProjectModel({
        projectName: projectName,
        projectDescription: projectDescription,
        //viewers
    });

    try {
        const saveNewProject = await createProject.save();
        res.send(saveNewProject);
    } catch (error) {
        res.status(400).send({ message: "Error trying to create new project" });
    }

//})

module.exports = router;