const fs = require("fs");

function createNewDirectory(id, path)
{
    const uri = "cloud/" + id + "/" + path;
    fs.mkdir(uri, {recursive: false}, (err) =>
    {
        if(err) throw err;
    });
}


function showFolderContent(User, req, res, dir)
{
    User.findOne({email: req.session.email}, async (err, user) =>
    {
           if(err) console.log(err);
           if(user)
           {
               const uri = "cloud/" + user.id + dir;
               console.log(uri);
               fs.readdir(uri, {withFileTypes:true}, (err, files) =>{
                    if(err == "ENOENT")
                    {
                        res.json({message: "Path not found"});
                    }
                    else
                    {
                        res.json({"files": files});
                    }
               });
           }
    }); 
}

exports.createNewDirectory = createNewDirectory;
exports.showFolderContent = showFolderContent;