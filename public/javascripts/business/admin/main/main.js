require(['utils','http','jquery'],function($utils,$http){
    var $BODY = null;
    var LOAD_HEAD_MENU_URL = $utils.parseUrl('/admin/main/head_menu.do');
    /* 顶部导航栏 */
    var $HEAD_MENU_BAR = null;
    /* 工作内容显示区域 */
    var $CONTENT = null;
    /* 左侧菜单 */
    var $MENU_MAIN = null;

    var load_page = function(e,url){
        $http.GetHtml($utils.parseUrl(url),$CONTENT);
    };

    /* 加载头部导航 */
    var load_head_menu = function(){
        $http.Get(LOAD_HEAD_MENU_URL).success(function(resp){
            if($http.ValidateResp.success(resp)){
                $HEAD_MENU_BAR.html('');
                var head_menus = resp.result;
                $.each(head_menus,function(){
                    var head_menu = this;
                    $('<li>').append(
                        $('<img>').attr('src',head_menu.icon)
                    ).append(
                        $('<span>').text(head_menu.text)
                    ).data('head_menu',head_menu).appendTo($HEAD_MENU_BAR);
                });
                $BODY.trigger('bind_head_menu_event');
            }
        }).go();
    };

    /* 初始化头部导航栏事件 */
    var bind_head_menu_event = function(){
        $HEAD_MENU_BAR.find('li').each(function(){
            var $head_menu = $(this);
            var head_menu_data = $head_menu.data('head_menu');
            $head_menu.on('click',function(){
                $BODY.trigger('load_page',head_menu_data.href);
            });
        });
    };

    /* 绑定左侧菜单事件 */
    var bind_left_menu_event = function(){
        var level1_menu = $MENU_MAIN.find('.level1');
        level1_menu.on('click',function(){
            var $left_level1_menu = $(this);
            if(!$left_level1_menu.hasClass('c_active')) {
                level1_menu.removeClass('c_active');
                $left_level1_menu.addClass('c_active');
            }
        });

        $MENU_MAIN.find('.level2').on('click',function(){
           var level2_menu = $(this);
            $BODY.trigger('load_page',level2_menu.data('href'));
        });
    };

    /* 注册头部导航栏事件 */
    var register_head_menu_event = function(){
        $BODY.on('load_head_menu',load_head_menu);
        $BODY.on('bind_head_menu_event',bind_head_menu_event);

        $BODY.on('bind_left_menu_event',bind_left_menu_event);

        $BODY.on('load_page',load_page);
    };

    /* 注册body相关事件 - frame框架事件 */
    var register_body_event = function(){
        register_head_menu_event();
    };

    /* 初始化页面信息 */
    var init = function(){
        $BODY = $('body');
        $HEAD_MENU_BAR = $('#head_menu_bar');
        $CONTENT = $('.c_content');
        $MENU_MAIN = $('.c_menumain');

        register_body_event();

        /* 加载头部菜单 */
        $BODY.trigger('load_head_menu');
        $BODY.trigger('bind_left_menu_event');

        var width = $('.c_container').width();
        $BODY.width($(window).width());
        var left_width = $('.c_leftmune').width();
        $CONTENT.width(width-left_width);
    };

    $(init);

});