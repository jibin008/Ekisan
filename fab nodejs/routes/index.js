var express = require('express');
var router = express.Router();
var db = require("../configure/db_connection");
var moment = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.query ( 'SELECT * FROM notification_tb',function(err, result) {
    if (err) throw err;
    if(result.length > 0) {
      data = result;
      console.log(data);
      res.render('index', { title: 'Express', name: "Hello", req: req, nt: result });
    }
  });
});

module.exports = router;
