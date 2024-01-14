const express = require("express");
const app = express();
const config = require("config");
const courses = require("./routes/courses");
const customers = require("./routes/customers");
const home = require("./routes/home");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/vidly-courses", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("Connected to DB"))
  .catch((err) => console.error("Failed to connect to DB: ", err));

//Middle Wares
app.use(express.json());
app.use("/api/courses", courses);
app.use("/api/customers", customers);
app.use("/", home);
// console.log("App Name: ", config.get("name"));

//Run the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
