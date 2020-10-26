# nyamnyam-server

서버측 코드입니다.

npx sequelize-cli model:generate --name user --attributes email:string,password:string,username:string,userImg:string,access_token:string,refresh_token:string,social:string
npx sequelize-cli model:generate --name store --attributes userId:INTEGER,storeName:string,storeAddress:string,latitude:INTEGER,longitude:INTEGER

npx sequelize-cli model:generate --name production --attributes storeId:INTEGER,productionName:string,productionImg:string,price:INTEGER,info:string,dessertType:INTEGER,type:INTEGER

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

user.associate = function (models) {  
user.hasMany(models.store, { foreignKey: 'userId' })
}

store.associate = function(models) {
store.belongsTo(models.user, {foreignKey: 'userId'})};

---

store_production.associate = function (models) {  
store_production.hasMany(models.production_quantity, { foreignKey: 'store_productionId' })
}

production_quantity.associate = function(models) {
production_quantity.belongsTo(models.store_production, {foreignKey: 'store_productionId'})};

---

store.belongsToMany(models.production, {
through: 'store_production',
foreignKey: 'storeId'
})

production.belongsToMany(models.store, {
through: 'store_production',
foreignKey: 'productionId'
})

store_production.associate = function(models) {
store_production.belongsTo(models.store, {
foreignKey: 'storeId'
});
store_production.belongsTo(models.production {
foreignKey: 'productionId'
})
};

---

production.belongsToMany(models.ingredient, {
through: 'production_ingredient',
foreignKey: 'productionId'
})

ingredient.belongsToMany(models.production, {
through: 'production_ingredient',
foreignKey: 'ingredientId'
})

production_ingredient.associate = function(models) {
production_ingredient.belongsTo(models.production, {
foreignKey: 'productionId'
});
production_ingredient.belongsTo(models.ingredient, {
foreignKey: 'ingredientId'
})
};
