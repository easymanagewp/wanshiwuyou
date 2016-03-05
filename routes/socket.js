var $$Cache = require('../expand_models/MapCache'),
    $$Cookie = require('cookie'),
    $$UserDao = require('../dao/user'),
    $$QuestionDao = require('../dao/question'),
    $$Conversation = require('../dao/conversation');

var $$Socket = {};

/**
 * 根据用户的登录Token获取用户的Socket链接对象
 * @param _UserToken
 * @returns {*}
 */
$$Socket.$GetSocket = function(_UserToken){
    return $$Cache.$GetCache('socket',_UserToken);
};

/**
 * 初始化Socket链接
 * @param _Socket
 */
$$Socket.$Init = function(_Socket){
    var _UserToken = null;
    /**
     * 初始化Socket，将Socket放到缓存域之内
     */
    _Socket.on('init',function(){
         _UserToken = $$Cookie.parse(_Socket.request.headers.cookie).user_token;
        $$Cache.$AddCache('socket',_UserToken,_Socket);
    });

    /**
     * 断开链接事件
     */
    _Socket.on('disconnect',function(){
        $$Cache.$RemoveCache('socket',_UserToken);
    });

    /**
     * 发送消息事件
     */
    _Socket.on('sendMessage',function(msg){
        var _UserInfo = $$Cache.$GetCache(_UserToken,"userInfo"),
            _UserId = _UserInfo._id;
            _QuestionId = msg.question,
            _ReceiveUser = msg.receive_user,
            _Type = msg._Type,
            _Content = msg.content;
        $$Conversation.saveAsync({_Type:_Type,question:_QuestionId,content:_Content,send_user:_UserId,send_time:new Date().getTime(),receive_user:_ReceiveUser}).then(function(_conversation){
            $$Socket.$sendMessage(_conversation);
        })
    });
};

$$Socket.$sendMessage = function(_conversation){
    var _UserTokens = $$Cache.$GetCache('users',_conversation.receive_user);
    if(_UserTokens && _UserTokens.length>0) {
        for(var iIndex=0;iIndex<_UserTokens.length;iIndex++){
            var _UserToken = _UserTokens[iIndex];
            var $Socket = $$Socket.$GetSocket(_UserToken);
            if($Socket){
                $$UserDao.findByIdAsync(_conversation.send_user).then(function(_SendUser){
                    _conversation._doc.send_user = _SendUser[0];
                    $Socket.emit('receiveMessage',_conversation);
                    /*$$Conversation.updateAsync({_id:_conversation._id},{$set:{is_read:!0}},{}).then(function(){
                        // 更新成功：已读
                    })*/
                });
            }
        }
    }
};

/**
 * 推送问题信息
 */
$$Socket.$SendQuestion = function(_UserId,question){
    var _UserTokens = $$Cache.$GetCache('users',_UserId);
    if(_UserTokens && _UserTokens.length>0) {
        for(var iIndex=0;iIndex<_UserTokens.length;iIndex++){
            var _UserToken = _UserTokens[iIndex];
            var $Socket = $$Socket.$GetSocket(_UserToken);
            if($Socket){
                $Socket.emit('sendQuestion',question);
            }
        }
    }
};

/**
 * 推送回答信息
 * @param _UserId 用户ID
 * @param answer 回答信息
 * @private
 */
var _SendAnswer = function(_UserId,answer){
    var _UserTokens = $$Cache.$GetCache('users',_UserId);
    if(_UserTokens && _UserTokens.length>0) {
        for(var iIndex=0;iIndex<_UserTokens.length;iIndex++){
            var _UserToken = _UserTokens[iIndex];
            var $Socket = $$Socket.$GetSocket(_UserToken);
            if($Socket){
                $Socket.emit('sendAnswer',answer);
            }
        }
    }
};

/**
 * 推送回答信息
 * @param _UserId  用户id
 * @param answer 回答信息
 */
$$Socket.$SendAnswer = function(_UserId,answer){


    $$UserDao.findByIdAsync(answer.answer_user).then(function(_AnswerUser){
        answer._doc.answer_user = _AnswerUser[0];
        return true;
    }).then(function(){
        _SendAnswer(_UserId,answer);
    }).catch(function(err){
        _SendAnswer(_UserId,answer);
    })

};

module.exports = $$Socket;