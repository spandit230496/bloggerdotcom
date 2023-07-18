const express = require("express");
const database = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
database();

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

app.listen(5000, () => {
  console.log("connected");
});
