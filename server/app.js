require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user");
const app = express();

// In question.js
const router = express.Router();

// Define your question routes here
router.get("/", (req, res) => {
  res.send("Routes for questions");
});

// Export the router
module.exports = router;


app.use(
  cors({
    origin: "http://localhost:3000", // Replace with the URL of your client application
    credentials: true, // Enable credentials (cookies) support
  })
);
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


  app.use("/api/user", userRoutes);



  

app.get("/", (req, res) => {
  res.send("listining from other side");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("client port ", process.env.CLIENT_URL);
  console.log(`Server is running on port ${PORT}`);
});

