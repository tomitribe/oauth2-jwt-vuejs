#!/bin/bash
#pr.sh

git checkout master

#Ensure upstream is added to your fork
#This will not be a problem if it exists
git remote add upstream https://github.com/tomitribe/login-moviefun.git

#Update fork of project to current master
git fetch -v upstream
git checkout master
git merge -v upstream/master
git push -v
