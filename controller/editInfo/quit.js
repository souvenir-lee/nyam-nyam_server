module.exports = {
	post: async (req, res) => {
		const { user } = require('../../models');

		if(
			req.body === undefined ||
			!req.body.userId) 
			{
				return res.status(400).send('잘못된 요청입니다')
			}

		await user.findOne({ where : { id : req.body.userId }})
			.catch(err => res.send(err))
		await user.destroy({ where : { id : req.body.userId}})
			.then(() => res.status(201).send('회원탈퇴 되었습니다'))
	}
};
