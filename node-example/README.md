# Node App with MongoDB in Docker Containers

Tutorial
---------

[Docker compose : NodeJS with MongoDB](https://www.bogotobogo.com/DevOps/Docker/Docker-Compose-Node-MongoDB.php) 


docker run --rm --read-only -v `pwd`:`pwd` -w `pwd` jordi/ab -T application/json -p post.json -v 2 http://127.0.0.1:3001/item

docker run --rm -v $(pwd):/data skandyla/wrk -s \
  wrk.lua  http://localhost:3001/item