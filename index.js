const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const session = require("express-session");
<<<<<<< HEAD
const saltRounds = 10;
const MongoStore = require('connect-mongo');
const helmet = require('helmet');

=======
const MongoStore = require("connect-mongo");
const helmet = require("helmet");
>>>>>>> 8a2081a (Your message here)

const app = express();
const saltRounds = 10;

<<<<<<< HEAD
app.use(helmet());
app.use(session({
  secret: "thisisasecret",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  }),
  cookie: { httpOnly: true }
}));

// View engine and static files
app.set("view engine", "ejs");
=======
// === Security Middleware ===
app.use(helmet());
>>>>>>> 8a2081a (Your message here)
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

<<<<<<< HEAD
// Session setup
=======
// === MongoDB Configuration ===
const MONGODB_URI = "mongodb+srv://28vikram20:Vikram123@cluster0.dgblvhy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const SESSION_SECRET = "thisisasecret"; // Hardcoded for now

// === Session Setup ===
>>>>>>> 8a2081a (Your message here)
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: MONGODB_URI
    }),
    cookie: { httpOnly: true }
  })
);

<<<<<<< HEAD
// ===== Connect to MongoDB =====
mongoose.connect("mongodb+srv://28vikram20:Vikram123@cluster0.dgblvhy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
// ===== User Schema and Model =====
=======
// === MongoDB Connection ===
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });

// === Mongoose Schema ===
>>>>>>> 8a2081a (Your message here)
const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

const User = mongoose.model("User", userSchema);

// === Routes ===

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!validator.isEmail(username)) {
    return res.send("❌ Invalid email format.");
  }

  if (!isValidPassword(password)) {
<<<<<<< HEAD
    return res.send("❌ Password must have uppercase, lowercase, number, and 6+ characters.");
=======
    return res.send("❌ Password must include uppercase, lowercase, number, and be 6+ characters.");
>>>>>>> 8a2081a (Your message here)
  }

  try {
    const hash = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ email: username, password: hash });
    await newUser.save();
    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.send("❌ Registration failed.");
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
<<<<<<< HEAD
=======

>>>>>>> 8a2081a (Your message here)
  try {
    const user = await User.findOne({ email: username });
    if (user && await bcrypt.compare(password, user.password)) {
      req.session.userId = user._id;
      res.redirect("/secrets");
    } else {
      res.send("❌ Invalid email or password.");
    }
  } catch (err) {
    console.error(err);
    res.send("❌ Login failed.");
  }
});


app.get("/secrets", async (req, res) => {
  if (req.session.userId) {
    const user = await User.findById(req.session.userId);
    res.render("secrets", { email: user.email });
  } else {
    res.redirect("/login");
  }
});

app.get("/submit", (req, res) => {
<<<<<<< HEAD
  res.render("submitResult"); // or another view if needed
});

app.post("/submit", (req, res) => {
  // Process submitted data
=======
  res.render("submitResult");
});

app.post("/submit", (req, res) => {
>>>>>>> 8a2081a (Your message here)
  res.send("<h1>🎉 Crazy stuff happened! Your secret is safe with us! 🚀</h1>");
});

app.get("/logout", (req, res) => {
<<<<<<< HEAD
  req.session.destroy((err) => {
=======
  req.session.destroy(() => {
>>>>>>> 8a2081a (Your message here)
    res.redirect("/login");
  });
});

<<<<<<< HEAD
// ===== Password Validator =====
=======
// === Password Validator ===
>>>>>>> 8a2081a (Your message here)
function isValidPassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  return regex.test(password);
}
<<<<<<< HEAD
=======

// === Start Server ===
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
>>>>>>> 8a2081a (Your message here)
