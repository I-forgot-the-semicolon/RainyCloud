const express = require("express");
const fileHelper = require("../utils/fileHelper");
const sessionHelper = require("../utils/sessionHelper");
const User = require("../models/User");
const router = express.Router();


router.get("/register", function(req, res)
{
       res.render("pages/register"); 
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
    if(req.body.email != null && req.body.password != null)
    {   
        if(!sessionHelper.isLogged(req))
        {   
            sessionHelper.checkPassword(User, req, res);
        }
        else
        {
            res.json({message: "Already Logged!", session: req.session});  
        }
    }
    else
    {
        res.status(400).send("Invalid request");
    }  
});


router.post("/logout", function(req, res)
{
    if(sessionHelper.isLogged(req))
    {
        req.session.destroy(() => {console.log("Session destroyed");});
        res.send("Destroyed session");
    }
    else
    {
        res.send("Invalid");
    }
});

module.exports = router;
