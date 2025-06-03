const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/user.route");
const projectRoutes = require("./routes/project.route");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend API is running");
});

app.use("/users", userRoutes);

// Only register projectRoutes if it is a valid router
if (projectRoutes && typeof projectRoutes === "function") {
  app.use("/projects", projectRoutes);
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
