require(['data-grid','dataform','utils','lib_user'],function($$dataGrid,$$dataForm,$$utils,$$libUser){
    var $grid = $('.c_list_table');
    var $form = $('.c_edit_container');

    $grid.on('templateHelper',function(event,template){
        template.helper('dateFormat',$$utils.dateFormat);
        template.helper('userFormat',function(userId,attr){
            var oUserInfo = $$libUser.getUser(userId);
            return oUserInfo[attr];
        });
    });

    var $dataGrid = $$dataGrid.init('/admin/extension_apply.do',$grid,$('#gridTemplate').text());

    $form.on('loadDataSuccess',function(e,data){
        /* 获取用户信息 */
        $.extend(true,data,$$libUser.getUser(data.apply_user));
        data.apply_time = $$utils.dateFormat(data.apply_time);
        /* 初始化个人名片显示 */
        $("#business_card").attr('src',$$utils.parseUrl(data.business_card));
        /* 初始化个人网址显示 */
        $("#home_page").attr('href',data.home_page).attr('target','_black').text(data.home_name || data.home_page);
        $("#nickname").html(data.nickname);
        $("#apply_time").html(data.apply_time);
        $("#advertisement").html(data.advertisement);
        $("#business").html(data.business);
        $("#business_type").html(data.business_type);
    });

    $$dataForm.init($form,{
        editDataSource : "/admin/extension_apply/{{id}}.do",
        editPutUrl : '/admin/extension_apply/{{id}}.do'
    });

    $form.find('#yes').on('click',function(){
        $form.find(':input[name="approve_result"]').val(true);
        $form.trigger('action');
    });

    $form.find('#no').on('click',function(){
        $form.find(':input[name="approve_result"]').val(false);
        $form.trigger('action');
    })

    $form.on('submitDataSuccess',function(e,resp){
        $grid.trigger('reloadData');
    });


});