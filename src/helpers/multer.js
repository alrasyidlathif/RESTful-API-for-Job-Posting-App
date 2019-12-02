const multer = require('multer')
const path = require('path')

let companyStorage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, path.join(__dirname+'/media/img/company_logo'))
	},
	filename: (req, file, callback) => {
		callback(null, file.fieldname + '-' + Date.now() + '-.' + file.originalname.slice(-4))
	},
})

let fileFilter = (req, file, callback) => {
	let ext = path.extname(file.originalname)
	if (ext !== '.png' && ext !== '.jpg' && ext !== '.svg' && ext !== '.jpeg') {
		callback(null, false)
		return
	}
	callback(null, true)
}

module.exports = {
	companyMulter: multer({ storage: companyStorage, fileFilter }),
}
