#!/bin/bash

cd $(dirname $0)
mkdir -p build
cd build
cmake ..
make

if [ $? != 0 ]; then
  exit 1
fi

cd ..
node ~/local/bin/TestRunner.js -t $(pwd)"/tests" -e $(pwd)"/build/"$(basename $(pwd))
