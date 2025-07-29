const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const session = require("express-session");
const saltRounds = 10;

const app = express();

// View engine & static
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Session config
app.use(
  session({
    secret: "thisisasecret",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true }
  })
);

// === Connect to MongoDB (non‑SRV) ===
mongoose
  .connect("mongodb://<username>:<password>@ac‑abcd1234‑shard‑00‑00.mongodb.net:27017,ac‑abcd1234‑shard‑00‑01.mongodb.net:27017,ac‑abcd1234‑shard‑00‑02.mongodb.net:27017/secrets?ssl=true&replicaSet=atlas‑abcd1234‑shard‑0&authSource=admin&retryWrites=true&w=majority")
  .then(() => {
    console.log("✅ Connected to MongoDB");

    app.listen(5000, () => {
      console.log("🚀 Server started on port 5000");
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });

// === User model ===
const userSchema = new mongoose.Schema({ email: String, password: String });
const User = mongoose.model("User", userSchema);

// === Routes ===
app.get("/", (req, res) => res.render("home"));

app.get("/register", (req, res) => res.render("register"));
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!validator.isEmail(username)) return res.send("❌ Invalid email format.");
  if (!isValidPassword(password)) {
    return res.send("❌ Password must have upper, lower, number & minimum 6 chars.");
  }
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    await new User({ email: username, password: hash }).save();
    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.send("❌ Registration failed.");
  }
});

app.get("/login", (req, res) => res.render("login"));
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ email: username });
  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.userId = user._id;
    res.redirect("/secrets");
  } else {
    res.send("❌ Invalid email or password.");
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

app.get("/submit", (req, res) => res.render("submitResult"));
app.post("/submit", (req, res) => {
  res.send("<h1>🎉 Crazy stuff happened! Your secret is safe with us! 🚀</h1>");
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => res.redirect("/login"));
});

// === Validation helper ===
function isValidPassword(password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(password);
}
