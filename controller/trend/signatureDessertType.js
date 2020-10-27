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

		let test = await production.findAll({
			//attributes : ['id'],
			where : { dessertType : 0, type : 1},
			include : [{model : production_quantity}],
		})

		return res.json(test)
	}
};
  