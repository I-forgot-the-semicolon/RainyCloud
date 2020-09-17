const express = require("express");
const router = express.Router();
const sessionHelper = require("../utils/sessionHelper")

router.post("/upload", function(req, res)
{
    if(req.body.nFiles && req.files.data && sessionHelper.isLogged(req))
    {
        console.log(req.body.nFiles);
        console.log(req.files);
        let file = req.files.data;
        const uri = req.files.path ? "cloud/" + req.session.uid + "/" + path + "/" + file.name : "cloud/" + req.session.uid + "/" + file.name;
        file.mv(uri, (err) => {
            if(err) throw err;
            res.json({message: "File uploaded"});
        });
    }
    else
    {
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