# node-performance
------------------

* users: **2k**
* ramp-up period: **5 seconds**
* loop count: **3**

### Env
intel core i3  
3,3Ghz x 4  
RAM 15,4 GB  
ubuntu 14.04 64 bit  

### Stack
node.js 0.10.26  
sequelize.js 2.0.6  
express 4.12.3  
jade (precompiled) 1.9.2  

### Flow
execute simple select query (one table) 10 rows using sequelize.js  
serve with express  
render with help of jade  

### Results with single process:
avarage response time **1300 ms**  
max response time **3600ms**  
throughtput **570/sec**  

### Results with 4 processes:
avarage response time **250 ms**  
max response time **1600ms**  
throughtput **560/sec** 
