var $$Response = require('../../expand_models/response'),
    $$Cache = require('../../expand_models/MapCache'),
    $$UserDao = require('../../dao/user'),
    $$Promise = require('bluebird'),
    $$ConversationDao = require('../../dao/conversation');

//获取交流信息
module.exports = function(req,res){
    var _UserInfo = $$Cache.$GetCache(req.cookies.user_token,"userInfo");
    // 问题ID
    var _Question = req.params.question;
    var _UserId = _UserInfo._id;
    console.info(_UserId);
    // 获取交流信息
    $$ConversationDao.findAsync({$or:[{question:_Question,send_user:_UserId},{question:_Question,receive_user:_UserId}]},{},{sort:[{send_time:-1}],limit:10}).then(function(_Conversations){
        var _Queses = [];
        for(var iIndex=0;iIndex<_Conversations.length;iIndex++) {
            if (_Conversations[iIndex].send_user.toString() == _UserId) {
                _Conversations[iIndex]._doc.thisConversation = true;
            } else {
                _Conversations[iIndex]._doc.thisConversation = false;
            }
            _Queses.push(function(){
                var inthis = this;
                return $$UserDao.findByIdAsync(inthis.send_user).then(function(_SendUser){
                    inthis._doc.send_user = _SendUser[0];
                    return $$UserDao.findByIdAsync(inthis.receive_user);
                }).then(function(_ReceiveUser){
                    inthis.receive_user = _ReceiveUser[0];
                    return inthis;
                }).catch(function(err){
                    return inthis;
                });
            }.apply(_Conversations[iIndex]))
        }

        return $$Promise.all(_Queses);
    }).then(function(_Conversations){
        res.json($$Response.create($$Response.STATUS.SUCCESS,_Conversations,'获取交流信息成功'));
    }).catch(function(err){
        res.json($$Response.create($$Response.STATUS.FAIL,{},'交流信息获取失败'));
    });
};