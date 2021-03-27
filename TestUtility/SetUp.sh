#!/bin/bash

if [ $# != 1 ]; then
  exit 1
fi

cd $(dirname $0)
mkdir -p tests
node ~/local/bin/TestGetter.js -t $(pwd)"/tests" -u $1

echo -e "cmake_minimum_required(VERSION 3.0.0)
project($(basename $(pwd)) VERSION 0.1.0)

include(CTest)
enable_testing()

add_executable($(basename $(pwd)) main.cpp)

set(CPACK_PROJECT_NAME \${PROJECT_NAME})
set(CPACK_PROJECT_VERSION \${PROJECT_VERSION})
include(CPack)
" > CMakeLists.txt
