
// var q = require("q")
//   , less = require("less")
//   ;

//   var css = "@background: #131313; body{background:@background;}";

//   q.resolve( less.render(css) )
//    .then(function (data) {
//       console.log(data);
//     },function (error) {
//       console.log('Error: ', error);
//     });



var less = require("less");

  var css = "@background: #131313; body{background:@background;}";

  less.render(css, function(err, css_output){
    console.log( css_output );
  })