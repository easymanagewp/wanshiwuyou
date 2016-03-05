require([
        'http',
        'jquery',
        'arttemplate',
        'utils',
        '$$global',
        '$$Socket',
        '$$Cookie',
        'lib_user',
        'location',
        'jquery.mCustomScrollbar'],
function(
    $$http,
    $$jQuery,
    $$template,
    $$utils,
    $$global,
    $$Socket,
    $$Cookie,
    $$LibUser,
    $$Location,
    $$mCustomScrollbar
){
    $$template.helper('dateFormat',$$utils.dateFormat);
    var $QuestionListTemplateStr = $$jQuery('#QuestionList').html();
    var $QuestionListTemplate = $$template.render($QuestionListTemplateStr);

    var $ConversationBoxTemplateStr = $$jQuery('#ConversationBox').html();
    var $ConversationBoxTemplate = $$template.render($ConversationBoxTemplateStr);

    var $QuestionBox = $$jQuery('.ul_titie_question_answer>ul');
    $QuestionBox.html('');

    /**
     * 获取问题列表
     */
    $$http.Get('/answer/answer.do').success(function(resp){
        if($$http.ValidateResp.success(resp)){
            $QuestionBox.append($QuestionListTemplate({_Answers:resp.result}));
            if($$Location.params.question){
                $$jQuery('#'+$$Location.params.question+"_huifu_btn").click();
            }
        }
    }).go();

    /**
     * 导出显示问题信息方法
     */
    $$global.exports('showQuestionInfo',function(_AnswerId,_QuestionId){
        var box = $$jQuery('#'+_AnswerId);
        if(box.css('display')=="none") {
            var container = $$jQuery('#' + _QuestionId + "_conversation");
            container.mCustomScrollbar('destroy');
            container.html('');
            $$http.Get('/conversation/' + _QuestionId + '.do').success(function (_Response) {
                if ($$http.ValidateResp.success(_Response)) {
                    var _Conversation = _Response.result;

                    for (var iIndex = _Conversation.length - 1; iIndex >= 0; iIndex--) {
                        $$jQuery('#' + _QuestionId + "_conversation").append($ConversationBoxTemplate({_Conversation: _Conversation[iIndex]}));
                        if(!_Conversation[iIndex].is_read){
                            $$http.Put('/conversation/read/'+_Conversation[iIndex]._id+".do").success(function(){}).go();
                        }
                    }
                    container.mCustomScrollbar({
                        mouseWheelPixels: 200
                    });
                    container.mCustomScrollbar('scrollTo', 'bottom');

                    container.parent().find('textarea').on('keyup', function (e) {
                        if (e.ctrlKey && e.keyCode == 13) {
                            $(this).parent().find('a').click();
                        }
                    });
                }
            }).go();
            box.css('display', 'block');
        }else{
            box.css('display','none');
        }
    });

    /* 删除问题-不再回答 */
    $$global.exports('delQuestion',function(_AnswerId){
        if(confirm('是否确认不再回答该问题，确认之后，该问题将不再显示在您的回答列表内')) {
            $$http.Put('/answer/dontAsk/' + _AnswerId + '.do').success(function (resp) {
                if ($$http.ValidateResp.success(resp)) {
                    window.location.reload();
                } else {
                    alert(resp.message);
                }
            }).error(function (err) {

            }).go();
        }
    });

    /**
     * 导出发送消息方法
     */
    $$global.exports('sendMessage',function(_AnswerId,_QuestionId,_ReceiveUser,element){
        var $Element = $$jQuery(element);
        var _Content = $Element.parent().find('textarea').val();
        if(_Content==null || /^\s*$/.test(_Content)){
            return;
        }
        $$Socket.emit('sendMessage',{_Type:"answer",question:_QuestionId,content:_Content,receive_user:_ReceiveUser});
        $$jQuery('#'+_QuestionId+"_conversation .mCSB_container").append($ConversationBoxTemplate({
            _Conversation:{
                content:_Content,
                send_user:$$LibUser.currentUser(),
                send_time : new Date().getTime(),
                thisConversation:true
            }
        }));
        var container = $$jQuery('#'+_QuestionId+"_conversation");
        container.mCustomScrollbar('scrollTo','bottom');
        $Element.parent().find('textarea').val('');
    });

    /**
     * Socket接受消息
     */
    $$Socket.on('receiveMessage',function(_Conversation){
        $$http.Put('/conversation/read/'+_Conversation._id+".do").success(function(){}).go();
        _Conversation.thisConversation = false;
        $$jQuery('#'+_Conversation.question+"_conversation .mCSB_container").append($ConversationBoxTemplate({
            _Conversation:_Conversation
        }));
        var container = $$jQuery('#'+_Conversation.question+"_conversation");
        container.mCustomScrollbar('scrollTo','bottom');
    });

});