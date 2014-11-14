var Promise=require('bluebird')
  , fs = require('fs')
  , less = require('less')
  ;


  // fs.readFile('./test.less', 'utf8', function(err, data){
  //   console.log('err: ', err);
  //   console.log('data: ', data);
  // });


  // var css = "@blue:#00F; body{color:@blue;}";

  // less.render(css, function(err, data){
  //   console.log('err: ', err);
  //   console.log('data: ', data);    
  // });


  // fs.readFile('./test.less', 'utf8', function(err, data){
  //   less.render(data, function(err, css){
  //     console.log('data: ', css);
  //   });
  // });


  // var css = "@blue:#00F; body{color:@blue;}";





  res = function(data){
    console.log('RESOLVED:\n\n', data);
    return data;
  }
  rej = function(reason){
    console.log('REJECTED:\n\n', reason);
    return reason;
  }


  function readFile (path) {
    return new Promise(function (resolve, reject) {
      fs.readFile(path, 'utf8', function (err, data) {
        if(err!==null) return reject(err);
        resolve(data);
      });
    });
  }

  function renderLess (less_styles) {
   return new Promise(function (resolve, reject) {
      less.render(less_styles, function (err, css_output) {
        if(err!==null) return reject(err);
        resolve(css_output);
      });
    }); 
  }



  function concat (data) {
    return data.join('');
  }

  
  Promise.all([
    readFile('./test.less'),
    readFile('./test2.less')
  ])
  .then(concat)
  .then(res, rej);

  // var data = readFile('./test.less').then(_res, _rej)
  //   + readFile('./test2.less').then(_res, _rej)
  //   ;
  

  // .then(readFile('./test2.less'))
  // .then(renderLess)
  // .then(_res, _rej);

  
  




















