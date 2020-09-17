const express = require("express");
const router = express.Router();
const sessionHelper = require("../utils/sessionHelper");
const fileHelper = require("../utils/fileHelper");
const User = require("../models/User");

router.post("/ls", async (req, res) =>
{
    if(sessionHelper.isLogged(req))
    {
        const dir = req.body.path ? req.body.path : "";
        fileHelper.showFolderContent(User, req, res, dir);
    }
    else
    {
        res.send("Login first");
    }
});

router.post("/mkdir", async (req, res) =>
{
    if(sessionHelper.isLogged(req))
    {
        fileHelper.createNewDirectory(req.session.uid, req.body.path);
    }
    else
    {
        res.send("Login first");
    }
});

module.exports = router;