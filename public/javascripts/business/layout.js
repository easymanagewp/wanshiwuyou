/*
 * 用户注册 - 第一步
 * */
require(['jquery','utils','http','$$Socket','$$Cookie','$$Noty'],function($,$utils,$$http,$$Socket,$$Cookie,$$Noty){
    if(navigator.userAgent.indexOf("MSIE")!=-1) {
       alert('为了您获得最好的体验，请使用以下浏览器，否则网站的部分功能您将无法使用\r\n1：IE9+\r\n2：谷歌\r\n3：火狐\r\n4：360等浏览器的极速模式');
    }

    if($('#wenti_count').length>0) {
        var $WenTiCount = $('#wenti_count');
        var $HuiDaCount = $('#huida_count');
        var $MsgCount = $('#xiaoxi_count');
        var $TongZhi = $('#tongzhi');



        $('#messageView').on('click',function(){
            $$http.Get('/conversation/view.do').success(function(resp){
            }).go();
        });

        $$http.Get('/tongzhi.do').success(function(resp){
           if($$http.ValidateResp.success(resp)){
               var count = resp.result.length;
               $TongZhi.find('#tongzhi_count').html(count);
           }
        }).go();

        $TongZhi.on('click',function(){
            $$http.Get('/tongzhi.do').success(function(resp) {
                if ($$http.ValidateResp.success(resp)) {
                    var tongZhiArr = resp.result;
                    for (var iIndex = 0; iIndex < tongZhiArr.length; iIndex++) {
                        var tz = tongZhiArr[iIndex];
                        $$Noty({
                            text: tz.content,
                            layout: 'bottomRight',
                            type: 'success',
                            animation: {
                                open: {height: 'toggle'}, // jQuery animate function property object
                                close: {height: 'toggle'}, // jQuery animate function property object
                                easing: 'swing', // easing
                                speed: 500 // opening & closing animation speed
                            }
                        });
                        $$http.Put('/tongzhi/'+tz._id+".do").success(function(){}).go();
                    }
                }
            }).go();
        });

        $$http.Get('/question/count.do').success(function(resp){
            if($$http.ValidateResp.success(resp)){
                var count = resp.result;
                $WenTiCount.html(count);
            }
        }).go();

        $$http.Get('/answer/count.do').success(function(resp){
           if($$http.ValidateResp.success(resp)){
               var count = resp.result;
               $HuiDaCount.html(count);
           }
        }).go();

        /* 获取未读消息数 */
        $$http.Get('/conversation/count.do').success(function(resp){
            if($$http.ValidateResp.success(resp)){
                var count = resp.result;
                $MsgCount.html(count);
            }
        }).go();

        $$Socket.on('sendQuestion',function(msg){
            if(msg._id){
                var wenti_count = $WenTiCount.html();
                $WenTiCount.html(parseInt(wenti_count)+1);
            }
        });

        $$Socket.on('sendAnswer',function(msg){
            if(msg._id){
                var huida_count = $HuiDaCount.html();
                $HuiDaCount.html(parseInt(huida_count)+1);

            }
            var url = "/answer.html?question="+msg.question._id;
            var content = msg.question.question;
            if(content > 10){
                content = content.substring(0,9)+"...";
            }
            $$Noty({
                text:'【提问】'+msg.answer_user.nickname+'：'+content+'<div style="float:right;"><a href="'+url+'">查看</a> | <a>关闭</a></div>',
                layout : 'bottomRight',
                type : 'warning',
                animation: {
                    open: {height: 'toggle'}, // jQuery animate function property object
                    close: {height: 'toggle'}, // jQuery animate function property object
                    easing: 'swing', // easing
                    speed: 500 // opening & closing animation speed
                }
            });
        });

        $$Socket.on('sendTZ',function(tz){
            $$Noty({
                text: tz.content,
                layout : 'bottomRight',
                type : 'success',
                animation: {
                    open: {height: 'toggle'}, // jQuery animate function property object
                    close: {height: 'toggle'}, // jQuery animate function property object
                    easing: 'swing', // easing
                    speed: 500 // opening & closing animation speed
                }
            });
        });
    }



    $$Socket.on('receiveMessage',function(_Conversation){
        var url = "";
        if(_Conversation._Type=="answer"){  // 跳转question页面
            url = "/my_question.html?question="+_Conversation.question+"&send_user="+_Conversation.send_user._id
        }else if(_Conversation._Type="question"){ // 跳转question页面
            url = "/answer.html?question="+_Conversation.question
        }
        var content = _Conversation.content;
        if(_Conversation.content.length > 10){
            content = content.substring(0,9)+"...";
        }
        $$Noty({
            text: _Conversation.send_user.nickname+'：'+content+'<div style="float:right;"><a href="'+url+'">查看</a> | <a>关闭</a></div>',
            layout : 'bottomRight',
            type : 'success',
            animation: {
                open: {height: 'toggle'}, // jQuery animate function property object
                close: {height: 'toggle'}, // jQuery animate function property object
                easing: 'swing', // easing
                speed: 500 // opening & closing animation speed
            }
        });
    });

    var loginout_btn = $('.logout');
    if(loginout_btn.length>0){
        loginout_btn.on('click',function(){
            $$http.Get($utils.parseUrl('/logout.do')).success(function(){
                $utils.next($utils.parseUrl('/index.html'));
            }).go();
        });
    }

    $('#shoucang').on('click',function(){
        try
        {
            window.external.addFavorite('http://www.wan451.com', '万事无忧');
        }
        catch (e)
        {
            try
            {
                window.sidebar.addPanel('万事无忧', 'http://www.wan451.com', "");
            }
            catch (e)
            {
                alert("加入收藏失败，请使用Ctrl+D进行添加");
            }
        }
    });

    $('#shouye').on('click',function(){
        var obj = this;
        try{
            obj.style.behavior='url(#default#homepage)';
            obj.setHomePage('http://www.wan451.com');
        }
        catch(e){
            if(window.netscape) {
                try {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                }
                catch (e) {
                    alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
                }
                var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
                prefs.setCharPref('browser.startup.homepage','http://www.wan451.com');
            }else{
                alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【http://www.wan451.com】设置为首页。");
            }
        }

    })
});

