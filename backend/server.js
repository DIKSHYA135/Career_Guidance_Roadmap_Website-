const express = require("express");
const cors = require("cors");
require("dotenv").config();

const testRoutes = require("./routes/testRoutes");
const authRoutes = require("./routes/authRoutes");

const loggerMiddleware = require("./middleware/loggerMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

app.use(loggerMiddleware);

app.get("/", (req, res) => {
  res.send("Xyverra Backend Running");
});

app.use("/api", testRoutes);

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});