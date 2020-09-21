const Sessions = require("../models/Sessions");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


function loginRequired(req, res, next)
{
    jwt.verify(req.body.token, process.env.TOKEN_SECRET, async function(err, decoded)
    {
            if(err)
            {
                res.json({message: "You have to login or bad token"});  
            }
            else
            {
                console.log(decoded);
                next();
            }
    });
}

function isLogged(token)
{
    console.log("Verify token: " + token);
    return jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded)
    {
            if(err)
            {
                console.log("Err: " + err);
                return false;
            }
            else
            {
                console.log("Logged: " + decoded.email);
                return true;
            }
    });
}

// This function seeks for a user with a specific email, then it compare the passwords
// and if they are the same, then a session is created.
async function checkPassword(User, req, res)
{
    User.findOne({email: req.body.email}, async (err, user) =>
    {
        if(err) throw err;
        try 
        {
            if(user && await bcrypt.compare(req.body.password, user.password) == true)
            {
                token = jwt.sign({email: req.body.email, password: req.body.password}, process.env.TOKEN_SECRET, {expiresIn: 300});
                res.json({message: "logged", token: token});
            }
            else
            {
                res.json({message: "Bad"});
            }
        }
        catch (error) 
        {
            console.log("Error login: " + error);
        }
    });
}


async function hashPassword(password)
{
    try
    {
        return await bcrypt.hash(password, 10);
    }
    catch(error)
    {
        return null;
    }
}

exports.loginRequired = loginRequired;
exports.isLogged = isLogged;
exports.checkPassword = checkPassword;
exports.hashPassword = hashPassword;