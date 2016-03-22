/**
 * 我的回答
 */
var datasource = require('../expand_models/datasource');
var $ = require('../expand_models/utils');
var base_dao = require('./base_dao');

var answer_schema = datasource.mongoose.Schema({
    question : datasource.mongoose.Schema.Types.ObjectId,                    /* 问题Id */
    answer_user : datasource.mongoose.Schema.Types.ObjectId,                 /* 回答者Id */
    last_answer_time : Number,              /* 最后回答时间 */
    is_del : {type : Boolean,default:!1}    /* 是否不再回答 */
});

var answer_model = datasource.db.model('answer',answer_schema);

module.exports = $.extend(new base_dao(answer_model,answer_schema),{

});