(function(lib_user){
    define(function(require,exports,module){
        var $$http = require('http');
        module.exports = lib_user($$http);
    });
})(function($$http){
   var cache = {};

   var LibUser = function(userId){
       var userInfos = null;
       if(cache[userId]){
           userInfos = cache[userId];
       }else {
           $$http.Get('/user/' + userId + '.do').success(function (resp) {
               if ($$http.ValidateResp.success(resp)) {
                   cache[userId] = resp.result;
                   userInfos = resp.result;
               } else {
                   userInfos = {};
               }
           }).async(!1).go();
       }
       this.userInfos = userInfos;
   };
   return {
       currentUser : function(){
            return new LibUser('current').userInfos;
       },
       getUser : function(_id){
            return new LibUser(_id).userInfos;
       }
   };
});