const express = require('express');
const mongoose = require('mongoose')
const path = require('node:path');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { loginUser, createUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middleware/logger');
const auth = require('./middleware/auth');

mongoose.connect('mongodb://localhost:27017/aroundb')
const { PORT = 3000, BASE_PATH } = process.env;
const app = express();
app.disable('x-powered-by');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use(requestLogger);

app.post('/signin', loginUser)
app.post('/signup', createUser);

app.use(auth)

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(errorLogger);

app.use((req, res) => {
  res.status(404).json({ message: 'Recurso solicitado no encontrado' });
});

app.use((err, req, res, next) => {
  console.error(err);
  const { statusCode = 500, message } = err;
  res.status(statusCode).json({
    message: statusCode === 500 ? 'Error interno del servidor' : message
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}${BASE_PATH ? BASE_PATH : ''}`);
});
