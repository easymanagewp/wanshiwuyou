/*
 用户数据接口
 */

var datasource = require('../expand_models/datasource');
var $ = require('../expand_models/utils');
var base_dao = require('./base_dao');

// Schema 结构
var _AccountSchema = new datasource.mongoose.Schema({
    login_name : {type:String},
    password : {type:String},
    user_name : {type:String}
});

// 创建运营商数据
var _AccountModel = datasource.db.model('account',_AccountSchema);

module.exports = $.extend(new base_dao(_AccountModel,_AccountSchema),{
    findByLoginNameAndPwd : function(login_name,password,callback){
        this.find({login_name:login_name,password:password},callback)
    }
});