require(['data-grid','dataform','utils','data-grid-plugin-del'],function($$dataGrid,$$dataForm,$$utils,$$dataGridPluginDel){
    var $grid = $('.c_list_table');
    var $form = $('.c_edit_container');

    var $dataGrid = $$dataGrid.init('/admin/user.do',$grid,$('#gridTemplate').text());
    /* 为datagrid添加删除插件 */
    $dataGrid.plugin($$dataGridPluginDel,'/admin/user/{{id}}.do','/admin/user.do');

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