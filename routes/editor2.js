var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //console.log("Upper");
  res.render('editor2', { title: 'Editor2', lang: "" });
});

router.get('/:lang', function(req, res, next) {
  //console.log("Lower");
  //console.log(req.params);

  // 404 Handler >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  res.render('editor2', { title: 'Editor2', lang: req.params.lang });
});


module.exports = router;
