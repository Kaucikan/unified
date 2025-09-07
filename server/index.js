const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const employeeModel = require("./modules/employee");

const app = express();
app.use(express.json());
app.use(cors());

// 🔑 Use MONGO_URI from environment variables
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  employeeModel
    .findOne({ email: email })
    .then((user) => {
      if (user) {
        if (user.password === password) {
          res.json("success");
        } else {
          res.json("the password was incorrect");
        }
      } else {
        res.json("no record was exist");
      }
    })
    .catch((err) => res.status(500).json("Error: " + err));
});

app.post("/register", (req, res) => {
  employeeModel
    .create(req.body)
    .then((employee) => res.json(employee))
    .catch((err) => res.status(500).json("Error: " + err));
});

// ✅ Use dynamic PORT for Render
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
