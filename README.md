Todo Application :----

//To start frontend of the application:--
1) npm install
2) npm run dev

//To start backend of the application:--
1) npm install
2) you should have a redis cloud account or docker to run redis . I had docker so i used docker container to run redis image if you have docker in your system then use the url
   docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest 
4) make a dotenv file and store the mongoDB cluster url
5) npm start 
