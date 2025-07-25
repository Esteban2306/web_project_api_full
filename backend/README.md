# Around US Express

## Description

Around Express is a RESTful API developed with Node.js and Express that provides functionalities for managing users and cards. The API allows creating, reading, updating, and deleting users and cards, as well as managing likes on cards.

## Features

- Complete user management (CRUD)
- Complete card management (CRUD)
- Card like system
- Data validation
- Error handling
- User avatar support

## Technologies

- Node.js
- Express.js
- MongoDB/Mongoose
- JavaScript ES6+

## Project Structure

```
web_project_around_express/
├── controllers/      # Route controllers
├── models/          # Data models
├── routes/          # Route definitions
├── app.js           # Main configuration
└── package.json     # Project dependencies
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your MongoDB database
4. Start the server:
   ```bash
   npm start
   ```

## Endpoints

### Users

- `GET /users` - Get all users
- `GET /users/:userId` - Get user by ID
- `POST /users` - Create new user
- `PATCH /users/:userId` - Update user
- `PATCH /users/:userId/avatar` - Update user avatar

### Cards

- `GET /cards` - Get all cards
- `POST /cards` - Create new card
- `DELETE /cards/:cardId` - Delete card
- `PUT /cards/:cardId/likes` - Like a card
- `DELETE /cards/:cardId/likes` - Unlike a card

## Data Validation

- All fields are required
- URL validation for avatars
- Minimum and maximum length for text fields
- Custom error handling

## Error Handling

The API returns clear and consistent error messages:
- 400 - Bad Request
- 404 - Not Found
- 500 - Internal Server Error

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
