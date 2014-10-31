
// REQUIRE
var fs = require('fs')
  , recursive = require('recursive-readdir')
  , minimatch = require('minimatch')
  , marked = require('marked')
  ;

// GLOBAL VARS
var posts = '../posts/'
  , html  = '../html/'
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

      var pre   = 'posts/'
        , post  = '/post.md'
        , start = file.indexOf(pre)
        , end   = file.indexOf(post)
        , path  = file.substr(start+pre.length, end-post.length-1)
        , info  = path.split('/')
        , year  = info[0]
        , month = info[1]
        , day   = info[2]
        , title = info[3]
        ;
     
      postList.push({
          year  : year
        , month : month
        , day   : day
        , title : title
        , file  : file
      });

    });
    
    postList.forEach(function(post){
      fs.readFile(post.file, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      // console.log(marked(data));
        fs.writeFile(html+'/'+post.title+'.html', marked(data), function(err) {
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