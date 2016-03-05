var datasource = require('../expand_models/datasource'),
    $ = require('../expand_models/utils'),
    base_dao = require('./base_dao');

var extension_apply_schema = datasource.mongoose.Schema({
    apply_user : datasource.mongoose.Schema.Types.ObjectId,
    apply_time : Number,
    approve_result : {type : Boolean,default:!1},
    approve_content : String,
    approve_time : Number
});

var extension_apply_model = datasource.db.model('extension_apply',extension_apply_schema);

module.exports = $.extend(new base_dao(extension_apply_model,extension_apply_schema),{

});
