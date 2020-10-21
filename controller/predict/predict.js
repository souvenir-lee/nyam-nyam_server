module.exports = {
	get: async (req, res) => {
		const { production } = require('../../models');
		const { store_production } = require('../../models');
		const { production_quantity } = require('../../models');
		console.log('test', req.headers)
		console.log(req.params.date)

		if(req.body.storeId === undefined) return res.status(404).send('잘못된 요청입니다')

		let salesProduction = 
			await store_production.findAll({ 
				where: { storeId : req.body.storeId},
				include : [production]
			});
		
		// let test = 
		// 	await store_production.getProduction()
		// 	.catch(err => res.send(err))

		let salesProductionQuantity = 
			await production_quantity.findAll({
				attributes : { exclude : ["weatherId","createdAt","updatedAt"]},
				include: [store_production]
			})

			//store_productionId가 storeId로만 연결된듯
		
		return res.json(salesProductionQuantity)

		// production_quantity.findAll({ 
		// 	attributes : { exclude : ["weatherId","createdAt","updatedAt"]},
		// 	include : {
		// 		model : store_production,
		// 		where : { storeId : req.body.storeId},
		// 		//include : { model : production },
		// 	},
		// 	order : [['quantity', 'desc']]
		// })
		// .then(data => {
		// 	return res.status(200).json({
		// 		storeId : req.body.storeId,
		// 		data
		// 	})
		// })
		// .catch(err => {
		// 	console.log(err)
		// 	return res.status(500).send(err)
		// 	})

	}
};
	

// app.get('/concerts_user/:id/:fest_id', (req, res) => {
// 	users.
// 		findOne({
// 			where: { user_Id: req.params.id, },
// 			include: {
// 				attributes: ['concert_Id', 'starttime', 'endtime', 'stage', 'artist', 'con_day', 'festival_Id'],
// 				model: concert,
// 				where: {
// 					festival_Id: req.params.fest_id
// 				},
// 				through: {attributes: []}
// 			}
// 		})
// 		.then(result => {
// 			res.status(200).json(result.Concerts);
// 		})
// 		.catch(error => {
// 			res.status(500).send(error);
// 		})
// 	});