define(function(require,exports,module){
    var $utils = require("utils"),
        $http = require('http');

    /* 设置删除数据的url */
    var delPlugin = function(params){
        var inthis = this;
        inthis.$delUrl = params[0];
        inthis.$batchDelUrl = params[1];
        inthis.$grid.on('del',function(e,ps){
            if($utils.strIsBlankOrNull(ps.id)){
                alert("请选择您要删除的数据");
                return;
            }
            if(confirm("数据删除之后不可恢复，是否删除？")) {
                var __delUrl = $utils.strFormat(inthis.$delUrl, ps);
                $http.Delete(__delUrl).success(function (resp) {
                    if ($http.ValidateResp.success(resp)) {
                        inthis.$grid.trigger('reloadData');
                    } else {
                        $utils.alert(resp.message);
                    }
                }).go();
            }
        });
        inthis.$grid.on('batchDel',function(e,ps){
            if($utils.strIsBlankOrNull(ps.ids)){
                alert("请选择您要删除的数据");
                return;
            }
            if(confirm("数据删除之后不可恢复，是否确认删除？")){
                $http.Delete(inthis.$batchDelUrl).success(function(resp){
                    if ($http.ValidateResp.success(resp)) {
                        inthis.$grid.trigger('reloadData');
                    } else {
                        $utils.alert(resp.message);
                    }
                }).params(ps).go();
            }
        });
        window.DataGrid = $.extend(true,window.DataGrid,{
            del : function(id){
                inthis.$grid.trigger('del',[{id:id}]);
            },
            batchDel : function(){
                var checkedIds = inthis.$grid.find('.id:checked');

                var ids = [];
                $.each(checkedIds,function(){
                    ids.push($(this).val());
                });
                inthis.$grid.trigger('batchDel',[{ids:ids.join(',')}]);
            }
        });
    };

    module.exports = delPlugin;
});