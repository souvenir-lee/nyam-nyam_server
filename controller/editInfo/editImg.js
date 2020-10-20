module.exports = {
	post: async (req, res) => {
		const { user } = require('../../models')
		const { email } = req.body

		console.log(req.file)
		const createResult = 
		await user.update({ userImg: req.body.img }, {where : { email : email }})
			.catch(err => console.log(err))
		
			res.status(200).json({ imageID: createResult });
    }
  };
  