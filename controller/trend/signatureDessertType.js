module.exports = {
	get: async (req, res) => {
		console.log('test')
		const { store, production, store_production, production_ingredient, production_quantity } = 
			require('../../models');

		//디저트 종류별 productionId
		let productionIdArray = []
		for(let i = 0; i < 6; i++){
			let productionId = await production.findAll({
				attributes : ['id'],
				where : { dessertType : i, type : 1}
			})
			productionIdArray.push(productionId) 
		}
		
		

		//디저트 종류별 productionId
		const dessertType0	= 
			productionIdArray[0].map(e => {
				let arr = []
				arr = e.id
				return arr;
			})

		const salesProduction = 
			await store_production.findAll({ 
				where: { productionId : productionIdArray[0] },
				include : [production],
				attributes : ['id'],
			});


		const dessertType1	= 
		productionIdArray[1].map(e => {
			let arr = []
			arr = e.id
			return arr;
		})
		const dessertType2	= 
		productionIdArray[2].map(e => {
			let arr = []
			arr = e.id
			return arr;
		})
		const dessertType3	= 
		productionIdArray[3].map(e => {
			let arr = []
			arr = e.id
			return arr;
		})
		const dessertType4	= 
		productionIdArray[4].map(e => {
			let arr = []
			arr = e.id
			return arr;
		})
		const dessertType5	= 
		productionIdArray[5].map(e => {
			let arr = []
			arr = e.id
			return arr;
		})

		const productionQuantity = 
			await production_quantity.findAll({
				where : { id : salesProduction },
				attributes : { exclude : ["weatherId","createdAt","updatedAt"]},
				order: [['quantity', 'DESC']]
			})


		let test = await production_quantity.findAll({
			attributes : { exclude : ['date','weatherId','createdAt','updatedAt']},
			//order: [['quantity', 'DESC']],
			// include : {
			// 	model : store_production,
			// 	where : { productionId : 5 },
			// 	required: true,
				include : {
					model : production,
					where : { type : 1}, 
					// order: [['dessertType', 'DESC']],
					// required: true,
				}
			//},
		})
		return res.json(test)
	}
};
  