require(['data-grid','dataform','data-grid-plugin-del','data-grid-plugin-checkbox'],function($$dataGrid,$$dataForm,$$dataGridPluginDel,$$dataGridPluginCheckbox){
    var $grid = $('.c_list_table');
    var $form = $('.c_edit_container');

    var $dataGrid = $$dataGrid.init('/admin/notice.do',$grid,$('#gridTemplate').text());
    /* 为datagrid添加删除插件 */
    $dataGrid.plugin($$dataGridPluginDel,'/admin/notice/{{id}}.do','/admin/notice.do');
    /* 为datagrid添加全选反选插件 */
    $dataGrid.plugin($$dataGridPluginCheckbox,'.ids','.id');

    $$dataForm.init($form,{
        viewDataSource : "/admin/notice/{{id}}.do",
        editDataSource : "/admin/notice/{{id}}.do",
        editPutUrl : "/admin/notice/{{id}}.do",
        addPostUrl : "/admin/notice.do"
    });
    $form.on('submitDataSuccess',function(e,resp){
        $grid.trigger('reloadData');
    });
});