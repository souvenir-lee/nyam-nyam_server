# nyamnyam-server

서버측 코드입니다.

npx sequelize-cli model:generate --name user --attributes email:string,password:string,username:string,nickname:string,token:string
npx sequelize-cli model:generate --name store --attributes userId:INTEGER,storeName:string,storeAddress:string,latitude:INTEGER,longitude:INTEGER
npx sequelize-cli model:generate --name production --attributes storeId:INTEGER,productionName:string,price:INTEGER,info:string,type:INTEGER
npx sequelize-cli model:generate --name ingredient --attributes name:string
npx sequelize-cli model:generate --name weather --attributes name:string

npx sequelize-cli model:generate --name store_production --attributes storeId:INTEGER,productionId:INTEGER
npx sequelize-cli model:generate --name production_ingredient --attributes productionId:INTEGER,ingredientId:INTEGER
npx sequelize-cli model:generate --name production_quantity --attributes store_productionId:INTEGER,date:date,quantity:INTEGER,weatherId:INTEGER
