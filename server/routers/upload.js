const express = require("express");
const router = express.Router();
const sessionHelper = require("../utils/sessionHelper");

router.post("/upload", function(req, res)
{
    if(req.body.nFiles && req.files && sessionHelper.isLogged(req.body.token))
    {
        console.log(req.body.nFiles);
        console.log(req.files);
        console.log(req.files.data.length);
        const file = req.files.data;
        for(let i = 0 ; i < file.length; i++)
        {
            console.log(file[i].name);
            /*file[i].mv('./upload/'+file[i].name, function(err)
            {
                if(err)
                {
                    console.log(err);
                }
            });*/
        }

        /*let file = req.files.data;
        const uri = req.body.path ? "cloud/" + req.session.uid + "/" + path + "/" + file.name : "cloud/" + req.session.uid + "/" + file.name;
        file.mv(uri, (err) => {
            if(err) throw err;
            res.json({message: "File uploaded"});
        });*/
    }
    else
    {
        console.log("Files : " + req.body.nFiles);
        console.log(req.files);
        console.log(sessionHelper.isLogged(req.body.token));

        res.json({message: "Invalid operation"});
    }
});

router.post("/download", function(req, res)
{
    if(req.body.outputFile && sessionHelper.isLogged(req))
    {
        const path = req.body.path ? req.body.path : "";
        const uri = "cloud/" + req.session.uid + "/" + path + req.body.outputFile;
        res.download(uri);
    }
    else
    {
        res.json({message: "Invalid operation"});
    }
});
module.exports = router;