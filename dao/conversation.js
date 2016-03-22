/**
 * 交流信息
 */
var datasource = require('../expand_models/datasource');
var $ = require('../expand_models/utils');
var base_dao = require('./base_dao');

var conversation_schema = datasource.mongoose.Schema({
    question : datasource.mongoose.Schema.Types.ObjectId,
    send_user : datasource.mongoose.Schema.Types.ObjectId,
    receive_user : datasource.mongoose.Schema.Types.ObjectId,   // 接收人
    content : String,
    send_time : Number,
    is_read : {type:Boolean,default:!1},
    _Type : String
});

var conversation_model = datasource.db.model('conversation',conversation_schema);

module.exports = $.extend(new base_dao(conversation_model,conversation_schema),{

});