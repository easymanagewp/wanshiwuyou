require([
    'http',
    'jquery',
    'arttemplate',
    'utils',
    '$$global',
    '$$Socket',
    'lib_user',
    'location',
    'jquery.mCustomScrollbar'
],function(
    $$http,
    $$jQuery,
    $$template,
    $$utils,
    $$global,
    $$Socket,
    $$LibUser,
    $$Location,
    $$mCustomScrollbar
){
    $$template.helper('dateFormat',$$utils.dateFormat)

    var $MyQuestionTemplateStr = $$jQuery('#QuestionList').html();
    var $MyQuestionTemplate = $$template.render($MyQuestionTemplateStr);

    var $AnswerListTemplateStr = $$jQuery('#AnswerList').html();
    var $AnswerListTemplate = $$template.render($AnswerListTemplateStr);

    var $ConversationBoxTemplateStr = $$jQuery('#ConversationBox').html();
    var $ConversationBoxTemplate = $$template.render($ConversationBoxTemplateStr);

    var $MyQuestion = $$jQuery('#my_question_list');
    /* 获取问题列表 */
    $$http.Get('/question.do').success(function(resp){
        if($$http.ValidateResp.success(resp)){
            $MyQuestion.html('');
            var _MyQuestionArr = resp.result;
            _MyQuestionArr.sort(function(a,b){
                return b.count - a.count;
            });
            $MyQuestion.append($MyQuestionTemplate({_MyQuestionArr:_MyQuestionArr}));
            if($$Location.params.question!=null){
                $$jQuery('#'+$$Location.params.question+"_huifu_btn").click();
            }
        }
    }).error(function(err){

    }).go();

    /* 显示回答者列表 */
    $$global.exports('showAnswerList',function(element,_MyQuestionId){
        var $element = $$jQuery(element);
        var reployBox = $$jQuery('#'+_MyQuestionId+"_reply_box");
        if(reployBox.css('display')=="none") {
            reployBox.html('');
            $$http.Get('/question/answers/' + _MyQuestionId + '.do').success(function (resp) {
                var result = resp.result;
                for (var iIndex = 0; iIndex < result.length; iIndex++) {
                    var strAnswerList = $AnswerListTemplate({_Answer: result[iIndex]});
                    $$jQuery('#' + _MyQuestionId + "_reply_box").append(strAnswerList);
                    reployBox.css('display', 'block');
                }
                if ($$Location.params.send_user != null) {
                    $('#' + $$Location.params.send_user + "_huifu_btn").click();
                }
            }).go();
        }else{
            reployBox.css('display','none');
        }
    });

    /* 显示交流内容 */
    $$global.exports('showConversation',function(_QuestionId,_AnswerId,_AnswerUserId){
        var conversationBox = $$jQuery('#'+_QuestionId+"_"+_AnswerUserId+"_conversation_box");
        if(conversationBox.css('display')=="none") {
            var container = $$jQuery('#' + _QuestionId + "_" + _AnswerUserId + "_conversation_box .jiaoliubox");
            container.mCustomScrollbar('destroy');
            container.html('');
            $$http.Get('/conversation/' + _QuestionId + '.do').success(function (_Response) {
                if ($$http.ValidateResp.success(_Response)) {
                    var _Conversation = _Response.result;

                    for (var iIndex = _Conversation.length - 1; iIndex >= 0; iIndex--) {
                        if(!_Conversation[iIndex].is_read){
                            $$http.Put('/conversation/read/'+_Conversation[iIndex]._id+".do").success(function(){}).go();
                        }
                        $$jQuery('#' + _QuestionId + "_" + _AnswerUserId + "_conversation_box .jiaoliubox").append($ConversationBoxTemplate({_Conversation: _Conversation[iIndex]}));
                    }
                    container.mCustomScrollbar({
                        mouseWheelPixels: 200
                    });
                    container.mCustomScrollbar('scrollTo', 'bottom');
                    $$jQuery('#' + _QuestionId + "_" + _AnswerUserId + "_conversation_box").find('textarea').val('');
                    container.parent().find('textarea').on('keyup', function (e) {
                        if (e.ctrlKey && e.keyCode == 13) {
                            $(this).parent().find('a').click();
                        }
                    });
                }
            }).go();
            conversationBox.css('display', 'block');
        }else{
            conversationBox.css('display', 'none');
        }
    });

    /* 删除问题-不再提问 */
    $$global.exports('delQuestion',function(_QuestionId){
        if(confirm('是否确认不再提问该问题，确认之后，该问题将不再显示在您的提问列表内')) {
            $$http.Put('/question/dontAsk/' + _QuestionId + '.do').success(function (resp) {
                if ($$http.ValidateResp.success(resp)) {
                    window.location.reload();
                } else {
                    alert(resp.message);
                }
            }).error(function (err) {

            }).go();
        }
    });

    $$global.exports('sendMessage',function(_AnswerId,_QuestionId,_ReceiveUser,element){
        var $Element = $$jQuery(element);
        var _Content = $Element.parent().find('textarea').val();
        if(_Content==null || /^\s*$/.test(_Content)){
            return;
        }
        $$Socket.emit('sendMessage',{_Type:"_question",question:_QuestionId,content:_Content,receive_user:_ReceiveUser});
        $$jQuery('#'+_QuestionId+"_"+_ReceiveUser+"_conversation_box .jiaoliubox .mCSB_container").append($ConversationBoxTemplate({
            _Conversation:{
                content:_Content,
                send_user:$$LibUser.currentUser(),
                send_time : new Date().getTime(),
                thisConversation : true
            }
        }));
        var container = $$jQuery('#'+_QuestionId+"_"+_ReceiveUser+"_conversation_box .jiaoliubox");
        container.mCustomScrollbar('scrollTo','bottom');
        $Element.parent().find('textarea').val('');
    });

    $$Socket.on('receiveMessage',function(_Conversation){
        $$http.Put('/conversation/read/'+_Conversation._id+".do").success(function(){}).go();
        _Conversation.thisConversation = false;
        $$jQuery('#'+_Conversation.question+"_"+_Conversation.send_user._id+"_conversation_box .jiaoliubox .mCSB_container").append($ConversationBoxTemplate({
            _Conversation:_Conversation
        }));
        var container = $$jQuery('#'+_Conversation.question+"_"+_Conversation.send_user._id+"_conversation_box .jiaoliubox");
        container.mCustomScrollbar('scrollTo','bottom');
    });


});