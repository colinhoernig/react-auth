module.exports = function(app) {
  app.get('/', function(req, res, next) {
    res.send(['this is a test', 'another test', 'final test']);
  });
}
