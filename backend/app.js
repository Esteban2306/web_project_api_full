const express = require('express');
const mongoose = require('mongoose')
const path = require('node:path');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

mongoose.connect('mongodb://localhost:27017/aroundb')
const { PORT = 3000, BASE_PATH } = process.env;
const app = express();
app.disable('x-powered-by');

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  req.user = {
    _id: '6865cb10eb8b457cfa25e7cc'
  }
  next()
})

app.use(express.json());
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);



app.use((req, res) => {
  res.status(404).json({ message: 'Recurso solicitado no encontrado' });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}${BASE_PATH ? BASE_PATH : ''}`);
});
