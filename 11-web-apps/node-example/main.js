var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(function (req, res, next) {
  req.connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'demo'
  });
  req.connection.connect(next);
});

app.get('/records', function (req, res, next) {
  req.connection.query('SELECT * FROM TBL', function (err, rows) {
    req.connection.end(function () { // ignoring an error here
      if (err) { return next(err); }
      res.send(rows);
    });
  });
});

app.post('/records', function (req, res, next) {
  req.connection.query('INSERT INTO TBL(FIRST_NAME, LAST_NAME) VALUES ?', [[[req.body.firstName, req.body.lastName]]], function (err) {
    req.connection.end(function () { // ignoring an error here
      if (err) { return next(err); }
      res.send();
    });
  });
});

app.put('/records/:id', function (req, res, next) {
  req.connection.query('UPDATE TBL SET FIRST_NAME = ?, ' +
    'LAST_NAME = ? WHERE ID = ?',
    [req.body.firstName, req.body.lastName, req.params.id],
    function (err) {
    req.connection.end(function () { // ignoring an error here
      if (err) { return next(err); }
      res.send();
    });
  });
});

app.delete('/records/:id', function (req, res, next) {
  req.connection.query('DELETE FROM TBL WHERE ID = ?', [req.params.id], function (err) {
    req.connection.end(function () { // ignoring an error here
      if (err) { return next(err); }
      res.send();
    });
  });
});

app.listen(3000);
