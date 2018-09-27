#!/bin/bash

npm run build
rm -rf demo
cp -r build demo

./patch.sh

