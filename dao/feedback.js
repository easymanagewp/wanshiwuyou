var datasource = require('../expand_models/datasource');
var $ = require('../expand_models/utils');
var base_dao = require('./base_dao');

var feedback_schema = datasource.mongoose.Schema({
    content : String,                /* 反馈内容 */
    create_user : datasource.mongoose.Schema.Types.ObjectId,  /* 反馈者，可为空 */
    create_time : Number,             /* 反馈时间 */
    contact_information : String,    /* 如果没有登录，联系方式必填 */
    process_status : !1               /* 尚未处理 */
});

var feedback_model = datasource.db.model("feedback",feedback_schema);

module.exports = $.extend(new base_dao(feedback_model,feedback_schema),{
    // 设置为已经处理
    processAsync : function(_id){
        return this.updateAsync({_id:_id},{$set:{process_status:!0}});
    }
});

