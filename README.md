# hsa-l4-homework

Run `docker-compose up -d`  

Populate test data with post request to  
`http://localhost:3001/items`

Route for stress tests
`http://localhost:3001/item/random`  
GET request will return random item with id from 1 to 10. The item will be created if not exist  

To simulate slow request there is a delay 100ms 

To enable cache use this url. To not warm up cache and simulate cache stampede random item from 1 to 10 will be return  
`http://localhost:3001/item/random?cache=true`  

without cache `siege -c10 -t 60S http://localhost:3001/item/random`

with cache  `siege -c10 -t 60S http://localhost:3001/item/random?cache=true`

##### Results for my machine
| Concurrency  | Cache | Availability % | Avg response time, sec | Throughput, trans/sec
| ------------ | ----- | ------------ | ----------------- | ---------
| 10  | No  | 100 | 3.18 | 3
| 10  | Yes  | 100 | 0.03 | 366.10
| 25  | No  | 100 | 7.10 | 3.15
| 25  | Yes  | 100 | 0.06 | 424.59
| 50  | No  | 100 | 14.56 | 2.80
| 50  | Yes  | 100 | 0.11 | 439.34
| 100 | No | 100 | 21.71 | 2.72
| 100 | Yes | 100 | 0.22 | 441.88