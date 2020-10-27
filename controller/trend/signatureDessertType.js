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

		let p_q_IdArray = []
		//for(let i = 0; i< productionIdArray.length; i++){  //type0 은 8개 s_p는 11개
			productionIdArray[0].map( (el) => {
				let p_q_Id = store_production.findAll({
					attributes : ['id'],
					where : {productionId : el.id}
				})
				.then(data => {
					//console.log('length',data)
					for(let j=0; j< data.length; j++){
						console.log('id', data[j].dataValues)
						p_q_IdArray.push(data[j].dataValues.id)
						console.log('array',p_q_IdArray)
					}
				})
				return p_q_Id
			})
		//}
		
		//console.log('array',p_q_Id)

		return res.json(productionIdArray)
	}
};
  