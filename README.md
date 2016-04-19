# listingconnect-blog

```sh

# Use this syntax to build posts markdown files:
node ./build-markdown.js
jade --pretty index.jade > index.html

# Jade's renaming is awful, stupid lawyers
npm i -g jade@1.8.2
npm i -g jade-cli@0.1.1

```
# Create local version to work on

npm i -g http-server

http-server

(Then copy and paste one of the http links in the browser and run the build-markdown and jade --pretty index.jade)
