/**
 * Created by roy wang on 2015/11/26.
 */
var user = require("../dao/user");

user.save({
        qq : '1021006960',                 /* QQ号码 */
        phone : '18991922353',            /* 电话号码 */
        email    : '18991922353@163.com',         /* 邮箱地址 */
        login_name : 1,        /* 登录名 | 0 - QQ | 1 - phone | 2 - email */
        nickname : '水中望月',        /* 昵称 */
        password : '19940913wp',          /* 登录密码 */
        business : '软件开发 软件定制',        /* 业务信息 */
        advertisement : '为软件而生',  /* 广告词 */
        home_page : 'http://www.baidu.com',      /* 个人主页地址 */
        business_card : '', /* 个人名片 */
        head_img : '',        /* 头像 */
        company : '西安凡特网络科技有限公司',         /* 单位信息 */
        real_name : '王鹏',         /* 真实姓名 */
        duties : '程序员',           /* 职务 */
        address : '陕西省西安市雁塔区科技二路软件园秦凤阁B106',          /* 地址 */
        fixed_tel : '',                                                     /* 固定电话 */
        zip_code :'711000',                                                  /* 邮政编码 */
        fax : '',                                       /* 传真 */
        introduce : '接受任何软件开发服务'            /* 介绍 */
},
function(doc){
    console.info(doc);
});