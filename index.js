const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const helmet = require("helmet");

const app = express();
const saltRounds = 10;

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const MONGODB_URI = "mongodb+srv://28vikram20:Vikram1234@cluster0.dgblvhy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const SESSION_SECRET = "thisisasecret";

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: MONGODB_URI }),
    cookie: { httpOnly: true }
  })
);

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/register", (req, res) => {
  res.render("register", { error: null });
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!validator.isEmail(username)) {
    return res.render("register", { error: "Invalid email format." });
  }

  if (!isValidPassword(password)) {
    return res.render("register", {
      error: "Password must include uppercase, lowercase, number, and be at least 6 characters."
    });
  }

  try {
    const existingUser = await User.findOne({ email: username });
    if (existingUser) {
      return res.render("register", { error: "Email already registered." });
    }

    const hash = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ email: username, password: hash });
    await newUser.save();
    res.redirect("/login");
  } catch (err) {
    res.render("register", { error: "Registration failed." });
  }
});

app.get("/login", (req, res) => {
  res.render("login", { error: null });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ email: username });
    const isMatch = user && await bcrypt.compare(password, user.password);

    if (isMatch) {
      req.session.userId = user._id;
      return res.redirect("/secrets");
    } else {
      res.render("login", { error: "Invalid email or password." });
    }
  } catch (err) {
    res.render("login", { error: "Login failed." });
  }
});

app.get("/secrets", async (req, res) => {
  if (req.session.userId) {
    const user = await User.findById(req.session.userId);
    return res.render("secrets", { email: user.email });
  }
  res.redirect("/login");
});

app.get("/submit", (req, res) => {
  res.render("submitResult");
});

app.post("/submit", (req, res) => {
  res.send("<h1>Your secret is safe with us.</h1>");
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

function isValidPassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  return regex.test(password);
}

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
