module.exports = {
	post: async (req, res) => {
		const { user } = require('../../models');
		const jwt = require('jsonwebtoken');
    const access_token = req.headers['x-access-token'];

    const decoded = jwt.decode(access_token, { complete: true });
    const account = decoded.payload.account;
    const id = await user.findOne({
      where : { email : account},
      attributes: ['id']
		})
    const checkStore = await store.findOne({where : { id : storeId, userId : id.dataValues.id}})
    console.log(id.dataValues.id, checkStore)
    if(!checkStore) return res.status(404).json('해당 매장은 접근 권한이 없습니다')

		await user.findOne({ where : { id : id.dataValues.id }})
			.catch(err => res.send(err))
		await user.destroy({ where : { id : id.dataValues.id}})
			.then(() => res.status(201).send('회원탈퇴 되었습니다'))
	}
};
