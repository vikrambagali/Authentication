#🔐 Secure Authentication App
A simple Express.js authentication app with secure sign-up, login, session handling, and JWT token-based authentication.

#🛠️ Features
✅ User Registration
Name, email, and password required.

##Validates:

✅ Proper email format (e.g., user@example.com)

✅ Password must contain:

One uppercase letter

One lowercase letter

One number

Minimum 6–8 characters

Passwords are securely hashed using bcrypt.

Redirects to login page after successful registration.

Option to show/hide password in the form.

##🔐 Login
Validates:

Correct email format

Password matching (compared via bcrypt)

Redirects to a protected user dashboard after login.

Invalid attempts return proper error messages.

##🔒 Session Management
Uses secure, HttpOnly cookies to manage sessions.

Implements JWT (JSON Web Token) for stateless authentication.

##🚪 Logout
Clears the session/token.

Redirects back to the login page.

##📦 Technologies Used
Node.js

Express.js

MongoDB + Mongoose

EJS (Templating)

bcrypt (Password hashing)

express-session & cookie-parser

jsonwebtoken (JWT)

validator (Email/Password validation)

Bootstrap 5 + FontAwesome (Styling & Icons)

#📁 Project Structure
csharp
Copy
Edit
project/
├── views/               # EJS templates (login, register, dashboard, etc.)
├── public/              # Static assets (CSS, images, JS)
├── models/              # Mongoose user schema
├── routes/              # All route handlers
├── app.js               # Main app file
├── package.json
└── README.md



#🚀 Getting Started

##Clone the repo

bash
Copy
Edit
git clone 
cd your-repo

##Install dependencies

bash
Copy
Edit
npm install
Run MongoDB (Make sure MongoDB is running locally or use Atlas)

##Start the server

bash
Copy
Edit
node app.js
Visit in browser

arduino
Copy
Edit
http://localhost:5000

##🔐 Environment Variables (Optional)
If you use .env file for sensitive config:

ini
Copy
Edit
PORT=5000
MONGO_URI=mongodb://localhost:27017/your-db
JWT_SECRET=yourSecretKey


#📷 Screenshots
✅ Register Page

✅ Login Page

✅ Protected Dashboard

✅ Show/Hide Password Toggle

#📜 License
This project is open-source and free to use under the MIT License.
