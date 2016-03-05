require(['data-grid','dataform','data-grid-plugin-del','data-grid-plugin-checkbox'],function($$dataGrid,$$dataForm,$$dataGridPluginDel,$$dataGridPluginCheckbox){
    var $grid = $('.c_list_table');
    var $form = $('.c_edit_container');

    var $dataGrid = $$dataGrid.init('/admin/business_type.do',$grid,$('#gridTemplate').text());
    /* 为datagrid添加删除插件 */
    $dataGrid.plugin($$dataGridPluginDel,'/admin/business_type/{{id}}.do','/admin/business_type.do');
    /* 为datagrid添加全选反选插件 */
    $dataGrid.plugin($$dataGridPluginCheckbox,'.ids','.id');

    $$dataForm.init($form,{
        viewDataSource : "/admin/business_type/{{id}}.do",
        editDataSource : "/admin/business_type/{{id}}.do",
        editPutUrl : "/admin/business_type/{{id}}.do",
        addPostUrl : "/admin/business_type.do"
    });
    $form.on('submitDataSuccess',function(e,resp){
        $grid.trigger('reloadData');
    });
});