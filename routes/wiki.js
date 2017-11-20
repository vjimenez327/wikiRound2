const express = require('express');
const router = express.Router();
const user = require('./user');
const models = require('../models');
const Page = models.Pages;
const User = models.Users;



router.get('/', (req,res, err) => {
  res.redirect('/')
});


router.post('/', (req,res, next) => {
    var newPage = Page.build(req.body);

    newPage.save()
      .then(() => {
        res.json(newPage)
      })
      .catch((err) => {
        next(err);
      })
    // res.redirect('/');
});


router.get('/add', (req,res) => {
  res.render('addpage');
});


router.get('/:urlTitle', (req,res,next) => {

  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
  .then((pageFound) => {
    if(pageFound === null){
      return next(new Error('That page was not found!'));
    }
    res.render('wikipage', {
      page: Page
    });
  })
  .catch(next);
})

module.exports = router;
