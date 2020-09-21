require("dotenv/config");
const express = require("express"),
      fileUpload = require("express-fileupload"),
      bodyParser = require("body-parser"),
      mongoose = require("mongoose");
const app = express();
const lifetime = 1000 * 60 * 60 * 24; // 1 segundo * 60 = 60 segundos


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload());

mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true}, () => console.log("Connected to db"));



const sessionsRouter = require("./server/routers/sessions");
const directoryRouter = require("./server/routers/directoryRouter");
const uploadRouter = require("./server/routers/upload");
app.use(sessionsRouter);
app.use(directoryRouter);
app.use(uploadRouter);


app.listen(5600, function()
{
    console.log("Server up on 5600");
});