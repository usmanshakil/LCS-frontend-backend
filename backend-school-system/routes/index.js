var express = require('express');
var router = express.Router();
var passport  = require('passport')
const users = require('../controller/users')
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = (app) => {
  app.all('/', (req,res) =>{
    return res.status(200).send({message:"Welcome to the School House Express API"})
  });
};
