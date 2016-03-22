require([
    'data-grid',
    'dataform',
    'utils'
],function(
    $$dataGrid,
    $$dataForm,
    $$utils
){
    var $grid = $('.c_list_table');
    var $form = $('.c_edit_container');
    $grid.on('templateHelper',function(event,template){
        template.helper('dateFormat',$$utils.dateFormat);
        template.helper('processFormat',function(value){
            if(value == "true"){
                return "<span style='color: green'>已处理</span>";
            }else{
                return "<span style='color: red'>未处理</span>";
            }
        })
    });

    var $dataGrid = $$dataGrid.init('/admin/feedback.do',$grid,$('#gridTemplate').text());



    $form.on('submitDataSuccess',function(e,resp){
        $grid.trigger('reloadData');
    });

    $form.on('loadDataSuccess',function(e,data){
       data.create_time = $$utils.dateFormat(data.create_time);
    });

    $$dataForm.init($form,{
        editDataSource : "/admin/feedback/{{id}}.do",
        editPutUrl : "/admin/feedback/{{id}}.do"
    });
});
