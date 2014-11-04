
// REQUIRE
var Promise   = require("bluebird")
  // , fs        = Promise.promisifyAll(require('fs'))
  , fs        = require('fs')
  // , recursive = Promise.promisifyAll(require('recursive-readdir'))
  , minimatch = require('minimatch')
  , marked    = require('marked')
  , less      = require('less')
  , terminal  = require('node-terminal') // terminal.color('magenta').write('Unicorn');
  , config    = require('../package').config
  ;


// GLOBAL VARS
var posts_dir = config.postDir
  , posts_ext = '.md'
  , html_dir = config.htmlDir
  , less_stylesheet = config.less_stylesheet
  ;


  

  function filterMarkdownFiles (err, files) {
    return files.filter(minimatch.filter("*.md", {matchBase: true}));
  }

  function readDirForFiles (posts_dir, filter) {
    // return Promise.resolve(recursive(posts_dir, function (err, files) {
    //   console.log(files);
    //   return files;
    // }));


  }

  
  function readFile (file, callback) {
    fs.readFile(file, 'utf8', function (err, data) {
      if (err) {
        return console.log(err);
      } else {
        callback(data);
      }
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

    return postList;

  };
  

  function exportPostsToHTML (postList) {

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


  function fileOrDir (pathAndFile) {
    var stats = fs.lstatSync(pathAndFile);
    
    if (stats.isFile()) {
      return 'file';
    } else if (stats.isDirectory()) {
      return 'dir';
    }
  }

  // Returns a directory object
  function makeDirectoryObject (list) {
    var returnObject = []
      , path = list.path
      , type
      , url
      ;
    
    list.files.forEach(function (file) {
      
      url = path+'/'+file
      type = fileOrDir(url);
      
      // console.log(url);

      if (type==='dir') {
        
        var subDir = listDir(url);
        var subDirObj = makeDirectoryObject(subDir);

        // console.log('subDir_____________________________');
        // console.log(subDirObj);

        returnObject.push(subDirObj);

      }else if (type==='file') {
        returnObject.push(url);
      }

    });

    return returnObject;
  }


  // Returns array filled with files in a directory
  function listDir (dir) {
    return {
      path: dir,
      files: fs.readdirSync(dir)
    };
  }      




  function yes (data) {
    // console.log('Fulfilled: ', data);
    return data;
  }
  function no (err) {
    console.log('Rejected: ', err);
  }



  var thePosts = Promise.resolve(listDir(posts_dir))
    .then(makeDirectoryObject)
    .done(function(data){
      console.log("Done: %j", data);
    });
    // .then(function(data){
    //   // console.log(arguments);
    //   return data;
    // },no);
  
  // console.log(thePosts);
