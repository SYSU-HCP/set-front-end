# 创建nginx容器
docker stop set-dl-client
docker rm set-dl-client
docker run -p 8999:80 --name set-dl-client -dit nginx:alpine
npm install
npm run build

