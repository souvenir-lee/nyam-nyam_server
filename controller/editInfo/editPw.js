module.exports = {
	post: async(req, res) => {
		const { user } = require('../../models')
		const jwt = require('jsonwebtoken');
		const access_token = req.headers['x-access-token'];
		
		if((!req.body.currentPassword) || !req.body.password){
			return res.status(400).send('Invalid Request')
		}
		console.log('edit',req.body)
		const {
			currentPassword,
			password
		} = req.body

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
			user.findOne({
				where : { id : id.dataValues.id, password : currentPassword }
			})
			.then(data => {
				if(!data) return res.status(404).send('기존의 비밀번호를 확인해주세요')
			})

		const updateData =
			user.update({ password : password }, { where : { id : id.dataValues.id, password : currentPassword }})
				.then(() => res.status(201).send('비밀번호가 수정되었습니다.'))
				.catch(err => {
					console.log(err)
					res.status(500).json({'updateData': err})
				})

		userData.then(updateData)
	
	}
};
  