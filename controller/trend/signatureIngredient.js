module.exports = {
	get: async(req, res) => {
		console.log('test')
		const { user, store, ingredient, production, store_production, production_ingredient, production_quantity } = 
			require('../../models');

		//주재료별로 필터링해서
		//판매량 많은순으로
		let test = await production_quantity.findAll({
			attributes: { exclude: ['createdAt', 'updatedAt', 'weatherId'] },
			include: [{ all: true, nested: true }]
			// include : {
			// 	model : store_production,
			// 	required : true,
			// 	include : {
			// 		model : production,
			// 		required : true,
			// 		where : { dessertType : 1 }
			// 	}
			// }
		})
		return res.json({'test':test})
	}
};
  