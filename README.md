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

#### add-column 방법 reference
https://medium.com/@jonghyun_park/sequelize-cli-%EC%82%BD%EC%A7%88%EA%B8%B0-column-%EC%B6%94%EA%B0%80%ED%95%98%EA%B8%B0-915b26e9c013

1. npx sequelize migration:generate --name [add-column] //add-column 부분은 이름이기 때문에 인식하기 쉬운 이름이면 좋음
2. 마이그레이션 파일이 만들어짐
3. 만들어진 파일의 up부분에 코드를 넣음. 이때, 레퍼런스처럼 async가 아니라 포멀한 방식으로 작성하기
4. 테이블 이름으로 인식하니 테이블 이름 참고하여 복수형으로 작성하기

    //"typescript": "^4.0.3"