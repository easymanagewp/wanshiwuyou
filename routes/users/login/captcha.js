/*var $$Ccap = require('ccap');*/
var $$Capcha = require('capcha');

module.exports = function(req,res){
	$$Capcha().then(function(data){
		req.session.validate_code = data.capcha;
		res.json(data.image);
	});    
};

