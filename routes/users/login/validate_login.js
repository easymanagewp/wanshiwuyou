var $$MapCache = require('../../../expand_models/MapCache');

/* 验证用户是否登录 */
module.exports = function(req,res,next){
    /* 1：验证token */
    var _UserToken = req.cookies['user_token'];
    if(null == _UserToken || ''== _UserToken){
        res.json(false);
        return;
    }

    /* 2：验证token真实性 */
    var _CacheStore = $$MapCache.$GetCacheScope(_UserToken);
    if(null == _UserToken || null == {}){
        res.json(false);
        return;
    }

    /* 3：验证用户信息是否存在 */
    var _UserInfo = $$MapCache.$GetCache(_UserToken,'userInfo');
    if(null==_UserInfo){
        res.json(false);
        return;
    }

    res.json(true);
};

