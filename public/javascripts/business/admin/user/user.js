require(['data-grid','dataform','utils'],function($$dataGrid,$$dataForm,$$utils){
    var $grid = $('.c_list_table');
    var $form = $('.c_edit_container');

    var $dataGrid = $$dataGrid.init('/admin/user.do',$grid,$('#gridTemplate').text());

    $$dataForm.init($form,{
        viewDataSource : "/admin/user/{{id}}.do",
    });

    $form.on('loadDataSuccess',function(e,data){
        $("#business_card").attr('src',$$utils.parseUrl(data.business_card));
        $("#head_img").attr('src',$$utils.parseUrl(data.head_img));
        $("#home_page").attr('href',data.home_page).attr('target','_black').text(data.home_name || data.home_page);
    });

    $form.on('submitDataSuccess',function(e,resp){
        $grid.trigger('reloadData');
    });
});