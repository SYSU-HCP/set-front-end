#! /bin/bash
SITE_PATH='../set-front-end'
cd $SITE_PATH
echo "SYNC the Repository"
git reset --hard origin/master
git clean -f
git pull
git checkout master
echo "DEPLOY the files"
docker restart set-dl-client
docker cp ./deploy/default.conf set-dl-client:/etc/nginx/conf.d/
docker exec set-dl-client nginx -s reload
npm run build
cd build
docker cp . set-dl-client:/usr/share/nginx/html
