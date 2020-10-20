const { param } = require("../../routes/info");

module.exports = {
	get: (req, res) => {
		console.log('test', req.headers)
		console.log(req.params)

		//요청한 날짜를 확인해서 
		//해당 날짜의 예상 매출 보이기

		return res.send('predict')
	}
};
  