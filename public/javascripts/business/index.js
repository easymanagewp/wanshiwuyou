require([
    'http',
    'utils',
    'arttemplate',
    'location',
    'jquery',
    '$$tip',
    '$$global',
    '$$Login',
    '$$dialog'
],function(
    $http,
    $utils,
    $template,
    $location,
    $,
    $$tip,
    $$global,
    $$Login,
    $$dialog){

    var $Notice = $('#notice');

    $("#toRight").on('click',function(){
        $('#bar').scrollLeft($('#bar').scrollLeft()+300);
    });
    $("#toLeft").on('click',function(){
        $('#bar').scrollLeft($('#bar').scrollLeft()-300);
    });

    /* 获取公告信息 */
    $http.Get('/notice.do').success(function(resp){
        if($http.ValidateResp.success(resp)){
            for(var iIndex=0;iIndex<resp.result.length;iIndex++) {
                var colo = "";
                if(iIndex == 0){
                    colo = 'red';
                }else if(iIndex==1){
                    colo = 'blue';
                }else if(iIndex == 2){
                    colo = 'green';
                }
                $Notice.append(
                    $('<li>').addClass('con').append(
                        $('<i>').addClass(colo).text((iIndex+1))
                    ).append(
                        $('<a>').attr('href','/notice/detail.html?id='+resp.result[iIndex]._id).attr('target','_blank').text(resp.result[iIndex].title)
                    )
                )
            }
        }
    }).go();

    /* 打开用户的个人主页 */
    $$global.exports('openHomePage',function(home_page){
        if($utils.strIsBlankOrNull(home_page)){
            $utils.alert("该用户没有设置个人主页");
            return false;
        }

        window.open(home_page,"_blank");
    });

    $$global.exports('sendMessageForUser',function(user_id){
        if(!$$Login.$ValidateLogin()) {
            if(confirm('登录之后才交流，是否立即登录？')) {
                to_login(window.location.href);
            }
            return !1;
        }

        var d = $$dialog({
            title: '请简略描述您的问题信息，然后点击提交按钮',
            content: '<textarea style="width:500px;height:100px;text-indent:30px;line-height:23px;" id="'+user_id+'_dialog_textarea"></textarea>',
            okValue: '提交',
            ok: function () {
                var inthis = this;
                var _QuestionContent = $('#'+user_id+'_dialog_textarea').val();
                // 判断问题是否为null
                if($utils.strIsBlankOrNull(_QuestionContent)){
                    $utils.alert('请输入问题描述，多个关键字之间最好使用空格进行分割，以便于我们尽快的找到匹配的服务商！');
                    return !1;
                }

                // 提交问题
                $http.Post('/question.do').params('question',_QuestionContent).params('receiver_user',user_id).success(function(resp){
                    inthis.content(resp.message);
                    $(inthis.node).find('button[i-id="ok"]').remove();
                    $(inthis.node).find('button[i-id="cancel"]').text('确定');
                }).error(function(){
                    inthis.content(resp.message);
                }).go();
                return false;
            },
            cancelValue: '取消',
            cancel: function () {}
        });
        d.showModal();

    });

    /**
     * 跳转到指定的业务类型的推广页面
     * @param business_type_code
     */
    window.to_business_type = function(business_type_code){
        if(business_type_code) {
            $utils.next($utils.parseUrl('/index.html?business_type_code=' + business_type_code));
        }else{
            $utils.next($utils.parseUrl('/index.html'));
        }
    };

    /**
     * 创建头像过滤器，如果没有头像，则使用默认头像
     */
    $template.helper('head_parse_default',function(value,value2){
        if(value){
            return value;
        }else{
            return "/images/synicheng.png";
        }
    });

    /**
     * 业务类型容器
     * @type {*|jQuery|HTMLElement}
     */
    var BUSINESS_TYPE_BAR = $('#business_type_bar');


    /**
     * 业务类型模板
     */
    var BUSINESS_TYPE_TEMPLATE = $template.render("<li onclick='to_business_type(\"\")'>全部</li>" +
        "{{each business_types as business_type}}" +
        "<li id='{{business_type.code}}' onclick='to_business_type(\"{{business_type.code}}\")'>{{business_type.name}}</li>" +
        "{{/each}}");
    /**
     * 业务类型数据源
     */
    var BUSINESS_TYPE_DATE_SOURCE = $utils.parseUrl('/business_type.do');

    /**
     * 当前展示的页码
     * @type {number}
     */
    var CURRENT_PAGE = 1;
    /**
     * 推广用户list
     * @type {*|jQuery|HTMLElement}
     */
    var EXTENSION_USER_LIST = $('#extension_user_list tbody');
    /**
     * 推广用户的数据源
     */
    var BUSINESS_TYPE_EXTENSION_USER_SOURCE = $utils.parseUrl('/user/extension_user.do');
    /**
     * 推广用户列表模板
     */
    var BUSINESS_TYPE_EXTENSION_USER_TEMPLATE = $template.render("{{each users as user}}" +
        "<tr>" +
            "<td class='center'><img title=\"<image src=\'"+base_path+"{{user.business_card}}\' style=\'width:339px;height:210px;\'/>\" width='35' height='35' src='"+base_path+"/{{user.head_img | head_parse_default}}'></td>" +
            "<td>{{user.nickname}}</td>" +
            "<td><a href='javascript:void(0)' onclick='openHomePage(\"{{user.home_page}}\")'>{{user.advertisement}}</a></td>" +
            "<td>{{user.business}}</td>" +
            "<td><a href='javascript:void(0)' onclick='sendMessageForUser(\"{{user._id}}\")'><image width='25' height='25' src='"+base_path+"/images/jiaoliu.png'/> 在线交流</a></td>"+
        "</tr>" +
        "{{/each}}");

    /**
     * 解析业务类型，并且显示在首页上
     * @param business_types
     */
    var parse_business_types = function(business_types){
        var business_types_bar_html = BUSINESS_TYPE_TEMPLATE({business_types:business_types});
        BUSINESS_TYPE_BAR.append(business_types_bar_html);
        var business_type_code = $location.params.business_type_code;
        if($utils.strNotBlankOrNull(business_type_code)){
            $("#"+business_type_code).addClass('active');
        }else{
            BUSINESS_TYPE_BAR.find('li:first').addClass('active');
        }
    };

    /**
     * 解析推广推广用户，将推广的用户信息展现在网站首页上
     * @param users
     */
    var parse_business_type_extension_user = function(users){
        var business_type_extension_user_html = BUSINESS_TYPE_EXTENSION_USER_TEMPLATE({users:users});
        EXTENSION_USER_LIST.append(business_type_extension_user_html);
        $('*[title]').css('cursor','pointer')
        $('*[title]').tipsy({trigger:'hover',fade:true,html:true});
    };


    /**
     * 加载业务类型
     */
    $http.Get(BUSINESS_TYPE_DATE_SOURCE).success(function(resp){
        if($http.ValidateResp.success(resp)){
            parse_business_types(resp.result);
        }else{
            $utils.alert("获取业务信息失败，请检查您的网络是否连接正常");
        }
    }).error(function(err){
        $utils.alert("获取业务信息失败，请检查您的网络是否连接正常");
    }).go();

    /**
     * 加载推广用户
     * @param settings 参数，设置
     */
    var load_extension_user = function(settings){
        $http.Get(BUSINESS_TYPE_EXTENSION_USER_SOURCE)
        .params({
            business_type_code : $location.params.business_type_code,
            page : settings.page
        })
        .success(function(resp){
            if($http.ValidateResp.success(resp)){
                if(resp.result.length == 0){
                    $('.view_more').html('没有更多信息了。。。').unbind('click');
                }else {
                    parse_business_type_extension_user(resp.result);
                }
            }else{
                $utils.alert("获取推广用户信息失败，请检查您的网络是否连接正常");
            }
        }).error(function(err){
            $utils.alert("获取推广用户信息失败，请检查您的网络是否连接正常");
        }).go();
    };


    /**
     * 加载推广用户
     */
    load_extension_user({page:1});

    /**
     * 显示更多页面
     */
    $('.view_more').on('click',function(){
        CURRENT_PAGE ++;
        load_extension_user({page:CURRENT_PAGE});
    })
});