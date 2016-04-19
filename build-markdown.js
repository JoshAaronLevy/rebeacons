
// function json_escape(){
//   python -c 'import json,sys; print json.dumps(sys.stdin.read())'
// }

// function helptext(){
//   printf "\n"
//   echo 'Usage:     ./build-markdown.sh [markdown-folder-path] [jade-template-file.jade]'
//   printf "=========\n\n"
//   echo 'Example 1: ./build-markdown.sh posts templates/post.jade'
//   echo 'Example 2: ./build-markdown.sh ./posts templates/post-with-banner.jade'
//   printf "\n"
// }
var fs = require('fs');
var jade = require('jade');
var path = require('path');
var globby = require('globby');
var marked = require('marked');

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});
globby.sync(path.resolve(__dirname, './posts') + '/*.md')
.forEach(function(file) {
  var html = marked(fs.readFileSync(file, 'utf8'));
  var jadeOpts = {
    pretty: true,
    filename: path.resolve(__dirname, './templates/post.jade'),
  };
  var jadeStr = fs.readFileSync(path.resolve(__dirname, './templates/post.jade'));
  var rendered = jade.compile(jadeStr, jadeOpts)({bodyHTML: html});
  var htmlFile = file.replace(/\.md$/, '.html');
  rendered = rendered.replace(/href="http:/gi, 'target="_blank" href="http:');
  rendered = rendered.replace(/href="https:/gi, 'target="_blank" href="https:');
  fs.writeFileSync(htmlFile, rendered, 'utf8');
  console.warn('Wrote:', htmlFile)
})
// for filename in $(ls $markdown_files); do
//   echo "=== BEGIN: $filename ==="
//   outputfile="${filename/.md/.html}"
//   htmldata=`cat "$filename" | marked --gfm --breaks --tables --smart-lists | json_escape`
//   echo "{\"bodyHtml\": $htmldata}" > /tmp/blog-data.json
//   #json="{\"bodyHtml\": \"$encodedHtml\"}"
//   #echo "${json}" > $tempJsonDataFile

//   pug --obj "/tmp/blog-data.json" < "$jade_file" > "$outputfile"
//   echo "=== END: $filename -> $outputfile ==="
// done


