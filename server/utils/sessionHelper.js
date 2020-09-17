const bcrypt = require("bcrypt");

function isLogged(req)
{
    if(req.session.uid && req.session.email)
    {   
        console.log(req.session.email);
        return true;
    }
    else
    {
        return false;
    }
}

// This function seeks for a user with a specific email, then it compare the passwords
// and if they are the same, then a session is created.
function checkPassword(User, req, res)
{
    User.findOne({email: req.body.email}, async (err, user) =>
    {
        if(err) throw err;
        try 
        {
            console.log("Trying to login");
            if(user && await bcrypt.compare(req.body.password, user.password) == true)
            {
                req.session.uid = user.id;
                req.session.email = req.body.email;
                res.json({message: "Logged!", session: req.session});
            }
            else
            {
                res.json({message: "Invalid credentials!"});
            }
        }
        catch (error) 
        {
            console.log("Error login");
            res.send(error);
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
        res.send(error);
    }
}

exports.isLogged = isLogged;
exports.checkPassword = checkPassword;
exports.hashPassword = hashPassword;