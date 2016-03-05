/*
 用户数据接口
 */

var datasource = require('../expand_models/datasource');
var $ = require('../expand_models/utils');
var base_dao = require('./base_dao');

// Schema 结构
var user = new datasource.mongoose.Schema({
    //qq : {type:String},                 /* QQ号码 */
    //phone : {type : String},            /* 电话号码 */
    //email    : {type : String},         /* 邮箱地址 */
    login_name : {type:Number},        /* 登录名  */
    nickname : {type : String},        /* 昵称 */
    password : {type:String},          /* 登录密码 */
    business : {type : String},        /* 业务信息 */
    business_type : {type:String},      /* 业务类别 */
    advertisement : {type : String},   /* 广告词 */
    home_page : {type : String},       /* 个人主页地址 */
    home_name : {type : String},       /* 网站名称 */
    business_card : {type : String},  /* 个人名片 */
    head_img : {type : String},        /* 头像 */
    company : {type : String},         /* 单位信息 */
    real_name : {type:String},         /* 真实姓名 */
    duties : {type : String},           /* 职务 */
    address : {type : String},          /* 地址 */
    fixed_tel : {type : String},        /* 固定电话 */
    zip_code :{type : String},          /* 邮政编码 */
    fax : {type : String},              /* 传真 */
    introduce : {type : String},         /* 介绍 */
    extension : {type:Boolean,default:!1}   /* 是否正在推广 */
});

// 创建运营商数据
var model = datasource.db.model('user',user);

module.exports = $.extend(new base_dao(model,user),{
    findByLoginNameAndPwd : function(login_name,password,callback){
        this.find({login_name:login_name,password:password},callback)
    }
});