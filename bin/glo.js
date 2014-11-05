
// REQUIRE
var //Promise   = require("bluebird")
    Promise   = require("q")
  , fs        = require('fs')
  , _         = require('underscore')
  , minimatch = require('minimatch')
  , less      = require('less')
  // , less      = require('less-compiler')
  , terminal  = require('node-terminal')
  , marked    = require('marked')
  , config    = require('../package').config
  ;


// GLOBAL VARS
var posts_dir       = config.posts_dir
  , html_output_dir = config.html_output_dir
  , less_stylesheet = config.less_stylesheet
  , posts_ext       = "*.md"
  ;



  // Global Error Handling (TBD: this may be v. ugly)
  function error (err) {
    terminal.color('red').write(err);
    return new Error(err);
  }

  function valid (data) {
    return data;
  }



  // Returns string 'file' or 'dir' (based on lstat)
  function isFileOrDir (pathAndFile) {
    var stats = fs.lstatSync(pathAndFile);
    
    if (stats.isFile()) {
      return 'file';
    } else if (stats.isDirectory()) {
      return 'dir';
    }
  }



  // Returns a nested array of all files (recursive)
  function collectFiles (dirList) {
    
    var files = []
      , path = dirList.path
      , type
      , file
      ;
    
    dirList.files.forEach(function (filename) {

      file = path+'/'+filename
      type = isFileOrDir(file);

      switch (type) {
        
        case 'dir':
          files.push(collectFiles(listDir(file))); 
          break;

        case 'file':
          files.push(file);
          break;

      }
    });

    return files;
  }



  // Lists dir files and sub-dirs (exludes . & .. )
  function listDir (dir) {
    return {
      path: dir,
      files: fs.readdirSync(dir)
    };
  }      


  // Flattens a nested file array by an extension type
  function flatten (ary) {
    return _.flatten(ary);
  }

  // Returns an array filtered by extension type
  function filter (ary, ext) {
    return ary.filter(minimatch
      .filter(ext || posts_ext, {matchBase: true}));
  }


  // Returns [{yr, mo, day, title, file}] for every post
  function getPostsMeta (files) {

    var postMeta = []
      , info
      ;

    files.forEach(function (file) {

      info  = file.split('/');
     
      postMeta.push({
          year  : info[1]
        , month : info[2]
        , day   : info[3]
        , title : info[4]
        , file  : file
      });

    });

    return postMeta;
  };
  


  // Reads a file as UTF8 and returns data
  function readFile (file) {
    return fs.readFileSync(file, 'utf8', function (err, data) {
      return data;
    });
  }






  function exportPostsToHTML (postMetaList) {

    // console.log(postMetaList);

    var savedFiles = [];


    postMetaList.forEach(function (post) {


    //     // fs.readFile(post.file, 'utf8', function (err,data) {
    //     //   if (err) { return console.log(err); }
        
    //     //   var page = '';
    //     //   page += '<!DOCTYPE html>';
    //     //   page += '<head>';
    //     //   page += css_styles;
    //     //   page += '</head>';
    //     //   page += '<body>';
    //     //   page += '<article>';
    //     //   page += marked(data);
    //     //   page += '</article>';
    //     //   page += '</body>';

    //     //   // fs.writeFile(html+'/posts/'+post.title+'.html', page, function(err) {
    //     //   //     if(err) {
    //     //   //         console.log(err);
    //     //   //     } else {
    //     //   //       saved.push(post.title);
    //     //   //         console.log("The file '"+post.title+"' was saved!");
    //     //   //     }
    //     //   //  }); 
        
    //     // });

    //   }); 

    });
    
    
    return savedFiles;
  }




  function renderLessToCSS (lessStyles) {
    // console.log(lessStyles);
    // return less.render(lessStyles);
    return less.render(lessStyles);
  }


// less.render(less_data, function (err, css){
//         css_styles = '<style>'+css+'</style>\n\n';    

  function getLessStyleBlock () {

    // styleBlock = '<style></style>';

    var css = readFile(less_stylesheet);

    console.log(css);

    less.render(css, function(err, css){
      // console.log(css);
    });

    // less.render(css, {}).then(function(data){
    //   return data;
    // }, error)

    //less.render(css, {})


    // Promise
    // .resolve(readFile(less_stylesheet))
    // .then(less.render)
    // .then(function(data){
    //   console.log(data);
    // })
    // .catch(error)
    // ;

    // if (err) { return console.log(err); }

    // var css_styles;
    // less.render(data, function(e, css){
    //   css_styles = '<style>'+css+'</style>\n\n';  
    // });
    // });

    // return styleBlock;
  }




  function renderBlog (dir) {  

    var styleBlock = getLessStyleBlock();
    // console.log(styleBlock);

    // Promise.resolve(listDir(dir))
    // .then(collectFiles)
    // .then(flatten)
    // .then(filter)
    // .then(getPostsMeta)
    // // .then(exportPostsToHTML)
    // .then(function (postList) {
    //   console.log("%j", postList);
    // })
    // .catch(error);
    // ;
    // 
    // 
  }

  renderBlog(posts_dir);