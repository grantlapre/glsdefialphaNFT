set -e

env PUBLIC_URL=https://grantlapre.github.io/glsdefialpha npm run build

cd build

git init
git add -a
git commit -m 'deploy'
git push -f git@github.com:grantlapre/glsdefialpha.git main:gh-pages2git add 