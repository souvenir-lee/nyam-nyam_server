module.exports = {
	post: async (req, res) => {
		const { user } = require('../../models');
		
		if(!req.body.userId || !req.body.username){
			return res.status(400).send('Invalid Request')
		}
		console.log('edit',req.body)
		const userData = 
			user.findOne({ where : { id : req.body.userId }})
				.then(data => {
					if(!data) {
						res.status(404).send('userId가 잘못되었습니다.')
					}
				})

		 const updateData = 
		 	user.update({ username : req.body.username }, { where : { id : req.body.userId }})
			.then((data) => {
				console.log(data === [ 0 ])
				return res.status(201).send('이름이 수정되었습니다.')})
			.catch(err => {
				console.log(err)
				res.status(500).json({'updateData': err})
			})
		
		userData
			.then(updateData)
			.catch(err => res.status(500).send(err))
	}
};
  