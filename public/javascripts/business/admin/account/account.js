require(['data-grid','dataform','data-grid-plugin-del','data-grid-plugin-checkbox'],function($$dataGrid,$$dataForm,$$dataGridPluginDel,$$dataGridPluginCheckbox){
    var $grid = $('.c_list_table');
    var $form = $('.c_edit_container');

    var $dataGrid = $$dataGrid.init('/admin/account.do',$grid,$('#gridTemplate').text());
    /* 为datagrid添加删除插件 */
    $dataGrid.plugin($$dataGridPluginDel,'/admin/account/{{id}}.do','/admin/account.do');
    /* 为datagrid添加全选反选插件 */
    $dataGrid.plugin($$dataGridPluginCheckbox,'.ids','.id');

    $$dataForm.init($form,{
        viewDataSource : "/admin/account/{{id}}.do",
        editDataSource : "/admin/account/{{id}}.do",
        editPutUrl : "/admin/account/{{id}}.do",
        addPostUrl : "/admin/account.do"
    });
    $form.on('submitDataSuccess',function(e,resp){
        $grid.trigger('reloadData');
    });
});