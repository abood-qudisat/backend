# Learning Management System (LMS) API

A robust and secure RESTful API for a modern Learning Management System built with Node.js, Express, and PostgreSQL.

## Features

- 🔐 **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (Admin, Instructor, Student)
  - Google OAuth 2.0 integration
  - Secure password hashing with bcrypt

- 📚 **Course Management**
  - Create and manage courses
  - Organize content into modules and lessons
  - Categorize courses
  - Track student progress

- 🎓 **Learning Experience**
  - Interactive quizzes
  - Assignment submissions
  - Progress tracking
  - Course enrollment

- 🛡️ **Security**
  - SQL injection protection
  - CSRF protection
  - Rate limiting
  - Secure headers (Helmet)
  - Input validation

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT, Passport.js
- **Security**: Helmet, express-rate-limit, cors
- **File Uploads**: Multer
- **Validation**: Joi

## Prerequisites

- Node.js (v14+)
- PostgreSQL (v12+)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone [your-repository-url]
   cd server
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```env
   NODE_ENV=development
   PORT=5000
   DATABASE_URL=postgresql://username:password@localhost:5432/lms_db
   JWT_SECRET=your_jwt_secret_here
   JWT_EXPIRES_IN=1d
   BCRYPT_SALT_ROUNDS=10
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   CORS_ORIGIN=http://localhost:3000
   SESSION_SECRET=your_session_secret
   ```

4. **Database Setup**
   - Create a new PostgreSQL database
   - Run the database migrations (if any)

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## API Documentation

Once the server is running, you can access the API documentation at:
- Swagger UI: `http://localhost:5000/api-docs`
- API Base URL: `http://localhost:5000/api`

## Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon
- `npm test` - Run tests
- `npm run lint` - Lint the codebase
- `npm run format` - Format the code using Prettier

## Project Structure

```
server/
├── config/           # Configuration files
│   ├── db.js         # Database configuration
│   ├── passport.js   # Passport authentication
│   └── multer.js     # File upload configuration
├── controllers/      # Route controllers
├── middleware/       # Custom middleware
├── models/           # Database models
├── routes/           # API routes
├── uploads/          # Uploaded files
├── utils/            # Utility functions
├── .env              # Environment variables
├── app.js            # Express application
└── server.js         # Server entry point
```

## Security Considerations

- All database queries use parameterized queries to prevent SQL injection
- Passwords are hashed using bcrypt
- JWT tokens are used for authentication
- Rate limiting is implemented to prevent brute force attacks
- CORS is properly configured
- Secure headers are set using Helmet

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.

---

Built with ❤️ by [Your Name]
