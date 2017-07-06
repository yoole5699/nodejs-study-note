var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({}, {}, function (e, docs) {
      res.render('userlist', {
          "userlist": docs
      });
  });
});

router.delete('/', function(req, res, next) {
    var db = req.db;
    var userId = req.body.userId;
    //设置collection
    var collection = db.get('usercollection');

    //Submit to the DB
    collection.remove({
        "_id": userId
    }, function(err, docs){
        if(err){
            res.send("There was a problem adding the information to the database.");
        } else{
            res.send({ data: docs, message: 'success' });
        }
    });
});

module.exports = router;
