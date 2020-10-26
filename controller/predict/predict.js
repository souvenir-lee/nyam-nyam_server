module.exports = {
	post: async (req, res) => {
		const { store } = require('../../models');
		const { production } = require('../../models');
		const { store_production } = require('../../models');
		const { production_quantity } = require('../../models');
		const dotenv = require('dotenv');
		dotenv.config({ path: './.env' });

		if(req.body.storeId === undefined) return res.status(400).send('잘못된 요청입니다')

		//날씨 요청
		// const weatherURL = (lat, lon) => {
		// 	fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,current&appid=${process.env.WEATHER_KEY}`)
		// 		.then(res => res.json())
		// 		.then(data => data)
		// }	
		
		// let storeWeather =
		// 	await store.findOne({
		// 		where : { id : req.body.storeId},
		// 		attributes : ['latitude','longitude']
		// 	})
		// 	.then(data => {
		// 		let { latitude, longitude } = data
		// 		weatherURL(latitude, longitude)
		// 	})
		

		//store 2에서 파는 물품들
		let salesProduction = 
			await store_production.findAll({ 
				where: { storeId : req.body.storeId},
				include : [production],
				attributes : ['id'],
			});
		// console.log(salesProduction.map(e => {
		// 	return e.dataValues.production.dataValues
		// }))

		//물품들 아이디
		let salesId	= 
			salesProduction.map(e => {
				let arr = []
				arr.push(e.id)
				return arr;
			})
			//console.log(salesId)

		//각각의 양
		let salesProductionQuantity = 
			await production_quantity.findAll({
				where : { id : salesId },
				attributes : { exclude : ["weatherId","createdAt","updatedAt"]},
				order: [['quantity', 'DESC']]
			})
			.then(data =>  {
				//상품 정보
				const productionData = 
					salesProduction.map((e) => {
						let obj = {}
						obj['id'] = e.dataValues.id
						obj['production'] = e.dataValues.production.dataValues
						return obj
					})	

				//상품 id
				const productionId = 	
					salesProduction.map(e => {
						return e.dataValues.id
					})

				const quantityData = 
					data.map(e => {
						let result = []
						for(let i = 0; i < productionId.length ; i++){
							if(productionId[i] === e.dataValues.id){
								productionData[i]['production']['quantity'] = e.dataValues.quantity
								result = productionData[i]
							}
						}
						return result
					})								
				return res.json({
					"storeId" : req.body.storeId,
					quantityData
				})
			})
			.catch(err => {
				console.log(err)
				res.status(500).send(err)
		})

	}
};
