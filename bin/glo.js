
// REQUIRE
var fs = require('fs')
  , recursive = require('recursive-readdir')
  , minimatch = require('minimatch')
  , marked = require('marked')
  , config = require('../package').config
  ;

// GLOBAL VARS
var posts = config.postDir
  , html  = config.htmlDir
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
      fs.readFile(post.file, 'utf8', function (err,data) {
        if (err) { return console.log(err); }
      
        var page = '';

        page+=marked(data);

        fs.writeFile(html+'/posts/'+post.title+'.html', page, function(err) {
            if(err) {
                console.log(err);
            } else {
                console.log("The file '"+post.title+"' was saved!");
            }
         }); 
      });
    });
  }


  getMarkdownFiles( buildPostList );