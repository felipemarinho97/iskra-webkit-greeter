#!/bin/bash

cp build/index.html index.html.new
sed 's/\/iskra-webkit-greeter\/demo/build/g' index.html.new > index.html.patched
rm index.html index.html.new
mv index.html.patched index.html
