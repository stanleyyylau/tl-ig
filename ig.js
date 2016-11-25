var fs = require('fs'),
    genTpl = require('./tepGen.js'),
    // Glocal variables here
    theList = '',
    contentFromDir = [],
    pageTitles = [],
    tpl = '<li><a href="%url%">%title%</a></li>';

    var html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Auto Generated</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
        <style>
            body {
                margin: 0;
                padding: 0;
            }
            ul {
                padding: 15px;
                list-style: none;
                margin: 0;
            }
            li a {
                display: block;
                padding: 10px;
                background-color: #FFEB3B;
                margin-bottom: 10px;
                color: black;
                font-size: 15px;
                border-radius: 10px;
                text-decoration: inherit;
            }
        </style>
    </head>
    <body>
        <ul>
          %theList%
        </ul>
    </body>
    </html>
    `;

fs.readdir('html', function(err, files){
  var fileNameArr = files.filter(function(value){
    return /.\.html/.test(value);
  })

  fileNameArr.forEach(function(value, index){
    var newObj = {
      url: value,
      title: value
    }
    contentFromDir.push(newObj);
  })



  // let's read the content of each html and get the title back as an array
  contentFromDir.forEach(function(value, index){
    fs.readFile('html/' + value.url, 'utf8', function(err, contents) {
        console.log(contents);
        var title = contents.match(/<title>(.*?)<\/title>/)
        pageTitles.push(title[1]);
        value.title = title[1];
    });
  })

})




setTimeout(function(){
  injectHtml();
}, 1000)


function injectHtml(){
  // let's get all the list of htmls
  contentFromDir.forEach(function(value, index){
    theList += genTpl(tpl, value)
  })

  var htmlContent = genTpl(html, {theList: theList});
  fs.writeFile('test.html', htmlContent, function(err){
   if(err){
     return console.log(err);
   }
   console.log('done writing html')
 })
}

