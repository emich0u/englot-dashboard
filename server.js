const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/usersAuth");
const profile = require("./routes/api/profile");
const product = require("./routes/api/product");
const feedback = require("./routes/api/feedback");
const card = require("./routes/api/card");
const admin = require("./routes/api/adminAuth");
const order = require("./routes/api/order");
const grades = require("./routes/api/gradesApi");
const exerciceF = require("./routes/api/exerciceFApi");
const exerciceQ = require("./routes/api/exerciceQApi");

const app = express();

// body parser middlerware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected "))
  .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

//passeport config
require("./config/passeport")(passport);

// Use Routes
app.use("/api/exerciceQ",exerciceQ);
app.use("/api/exercicef",exerciceF);
app.use("/api/grades",grades);
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/products", product);
app.use("/api/feedback", feedback);
app.use("/api/card", card);
app.use("/api/admin", admin);
app.use("/api/order", order);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
