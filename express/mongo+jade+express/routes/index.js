var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hello', function(req, res, next) {
  res.render('hello', { title: 'Hello!' });
});

router.get('/newuser', function(req, res) {
  res.render('newuser', {title: 'Add New User'});
});

router.get('/user/:id', function(req, res, next) {
  var db = req.db;
  var id = req.params.id;
  var collection = db.get('usercollection');
  collection.findOne({ _id: id }, function (e, doc) {
      res.render('user', {
          "user": doc
      });
  });
});

router.post('/adduser', function(req, res) {

    //设置数据库参数
    var db = req.db;

    //从表单中获得数据
    var username = req.body.username;
    var userEmail = req.body.useremail;

    //设置collection
    var collection = db.get('usercollection');

    //Submit to the DB
    collection.insert({
        "username": username,
        "email": userEmail
    },function(err, doc){
        if(err) {
            res.send("There was a problem adding the information to the database.");
        } else {
            res.redirect("users");
        }
    });
});

router.post('/user/:id', function(req, res) {
  var db = req.db;
  var id = req.params.id;
  db.get('usercollection').update({ _id: id }, req.body,
    function(err, doc) {
      if(err) {
        res.send("There was a problem adding the information to the database.");
      } else {
        res.redirect(`/user/${id}`);
      }
    });
});

module.exports = router;
