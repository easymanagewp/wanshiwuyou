var datasource = require('../expand_models/datasource');
var $ = require('../expand_models/utils');
var base_dao = require('./base_dao');

var notice_schema = datasource.mongoose.Schema({
    content : String,                /* �������� */
    title : String,                 /* ���� */
    status : !1                     /* ״̬������ */
});

var notice_model = datasource.db.model("notice",notice_schema);

module.exports = $.extend(new base_dao(notice_model,notice_schema),{

});

