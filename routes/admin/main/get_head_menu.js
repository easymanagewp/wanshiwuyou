var response = require('../../../expand_models/response');

var HEAD_MENUS = [
    {
        _id : "001",
        text : '网站公告',
        icon : '/images/admin/nav_icon_product.png',
        href : '/admin/notice.html'
    },
    {
        _id : "002",
        text : '推广日志',
        icon : '/images/admin/nav_icon_zhangwu.png',
        href : '/admin/extension_apply_history.html'
    },
    {
        _id : "003",
        text : '用户管理',
        icon : '/images/admin/nav_icon_user.png',
        href : '/admin/user.html'
    },
    {
        _id : "004",
        text : '系统配置',
        icon : '/images/admin/nav_icon_shebei.png',
        href : '/admin/account.html'
    }
]
/*
 * 获取头部导航菜单
 * */
module.exports = function(req,res){
    res.json(response.create(response.STATUS.SUCCESS,HEAD_MENUS,'获取菜单成功'));
};