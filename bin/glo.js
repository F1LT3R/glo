
// REQUIRE
var fs = require('fs')
  , recursive = require('recursive-readdir')
  , minimatch = require('minimatch')
  , marked = require('marked')
  , less = require('less')
  , config = require('../package').config
  ;

// GLOBAL VARS
var posts = config.postDir
  , html  = config.htmlDir
  , less_stylesheet = config.less_stylesheet
  ;

  // GET MARKDOWN FILES
  function getMarkdownFiles (callback){
    recursive(posts, function (err, files) {
      files = files.filter(minimatch.filter("*.md", {matchBase: true}))
      callback(files);
    });
  }

  // BUILD POST LIST
  function buildPostList (files) {

    var postList = []

    files.forEach(function(file){

      var info  = file.split('/');
     
      postList.push({
          year  : info[1]
        , month : info[2]
        , day   : info[3]
        , title : info[4]
        , file  : file
      });

    });
    
    postList.forEach(function(post){

      fs.readFile(less_stylesheet, 'utf8', function (err,data) {
        if (err) { return console.log(err); }

        var css_styles;
        less.render(data, function(e, css){
          css_styles = '<style>'+css+'</style>\n\n';  
        });

        fs.readFile(post.file, 'utf8', function (err,data) {
          if (err) { return console.log(err); }
        
          var page = '';
          page += '<!DOCTYPE html>';
          page += '<head>';
          page += css_styles;
          page += '</head>';
          page += '<body>';
          page += '<article>';
          page += marked(data);
          page += '</article>';
          page += '</body>';

          fs.writeFile(html+'/posts/'+post.title+'.html', page, function(err) {
              if(err) {
                  console.log(err);
              } else {
                  console.log("The file '"+post.title+"' was saved!");
              }
           }); 
        });

      }); 

    });

  }


  getMarkdownFiles( buildPostList );