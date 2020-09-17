require("dotenv/config");
const express = require("express");
const session = require("express-session");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

const lifetime = 1000 * 60 * 60 * 2;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'shh',
    resave: false,
    saveUninitialized: true, 
    cookie: {
        maxAge: lifetime
    }
}));

app.use(fileUpload());

mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true}, () => console.log("Connected to db"));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

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