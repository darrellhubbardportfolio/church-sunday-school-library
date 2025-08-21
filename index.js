require('dotenv').config();
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const session = require("express-session");
const cookie = require("cookie-parser");

app.use(cookie());
app.use(session({
    secret: process.env.SECRET || 'its a big secret',
    saveUninitialized: false,
    resave: false
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/public", express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

// import models api
const { loadModels } = require("./apis/ModelApi");

const LoginRouter = require("./routes/LoginRouter");
app.use("/login", LoginRouter);

const RegisterRouter = require("./routes/RegisterRouter");
app.use("/register", RegisterRouter);

const LogoutRouter = require("./routes/LogoutRouter");
app.use("/signoff", LogoutRouter);

const HomeRouter = require("./routes/HomeRouter");
app.use("/", HomeRouter);

const BookRouter = require("./routes/BookRouter");
// app.use("/books", BookRouter);

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
    console.log("Server is listening on port ", port);
});