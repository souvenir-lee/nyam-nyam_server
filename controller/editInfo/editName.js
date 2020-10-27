module.exports = {
	post: async (req, res) => {
		const { user } = require('../../models');
		const jwt = require('jsonwebtoken');
		const access_token = req.headers['x-access-token'];

		if(!req.body.username){
			return res.status(400).send('Invalid Request')
		}

		const decoded = jwt.decode(access_token, { complete: true });
    const account = decoded.payload.account;
    const id = await user.findOne({
      where : { email : account},
      attributes: ['id']
		})
    const checkStore = await store.findOne({where : { id : storeId, userId : id.dataValues.id}})
    console.log(id.dataValues.id, checkStore)
    if(!checkStore) return res.status(404).json('해당 매장은 접근 권한이 없습니다')

		const userData = 
			user.findOne({ where : { id : id.dataValues.id }})
				.then(data => {
					if(!data) {
						res.status(404).send('요청된 유저 정보가 잘못되었습니다.')
					}
				})

		 const updateData = 
		 	user.update({ username : req.body.username }, { where : { id : id.dataValues.id }})
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
  