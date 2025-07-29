
### Secure Authentication App Overview
This is a simple authentication application built with Express.js, designed to implement secure user registration, login, session handling, and token-based authentication using JWT (JSON Web Tokens).

### Features

#### User Registration
- **Requirements**: Users must provide a name, email, and password.
- **Validation**:
  - Proper email format (e.g., user@example.com)
  - Password constraints:
    - At least one uppercase letter
    - At least one lowercase letter
    - At least one number
    - Length between 6 to 8 characters
- **Security**: Passwords are securely hashed using bcrypt.
- **Outcome**: Redirects users to the login page after successful registration, with an option to show/hide the password.

#### Login
- **Validation**:
  - Correct email format
  - Password must match (checked using bcrypt)
- **Outcome**: Redirects users to a protected dashboard upon successful login, while invalid attempts return appropriate error messages.

#### Session Management
- Utilizes secure, HttpOnly cookies for managing sessions.
- Implements stateless authentication via JWT.

#### Logout
- Clears the session/token and redirects users back to the login page.

### Technologies Used
- **Languages & Frameworks**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Templating**: EJS (Embedded JavaScript)
- **Security**: bcrypt for password hashing, express-session & cookie-parser for session management, jsonwebtoken for token-based authentication
- **Validation**: validator for email and password validation
- **Styling**: Bootstrap 5 and FontAwesome for UI components

### Project Structure
```
project/
├── views/            # EJS templates (login, register, dashboard, etc.)
├── public/           # Static assets (CSS, images, JS)
├── models/           # Mongoose user schema
├── routes/           # All route handlers
├── app.js            # Main app file
├── package.json      # Project dependencies and metadata
└── README.md         # Project documentation
```

### Getting Started
1. **Clone the Repo**:
   ```bash
   git clone https://github.com/vikrambagali/Authentication
   cd your-repo
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Run MongoDB**: Ensure MongoDB is running locally or use MongoDB Atlas.
4. **Start the Server**:
   ```bash
   node app.js
   ```
5. **Access the App**: Visit `http://localhost:5000` in your web browser.

### Environment Variables (Optional)
For sensitive configurations, you can set environment variables in a `.env` file:
```ini
PORT=5000
MONGO_URI=mongodb://localhost:27017/your-db
JWT_SECRET=yourSecretKey
```

### Screenshots
- Register Page
- <img width="1635" height="995" alt="image" src="https://github.com/user-attachments/assets/b97a244e-e676-412a-abb9-85595ce2583d" />

- Login Page
- Protected Dashboard
- <img width="1549" height="910" alt="image" src="https://github.com/user-attachments/assets/a5b6efed-d801-4489-a379-3147d123d850" />

- Show/Hide Password Toggle

### License
This project is open-source and free to use under the MIT License.

This summary captures the essential features, technologies, structure, and setup instructions for the Secure Authentication App without assuming prior context.
