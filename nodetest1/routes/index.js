var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/helloworld', function(req, res){
	res.render('helloworld', { title: 'Hello Vivek!'})
})

// Display the Login page with any flash message, if any
router.get('/', function(req, res){
   	res.render('index', { title: 'Express', message: req.flash('message') });
})
 
/* Handle Login POST */
router.post('/login', passport.authenticate('login', {
   successRedirect: '/home',
   failureRedirect: '/',
   failureFlash : true 
}));
 
/* GET Registration Page */
router.get('/signup', function(req, res){
 res.render('register',{message: req.flash('message')});
});
 
/* Handle Registration POST */
router.post('/signup', passport.authenticate('signup', {
  successRedirect: '/home',
  failureRedirect: '/signup',
  failureFlash : true 
}));
 
router.get('/userlist', function(req, res) {
   var db = req.db;
   var collection = db.get('usercollection');
    collection.find({},function(e,docs){
   		console.log(e);
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

module.exports = router;
