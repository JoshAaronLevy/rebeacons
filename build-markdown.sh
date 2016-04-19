#!/bin/bash
set -e


function json_escape(){
  python -c 'import json,sys; print json.dumps(sys.stdin.read())'
}

function helptext(){
  printf "\n"
  echo 'Usage:     ./build-markdown.sh [markdown-folder-path] [jade-template-file.jade]'
  printf "=========\n\n"
  echo 'Example 1: ./build-markdown.sh posts templates/post.jade'
  echo 'Example 2: ./build-markdown.sh ./posts templates/post-with-banner.jade'
  printf "\n"
}

# Source: http://wiki.bash-hackers.org/syntax/ccmd/classic_for#loop_over_lines_of_output
IFS=$'\n'

if [ -n "$1" ]; then
    markdown_files="${1-.}/*.md"
else
    echo 'Error - Please pass a folder with Markdown files (.md)'
    helptext
    exit 1
fi

if [ -n "$2" ]; then
    jade_file="${2}"
else
    echo 'Error - Please pass a jade template file'
    helptext
    exit 1
fi


for filename in $(ls $markdown_files); do
  echo "=== BEGIN: $filename ==="
  outputfile="${filename/.md/.html}"
  htmldata=`cat "$filename" | marked --gfm --breaks --tables --smart-lists | json_escape`
  echo "{\"bodyHtml\": $htmldata}" > /tmp/blog-data.json
  #json="{\"bodyHtml\": \"$encodedHtml\"}"
  #echo "${json}" > $tempJsonDataFile

  pug --obj "/tmp/blog-data.json" < "$jade_file" > "$outputfile"
  echo "=== END: $filename -> $outputfile ==="
done


