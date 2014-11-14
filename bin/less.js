
var Promise = require("bluebird")
  , less = require("less")
  ;

  var css = "@background: #131313; body{background:@background;}";

  function renderLess(css){
    return new Promise(function(resolve,reject){
       less.render(css,function(err,data){
          if(err !== null) return reject(err);;
          resolve(data);
       });
    });
  } 

  var stuff = Promise.resolve(renderLess(css))
  .then(function(css_output){
    console.log(css_output);
  }, function(err){
    console.log(err);
  });






// var less = require("less");

//   var css = "@background: #131313; body{background:@background;}";

//   less.render(css, function(err, css_output){
//     console.log( css_output );
//   })