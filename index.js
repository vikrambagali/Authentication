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

<<<<<<< HEAD
=======
// === Security Middleware ===
>>>>>>> 8a2081a375b2108090312cfd8333ab497508840b
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
<<<<<<< HEAD

const MONGODB_URI = "mongodb+srv://28vikram20:Vikram1234@cluster0.dgblvhy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const SESSION_SECRET = "thisisasecret";
=======
>>>>>>> 8a2081a375b2108090312cfd8333ab497508840b

// === MongoDB Configuration ===
const MONGODB_URI = "mongodb+srv://28vikram20:Vikram123@cluster0.dgblvhy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const SESSION_SECRET = "thisisasecret"; // Hardcoded for now

// === Session Setup ===
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
<<<<<<< HEAD
    store: MongoStore.create({ mongoUrl: MONGODB_URI }),
=======
    store: MongoStore.create({
      mongoUrl: MONGODB_URI
    }),
>>>>>>> 8a2081a375b2108090312cfd8333ab497508840b
    cookie: { httpOnly: true }
  })
);

<<<<<<< HEAD
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  });

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
>>>>>>> 8a2081a375b2108090312cfd8333ab497508840b
const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

const User = mongoose.model("User", userSchema);

<<<<<<< HEAD
=======
// === Routes ===

>>>>>>> 8a2081a375b2108090312cfd8333ab497508840b
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/register", (req, res) => {
  res.render("register", { error: null });
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!validator.isEmail(username)) {
<<<<<<< HEAD
    return res.render("register", { error: "Invalid email format." });
  }

  if (!isValidPassword(password)) {
    return res.render("register", {
      error: "Password must include uppercase, lowercase, number, and be at least 6 characters."
    });
=======
    return res.send("❌ Invalid email format.");
  }

  if (!isValidPassword(password)) {
    return res.send("❌ Password must include uppercase, lowercase, number, and be 6+ characters.");
>>>>>>> 8a2081a375b2108090312cfd8333ab497508840b
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
<<<<<<< HEAD
    res.render("register", { error: "Registration failed." });
=======
    console.error(err);
    res.send("❌ Registration failed.");
>>>>>>> 8a2081a375b2108090312cfd8333ab497508840b
  }
});

app.get("/login", (req, res) => {
  res.render("login", { error: null });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ email: username });
<<<<<<< HEAD
    const isMatch = user && await bcrypt.compare(password, user.password);

    if (isMatch) {
      req.session.userId = user._id;
      return res.redirect("/secrets");
    } else {
      res.render("login", { error: "Invalid email or password." });
    }
  } catch (err) {
    res.render("login", { error: "Login failed." });
=======
    if (user && await bcrypt.compare(password, user.password)) {
      req.session.userId = user._id;
      res.redirect("/secrets");
    } else {
      res.send("❌ Invalid email or password.");
    }
  } catch (err) {
    console.error(err);
    res.send("❌ Login failed.");
>>>>>>> 8a2081a375b2108090312cfd8333ab497508840b
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
<<<<<<< HEAD
  res.send("<h1>Your secret is safe with us.</h1>");
=======
  res.send("<h1>🎉 Crazy stuff happened! Your secret is safe with us! 🚀</h1>");
>>>>>>> 8a2081a375b2108090312cfd8333ab497508840b
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

<<<<<<< HEAD
=======
// === Password Validator ===
>>>>>>> 8a2081a375b2108090312cfd8333ab497508840b
function isValidPassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  return regex.test(password);
}

<<<<<<< HEAD
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
=======
// === Start Server ===
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
>>>>>>> 8a2081a375b2108090312cfd8333ab497508840b
});
