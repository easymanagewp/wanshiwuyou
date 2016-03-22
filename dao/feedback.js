var datasource = require('../expand_models/datasource');
var $ = require('../expand_models/utils');
var base_dao = require('./base_dao');

var feedback_schema = datasource.mongoose.Schema({
    content : String,                /* �������� */
    create_user : datasource.mongoose.Schema.Types.ObjectId,  /* �����ߣ���Ϊ�� */
    create_time : Number,             /* ����ʱ�� */
    contact_information : String,    /* ���û�е�¼����ϵ��ʽ���� */
    process_status : !1               /* ��δ���� */
});

var feedback_model = datasource.db.model("feedback",feedback_schema);

module.exports = $.extend(new base_dao(feedback_model,feedback_schema),{
    // ����Ϊ�Ѿ�����
    processAsync : function(_id){
        return this.updateAsync({_id:_id},{$set:{process_status:!0}});
    }
});

