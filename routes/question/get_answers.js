var $$QuestionDao = require('../../dao/question'),
    $$ConversationDao = require('../../dao/conversation'),
    $$AnswerDao = require('../../dao/answer'),
    $$Promise = require('bluebird'),
    $$UserDao = require('../../dao/user'),
    $$Response = require('../../expand_models/response');

module.exports = function(req,res){
  var _QuestionId = req.params.questionId;
    /* 过滤掉无交流信息的回答者 */
    $$AnswerDao.findAsync({question:_QuestionId}).then(function(_Answers){
        var _Queues = [];
        for(var iIndex=0;iIndex<_Answers.length;iIndex++){
            var _Answer = _Answers[iIndex];
            _Queues.push(function(){
                var inthis = this;
                return $$ConversationDao.countAsync({send_user:inthis.answer_user,question:_QuestionId}).then(function(count){
                    if(count == 0){
                        return null;
                    }else{
                        return inthis;
                    }
                });
            }.apply(_Answer))
        }

        return $$Promise.all(_Queues);
    /* 获取回答者信息 */
    }).then(function(answers){
        var _Queses = [];
        for(var iIndex=0;iIndex<answers.length;iIndex++){
            if(answers[iIndex]!=null){
                _Queses.push(function(){
                    var inthis = this;
                    return $$UserDao.findByIdAsync(inthis.answer_user).then(function(_AnswerUser){
                        inthis._doc.answer_user = _AnswerUser[0];
                        return inthis;
                    });
                }.apply(answers[iIndex]))
            }
        }

        return $$Promise.all(_Queses);
    /* 获取问题信息 */
    }).then(function(answers){
        var _Queses = [];
        for(var iIndex=0;iIndex<answers.length;iIndex++){
            if(answers[iIndex]!=null){
                _Queses.push(function(){
                    var inthis = this;
                    return $$QuestionDao.findByIdAsync(inthis.question).then(function(_Question){
                        inthis._doc.question = _Question[0];
                        return $$UserDao.findByIdAsync(inthis.question.send_user);
                    }).then(function(_SendUser){
                        inthis._doc.question._doc.send_user = _SendUser[0];
                        return inthis;
                    });
                }.apply(answers[iIndex]))
            }
        }

        return $$Promise.all(_Queses);
    /* 获取最后一条回复消息 */
    }).then(function(answers){
        var _Queses = [];
        for(var iIndex=0;iIndex<answers.length;iIndex++){
            if(answers[iIndex]!=null){
                _Queses.push(function(){
                    var inthis = this;
                    return $$ConversationDao.findAsync({$or:[{question:inthis.question._id,send_user:inthis.question.send_user._id,receive_user:inthis.answer_user._id},{question:inthis.question._id,receive_user:inthis.question.send_user._id,send_user:inthis.answer_user._id}]},{},{sort:[{send_time:-1}],skip:0,limit:1}).then(function(_Conversation){
                        inthis._doc.lastConversation = _Conversation[0];
                        return inthis;
                    });
                }.apply(answers[iIndex]))
            }
        }

        return $$Promise.all(_Queses);
    }).then(function(answers){
        res.json($$Response.create($$Response.STATUS.SUCCESS,answers,"获取回答者列表成功"));
    }).catch(function(err){
        console.info(err);
    })
};