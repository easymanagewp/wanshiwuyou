var $CacheMap = {};

var $Cache = function(){
    setInterval(function(){
        for(var key in $CacheMap){
            if(key.indexOf('_time')!=-1){
                var lastTime = $CacheMap[key];
                if((new Date().getTime() - lastTime) < (1000*60*60)){
                    $CacheMap[key] = null;
                    $CacheMap[key.substring(0,key.length-5)] = null;
                }
            }
        }
    },1000*60*60)
};

/**
 * 获取用户的Cache域
 * @param _Id 用户的登录凭证ID
 * @returns {*} 用户的Cache于
 */
var $GetCacheScope = $Cache.prototype.$GetCacheScope = function(_Id){
    if($CacheMap[_Id]){
        $CacheMap[_Id+"_time"] = new Date().getTime();   // 更新最新活跃时间
        return $CacheMap[_Id];
    }else{
        $CacheMap[_Id] = {};
        return $GetCacheScope(_Id);
    }
};

/**
 * 将缓存数据添加到Cache域之内
 * @param _Id
 * @param _Key
 * @param _Value
 */
$Cache.prototype.$AddCache = function(_Id,_Key,_Value){
    var _UserCacheScope = $GetCacheScope(_Id);
    _UserCacheScope[_Key] = _Value;
};

/**
 * 获取缓存信息
 * @param _Id
 * @param _Key
 * @returns {*}
 */
$Cache.prototype.$GetCache = function(_Id,_Key){
    var _UserCacheScope = $GetCacheScope(_Id);
    return _UserCacheScope[_Key];
};

/**
 * 删除缓存信息
 * @param _Id
 * @param _Key
 */
$Cache.prototype.$RemoveCache = function(_Id,_Key){
    var _UserCacheScope = $GetCacheScope(_Id);
    _UserCacheScope[_Key] = null;
};

module.exports = new $Cache();

