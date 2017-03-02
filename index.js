var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todo'
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("statics"));


app.get('/todos', function(req, res) {
    connection.query('select * from todos', function(err, rows) {
        if (err) {
            console.log("Error reading table");
            res.sendStatus(500);
        }
        res.json(rows);
    })
});

app.post('/todos', function(req, res) {
    if (!req.body || !req.body.description || !req.body.status) {
        console.log('bad request');
        return res.sendStatus(400);
    }

    var query = `INSERT INTO todos(description,status)
    VALUES ('${req.body.description}','${req.body.status}')`;
    connection.query(query, function(err, result) {
        if (err) {
            console.log("Error reading todos" + err.toString());
            return res.sendStatus(500);
        }
        res.json(result);

    });

});

app.put('/todos', function(req, res){
  var q = `UPDATE todos set description='${req.body.description}', status='${req.body.status}'
  where id=${req.body.id}`;
  connection.query(q, function(err, result){
    if(err){
      console.log("Error updating todos with id: "+req.body.id);
      console.log(err.toString());
      return res.sendStatus(500);
    }
    res.json(result);
  });
});








app.listen(8890);
