var datasource = require('../expand_models/datasource');
var $ = require('../expand_models/utils');
var base_dao = require('./base_dao');

var notice_schema = datasource.mongoose.Schema({
    content : String,                /* 公告内容 */
    title : String,                 /* 标题 */
    status : !1                     /* 状态，备用 */
});

var notice_model = datasource.db.model("notice",notice_schema);

module.exports = $.extend(new base_dao(notice_model,notice_schema),{

});

