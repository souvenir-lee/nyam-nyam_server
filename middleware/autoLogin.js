const checkTokenMiddleware = async (req, res, next) => {
	console.log('check 들어옴');
	const { user, store } = require('../models');
	const jwt = require('jsonwebtoken');
	const access_token = req.headers['x-access-token'] 
	require('dotenv').config();

	if (!access_token) {
		console.log('access token이 없습니다');
		return res.status(404).json('잘못된 요청입니다. 토큰을 확인해주세요');
	}

	const decoded = jwt.decode(access_token, { complete: true });
  const account = decoded.payload.account;

	 user
		.findOne({
			attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
			where: { email: account },
		})
		.then(async (userdata) => {
			let { id } = userdata
			console.log(id)

			//store 정보 받기
			const storedata = 
				await store.findAll({
					attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
					where : { userId : id}
				})
				.then(data => {
					let result = []
					let storeArr = data.map(e => {
						result = e.dataValues
						return result
					})
					return storeArr
				})
				.catch(err => console.log(err))

			//reponse
			return res.status(200).json({
				message: 'login data check',
				userdata,
				storedata
			});
		})
		.catch(err => res.status(500).send(err));
};

module.exports = checkTokenMiddleware;
  