var datasource = require('../expand_models/datasource');
var $  = require('../expand_models/utils');
var base_dao = require('./base_dao');

var business_type_schema = datasource.mongoose.Schema({
    name : String,
    code : String
});

var business_type_model = datasource.db.model('business_type',business_type_schema);

module.exports = $.extend(new base_dao(business_type_model,business_type_schema),{

});
