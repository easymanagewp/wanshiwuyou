var response = require('../../expand_models/response'),
    $ = require('../../expand_models/utils'),
    question_dao = require('../../dao/question'),
    $$Cache = require('../../expand_models/MapCache'),
    $$Socket = require('../socket');
    $$AnswerDao = require('../../dao/answer');
    $$LibSolr = require('../../expand_models/LibSolr');

module.exports = function(req,res){
    var _UserInfo = $$Cache.$GetCache(req.cookies.user_token,'userInfo');
    /* 获取相关参数 */
    var question = req.body.question,
        receiver_user = req.body.receiver_user,
        send_user = _UserInfo._id,
        send_time = new Date().getTime();
    console.info(question);
    /* 创建实体 */
    var question_doc = {
        question : question,
        send_user : send_user,
        send_time : send_time
    };

    /* 保存实体 */
    question_dao.save(question_doc,function(doc){
        var $Query = $$LibSolr.createQuery().q(doc.question);
        if(receiver_user){
            $$AnswerDao.save({question:doc._id,answer_user:receiver_user},function(answerInfo){
                answerInfo._doc.question = doc;
                $$Socket.$SendAnswer(answerInfo.answer_user,answerInfo);
                $$Socket.$SendQuestion(send_user, doc);
                res.json(response.create(response.STATUS.SUCCESS, {}, '问题已经提交，如果对方有意愿，您将很快收到对方的回复，有回复的时候我们将会对您进行提醒'));
            });
        }else{
            $$LibSolr.searchAsync($Query).then(function(obj){
                for(var iIndex=0;iIndex<obj.response.docs.length;iIndex++){
                    var answer = obj.response.docs[iIndex];
                    $$AnswerDao.save({question:doc._id,answer_user:answer._id},function(answerInfo){
                        answerInfo._doc.question = doc;
                        $$Socket.$SendAnswer(answerInfo.answer_user,answerInfo);
                    });
                }
                return obj.response.docs.length;
            }).then(function(count){
                if(count<1){
                    res.json(response.create(response.STATUS.FAIL, {}, '无法找到与您所提问题相关的业务。。。'));
                }else {
                    $$Socket.$SendQuestion(send_user, doc);
                    res.json(response.create(response.STATUS.SUCCESS, {}, '问题提交成功，已通知'+count+'位与您所提问题相关的服务提供者，稍后会与您取得联系。。'));
                }
            }).catch(function(err){
                res.json(response.create(response.STATUS.FAIL,{},'问题提交失败'));
            });
        }
    },function(err){
        res.json(response.create(response.STATUS.FAIL,{},'问题提交失败'));
    });
};