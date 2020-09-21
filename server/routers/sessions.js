const express = require("express");
const fileHelper = require("../utils/fileHelper");
const sessionHelper = require("../utils/sessionHelper");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();


router.post("/checkSession", async function(req, res)
{
    if(req.body.token)
    {
        const isLogged = sessionHelper.isLogged(req.body.token);
        res.json({message: isLogged});
    }
    else
    {
        res.json({message: "lost token"});
    }
});

router.post("/register", async (req, res) => 
{
    if(req.body.email != null && req.body.password != null)
    {
        try
        {
            if(await User.findOne({email: req.body.email}) == null)
            {
                const id = Date.now().toString();
                const hashedPassword = await sessionHelper.hashPassword(req.body.password);
                const newUser = User({id: id, email: req.body.email, password: hashedPassword});
        
                const registerUser = await newUser.save();
                fileHelper.createNewDirectory(id, "");

                res.json(registerUser);
            }
            else
            {
                res.send("The email already exist");
            }
        }
        catch(error)
        {
            res.send(error);
        }
    }
    else
    {
        res.send("All fields are required");
    }
});


router.post("/login", async (req, res) =>
{
    if(req.body.email && req.body.password)
    {   
        let token = req.body.token ? req.body.token : "empty";
        if(sessionHelper.isLogged(token)== false)
        {
            sessionHelper.checkPassword(User, req, res);
        }
        else
        {
            res.json({message: "Already Logged!"});  
        }
    }
    else
    {
        res.status(400).send("Invalid request");
    }  
});


router.post("/logout", sessionHelper.loginRequired ,function(req, res)
{
    if(sessionHelper.isLogged(req))
    {
        req.session.destroy(() => {console.log("Session destroyed");});
        res.json({message: "ok"});
    }
    else
    {
        res.json({message: "bad request"});
    }
});

module.exports = router;
