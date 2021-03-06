#!/usr/bin/env sh

# abort on errors
set -e

# build
#npm run build
vue-cli-service build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
echo 'tide.duiker101.net' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f https://github.com/duiker101/reddit-tide.git master:gh-pages

cd -

rm -rf dist
