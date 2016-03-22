var datasource = require('../expand_models/datasource');
var $ = require('../expand_models/utils');
var base_dao = require('./base_dao');

var question_schema = datasource.mongoose.Schema({
    question : String,
    send_user : datasource.mongoose.Schema.Types.ObjectId,
    send_time : Number,
    is_del : {type : Boolean,default:!1}
});

var question_model = datasource.db.model("question",question_schema);

module.exports = $.extend(new base_dao(question_model,question_schema),{

});

