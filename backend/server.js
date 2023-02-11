const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { exampleText: 'Joshua Wachana was here.' });
});

app.listen(3000);
