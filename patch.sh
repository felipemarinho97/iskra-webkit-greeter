#!/bin/bash

sed 's/\/iskra-webkit-greeter\/demo/build/g' index.html > index1.html
rm index.html
mv index1.html index.html

