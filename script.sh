#!/usr/bin/env bash
BASE=$(pwd | xargs basename)
cd ../../
JEST=./node_modules/.bin/jest
results -- jest --projects=./packages/$BASE --coverage --runInBand --no-cache && echo $BASE
