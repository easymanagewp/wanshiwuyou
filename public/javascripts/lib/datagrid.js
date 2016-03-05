define(['http','utils','arttemplate','jquery.pager'],function($http,$utils,template){
    /**
     * params
     *      _datasource     数据获取地址
     *      $grid           数据表格
     *      gridTemplate    数据表格模版
     *
     * defined events
     *      loadData        加载数据
     *          datas           加载数据的时候向后台传递的参数
     *      reloadData      重新加载数据，如果不传递参数，默认使用上次的参数进行加载
     *          datas           加载数据的时候向后台传递的参数
     *      pager           初始化分页信息
     *          datas           分页信息相关参数
     *      error           显示错误信息
     *          message         错误信息
     *
     * user defined events
     *      beforeLoadData  加载数据之前执行的方法
     *          params          加载数据的参数，向后台传递的参数
 *          parseDataSuccess    数据解析完成执行的事件
 *          templateHelper  为template添加helper方法
     */
    var DataGrid = function(_datasource,$grid,gridTemplate){
        this.datasource = _datasource;
        this.$grid = $grid;
        this.$grid.trigger('templateHelper',[template]);
        this.$gridTemplate = template.render(gridTemplate);
        this.columns = $($grid.find('thead th')[0]).find('td').length;

        this.bindEvent();
        this.$grid.trigger('loadData');
    };

    DataGrid.prototype.bindEvent = function(){
        var inthis = this;
        inthis.$grid.on('pager',function(e,datas){
            inthis.pager(datas);;
        });
        inthis.$grid.on('loadData',function(e,datas){
            inthis.loadData(datas);
        });
        inthis.$grid.on('parseData',function(e,datas){
            inthis.parseData(datas);
        });
        inthis.$grid.on('error',function(e,message){
            inthis.error(message);
        });
        inthis.$grid.on('reloadData',function(e,datas){
            inthis.reloadData(datas);
        })
        window.DataGrid = $.extend(true,window.DataGrid,{
            'reloadData' :  function(){
                inthis.reloadData({});
            }
        })
    };

    /* 初始化分页信息 */
    DataGrid.prototype.pager = function(datas){
        var inthis = this;
        inthis.$grid.find(".pager").pager({
            pagenumber : datas.pagenumber,
            pagecount : datas.pagecount,
            buttonClickCallback : function(pageclickednumber){
                inthis.$grid.trigger('loadData',{
                    request_page : pageclickednumber
                })
            }
        });
    };

    /* 显示错误信息 */
    DataGrid.prototype.error = function(message){
        var inthis = this;
        inthis.$grid.find('tbody').html('<tr><td class="c_td_line" style="text-align:center;color:red;" colspan="'+inthis.columns+'">'+message+ '</td></tr>');
    };

    /* 默认参数 */
    DataGrid.defaultParams = {
        request_page : 1,
        page_size : 10
    };

    /* 解析数据 */
    DataGrid.prototype.parseData = function(rows){
        var inthis = this;
        var newHtml = inthis.$gridTemplate({rows:rows});
        inthis.$grid.find('tbody').html(newHtml);
        inthis.$grid.trigger('parseDataSuccess')
    };

    DataGrid.prototype.reloadData = function(params){
        if(!params){
            params = this.$preParams;
        }else{
            params = $.extend(true,{},this.$preParams,params);
        }

        this.loadData(params);
    };

    DataGrid.prototype.plugin = function(plugin){
        var params = [];
        for(var iIndex=1;iIndex<arguments.length;iIndex++){
            params.push(arguments[iIndex]);
        }
        plugin.call(this,params);
    };

    // 加载数据
    DataGrid.prototype.loadData = function(params){
        var inthis = this;

        var _params = $.extend(true,{},DataGrid.defaultParams,this.$preParams,params);

        inthis.$grid.trigger('beforeLoadData',[_params]);
        inthis.$preParams = _params;
        $http.Get(inthis.datasource).params(_params).success(function(resp){
            if($http.ValidateResp.success(resp)){
                var datas = resp.result;
                if(datas.rows && datas.rows.length>0){
                    inthis.$grid.trigger('parseData',[datas.rows]);
                    inthis.$grid.trigger('pager',datas);
                }else{
                    inthis.$grid.trigger('error','没有查找到任何数据');
                    inthis.$grid.trigger('pager',null);
                }
            }else{
                inthis.$grid.trigger('error',resp.message);
                inthis.$grid.trigger('pager',null);
            }
        }).error(function(){
            inthis.$grid.trigger('error','服务器连接失败！请稍后重新加载。');
            inthis.$grid.trigger('pager',null);
        }).go();
    };

    return {
        init : function(_datasource,$grid,gridTemplate){
            return new DataGrid(_datasource,$grid,gridTemplate);
        }
    }
});