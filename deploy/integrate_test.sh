#!/bin/bash
docker restart set-dl-client
docker cp ./deploy/default.conf set-dl-client:/etc/nginx/conf.d/
docker exec set-dl-client nginx -s reload
npm run build
cd build
docker cp . set-dl-client:/usr/share/nginx/html
# integrate test env