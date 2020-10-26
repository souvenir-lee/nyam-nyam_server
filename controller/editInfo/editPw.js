module.exports = {
	post: (req, res) => {
		const { user } = require('../../models')
		if((!req.body.userId || !req.body.currentPassword) || !req.body.password){
			return res.status(400).send('Invalid Request')
		}
		console.log('edit',req.body)
		const {
			userId,
			currentPassword,
			password
		} = req.body

		const userData = 
			user.findOne({
				where : { id : userId, password : currentPassword }
			})
			.then(data => {
				if(!data) return res.status(404).send('기존의 비밀번호를 확인해주세요')
			})

		const updateData =
			user.update({ password : password }, { where : { id : userId, password : currentPassword }})
				.then(() => res.status(201).send('비밀번호가 수정되었습니다.'))
				.catch(err => {
					console.log(err)
					res.status(500).json({'updateData': err})
				})

		userData.then(updateData)
	
	}
};
  