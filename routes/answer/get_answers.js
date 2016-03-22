var $$Response = require('../../expand_models/response'),
    $$Cache = require('../../expand_models/MapCache'),
    $$Promise = require('bluebird');
    $$QuestionDao = require('../../dao/question'),
    $$ConversationDao = require('../../dao/conversation');
    $$UserDao = require('../../dao/user'),
    $$AnswerDao = require('../../dao/answer');

module.exports = function(req,res){
    var _UserInfo = $$Cache.$GetCache(req.cookies.user_token,'userInfo');
    /* 获取问题列表 */
    $$AnswerDao.findAsync({answer_user:_UserInfo._id,is_del:!1},{},{sort:[{'_id':-1}]}).then(function(answers){
        var _Queses = [];
        for(var iIndex=0;iIndex<answers.length;iIndex++){
            _Queses.push(function(){
                var inthis = this;
                /* 获取问题详细信息 */
                return $$QuestionDao.findByIdAsync(inthis.question).then(function(question){
                    inthis._doc.question = question[0];
                    /* 获取回答者详细信息 */
                    return $$UserDao.findByIdAsync(inthis.answer_user);
                }).then(function(answer_user){
                    inthis._doc.answer_user = answer_user[0];
                    /*
                     *  获取最后回复的消息信息
                     *  问题为当前问题，并且发送人或者接收人为自己
                     * */
                    return $$ConversationDao.findAsync({$or:[{question:inthis.question._id,send_user:_UserInfo._id},{question:inthis.question._id,receive_user:_UserInfo._id}]},{},{sort:[{send_time:-1}],skip:0,limit:1});
                }).then(function(conversations){
                    if(conversations[0]){
                        inthis._doc.question._doc.lastConversation = conversations[0];
                    }else{
                        inthis._doc.question._doc.lastConversation = {content:'无交流信息'};
                    }
                    /*
                     *  获取交流信息总数量
                     *  问题为当前问题，并且发送人或者接收人为自己
                     * */
                    return $$ConversationDao.countAsync({$or:[{question:inthis.question._id,send_user:_UserInfo._id},{question:inthis.question._id,receive_user:_UserInfo._id}]});
                }).then(function(jiaoliushu){
                    inthis._doc.question._doc.jiaoLiuCount = jiaoliushu;
                    /* 获取提问者详细信息 */
                    return $$UserDao.findByIdAsync(inthis.question.send_user);
                }).then(function(send_user){
                    inthis._doc.question._doc.send_user = send_user[0];
                    return inthis;
                }).catch(function(){
                    return inthis;
                })
            }.apply(answers[iIndex]));
        }

        return $$Promise.all(_Queses);
    }).then(function(answers){
        res.json($$Response.create($$Response.STATUS.SUCCESS,answers,"获取信息成功"));
    }).catch(function(err){
        res.json($$Response.create($$Response.STATUS.FAIL,{},"获取信息失败"));
    });
};