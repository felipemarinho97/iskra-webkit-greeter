#!/bin/bash

npm run lint
npm run build
rm -rf demo
cp -r build demo

./patch.sh

