#glo

**glo** is a simple blog engine, using node, markdown and less

**glo** compiles your _markdown_ and _less_ into static HTML files that can be easily cached on the server.

##Usage

###Installation

```bash
git clone https://github.com/F1LT3R/glo.git
cd glo
```

Posts are stored as markdown files in the **posts/** directory.

###Compile HTML

HTML is compiled to the **html-output/** directory.

To start compiling the HTML:

```bash
npm start
```

After running _npm start_, the terminal output should look something like this:

```bash
> ~/htdocs/glo ⮀ ⭠ master ⮀ npm start  
> glo@0.1.0 start /Users/[username]/Documents/htdocs/glo  
> node ./bin/glo.js  
> The file 'Happy Halloween!' was saved!  
> The file 'Hello World!' was saved!
```

###Viewing The Output

```bash
ls html-output/posts/
```

Open these files in your browser to see the markdown converted to HTML with the LESS styles converted to CSS.

If you clone **glo** to the _Document Root_ of your webserver, you can point your browser to [http://localhost/glo/html-output/posts](http://localhost/glo/html-output/posts) to see the output.

##Licence

The MIT License (MIT)

Copyright (c) 2014 Alistair MacDonald

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.