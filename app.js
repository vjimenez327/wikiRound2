const express = require('express');
const nunjucks = require('nunjucks');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const models = require('./models');
const router = require('./routes');

nunjucks.configure()

app.engine('html', nunjucks.render) // how to render html templates
app.set('view engine', 'html') // what file extension do our templates have
nunjucks.configure('views', { noCache: true }) // where to find the views, caching off

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express. static(__dirname + '/public'));


app.use('/', router);

 //error handling middleware, need 4 params to work
app.use((err, req, res, next) => {
  console.error(err);
  res.send(500, err.message);
});


models.User.sync({
  force: true
})
  .then(() => {
      return models.Pages.sync()
    })
  .then(() => {
    app.listen(3000, () => console.log('app is listening on port 3000'));
  })
  .catch(console.error);
