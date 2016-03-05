define(function(require,exports,modules){

    var $$http = require('http');
    var $$utils = require('utils');
    var $$mCustomScrollbar = require('jquery.mCustomScrollbar');

    /* 数据编辑表单
     * $settings
     *      viewDataSource              显示视图的DataSource
     *      editDataSource              编辑视图的DataSource
     *      editPutUrl                  编辑视图提交地址
     *      addPostUrl                  添加视图提交地址
     *
     * user define events
     *      initAdd                     初始化添加视图
     *      initEdit                    初始化编辑视图
     *      initView                    初始化View视图
     *      beforeSubmit                提交前置拦截事件
     *          params                      提交的数据
     *          formObj                     dataForm表单对象
     *      loadDataSuccess             加载数据成功
     *      submitDataSuccess           数据提交成功
     *
     * define events
     *      action                      提交表单数据
     *      disabled                    表单置为不可用状态
     *
     * method
     *      open                        显示表单
     *      close                       关闭表单
     *      view                        显示表单 - View视图
     *      edit                        显示表单 - 编辑视图
     *      add                         显示表单 - 添加视图
     *      clear                       清空表单
     *      method                      设置表单提交方式
     *          param > string          PUT / POST
     *      action
     *          param > string          设置表单提交地址
     *          param > null            提交表单
     *      data
     *          param > null            获取表单数据，JSON格式
     *          param > string          从远程加载数据
     *          param > Object          表单加载数据
     *
     *
     * */
    var DataForm = function($element,$settings){
        this.$settings = $settings;
        this.$element = $element;
        var setStyle = function(){
            // 设置编辑框的高度
            this.$element.height($(window).height());
            // 设置编辑框主体的高度
            this.$element.find('.c_edit_main').height(this.$element.height()-150).width(this.$element.width());
            // 设置按钮条的高度
            this.$element.find('.edit_btn_bar').css('top',this.$element.find('.c_edit_main').height()+70+"px");
        };
        var inthis = this;
        setStyle.call(inthis);
        $(window).on('resize',function(){
           setStyle.call(inthis);
        });
        // 为编辑框添加滚动条
        this.$element.find('.c_edit_main').mCustomScrollbar({
            autoHideScrollbar:true,
            mouseWheelPixels:200
        });
        this.bindEvents();
    };

    DataForm.prototype.bindEvents = function(){
        var inthis = this;
        inthis.$element.on('open',function(){
            inthis.open();
        });
        inthis.$element.on('close',function(){
            inthis.close();
        });
        inthis.$element.on('view',function(e,ps){
            inthis.view(ps);
        });
        inthis.$element.on('edit',function(e,ps){
            inthis.edit(ps);
        });
        inthis.$element.on('add',function(){
            inthis.add();
        });
        inthis.$element.on('clear',function(){
            inthis.clear();
        });
        inthis.$element.on('action',function(){
            inthis.action();
        });
        $(window).on('keyup',function(e,b){
            if(e.keyCode==27){
                inthis.$element.trigger('close');
            }
        });
        inthis.$element.on('disabled',function(){
            inthis.disabled();
        });
        inthis.$element.find('.save').on('click',function(){
            inthis.$element.trigger('action');
        });
        inthis.$element.find('.close').on('click',function(){
            inthis.$element.trigger('close');
        })

    };

    /* 打开表单 */
    DataForm.prototype.open = function(){
        this.$element.removeClass('c_hide');
        this.$element.addClass('c_active');
    };

    /* 关闭表单 */
    DataForm.prototype.close = function(){
        this.$element.removeClass('c_active');
        this.$element.addClass('c_hide');
        this.$element.trigger('clear');
    };

    /* 显示查看视图 */
    DataForm.prototype.view = function(ps){
        /* 显示Form */
        this.$element.trigger('open');
        this.disabled();
        this.$view = 'view';
        /* 通过viewDataSource加载表单数据 */
        var viewDataSource = this.$settings.viewDataSource;
        viewDataSource = $$utils.strFormat(viewDataSource,ps);
        this.data(viewDataSource);
        /* 触发beforeView事件 */
        this.$element.trigger('initView');
    };

    /* 显示编辑视图 */
    DataForm.prototype.edit = function(ps){
        /* 显示Form */
        this.$element.trigger('open');
        this.$view = 'edit';
        this.removeDisabled();
        /* 通过editDataSource加载表单数据 */
        var datasource = this.$settings.editDataSource;
        datasource = $$utils.strFormat(datasource,ps);
        this.data(datasource);
        /* 重制表单提交地址 */
        var putUrl = this.$settings.editPutUrl;
        putUrl = $$utils.strFormat(putUrl,ps);
        this.action(putUrl);
        this.method('PUT');
        /* 触发beforeEdit事件 */
        this.$element.trigger('initEdit');
    };

    /* 显示添加视图 */
    DataForm.prototype.add = function(){
        /* 显示Form */
        this.$element.trigger('open');
        this.$view = 'add';
        this.removeDisabled();
        /* 重置表单提交地址 */
        var postUrl = this.$settings.addPostUrl;
        this.action(postUrl);
        this.method('POST');
        /* 执行beforeAdd事件 */
        this.$element.trigger('initAdd');
    };

    /* 设置表单提交方式 */
    DataForm.prototype.method = function(_method){
        this.$method = _method;
    };

    /* 清空表单 */
    DataForm.prototype.clear = function(){
        this.$element.find(':input')
            .not(':button, :submit, :reset, :hidden')
            .val('')
            .removeAttr('checked')
            .removeAttr('selected');
    };

    /* 表单置为预览状态（不可用） */
    DataForm.prototype.disabled = function(){
        this.$element.find(':input')
            .not(':button, :submit, :reset, :hidden')
            .attr('disabled','disabled');
        this.$element.find('.save').css('display','none');
        this.$element.addClass('c_edit_view');
    };

    /* 移除表单不可用状态 */
    DataForm.prototype.removeDisabled = function(){
        this.$element.find(':input')
            .not(':button, :submit, :reset, :hidden')
            .removeAttr('disabled');

        this.$element.removeClass('c_edit_view');
    };

    /* 提交表单 */
    DataForm.prototype.action = function(_action){
        var inthis = this;
        if(_action!=null){
            this.$action = _action;
            return;
        }

        /*
           提交表单
        */
        var params = this.data();  /* 获取表单数据 */
        this.$element.trigger('beforeSubmit',[params,this]); /* submit前置提交 */
        var Ajax = null;
        if(this.$method=="PUT"){
            Ajax = $$http.Put(this.$action);
        }else{
            Ajax = $$http.Post(this.$action);
        }

        Ajax.params(params);
        Ajax.success(function(resp){
            if($$http.ValidateResp.success(resp)){
                inthis.$element.trigger('submitDataSuccess',[resp.result]);
                alert(resp.message);
            }else{
                inthis.$element.trigger('submitDataError',[resp.result]);
                alert(resp.message);
            }
        });
        Ajax.go();
    };

    /* 加载数据 | 获取数据 */
    DataForm.prototype.data = function(oData){
        var inthis = this;

        // 参数存在，加载数据
        if(oData){
            if(typeof(oData)=='string'){
                // 远程加载数据
                var _params = {};
                $$http.Get(oData).params(_params).success(function(resp){
                    if($$http.ValidateResp.success(resp)){
                        resp = resp.result;
                        inthis.$element.trigger('loadDataSuccess',[resp,inthis])
                        inthis.data(resp);
                    }
                }).go();
            }else{
                // 获取对象类型数据
                inthis.$element.find(":input").each(function(){
                    var name = $(this).attr("name");
                    if(null != name && '' != name){
                        var nameArr = name.split(".");
                        var value = oData;
                        for(var iIndex = 0;iIndex<nameArr.length;iIndex++){
                            value = value[nameArr[iIndex]];
                            if(value==null){
                                break;
                            }
                        }
                        if(value!=null){
                            if($(this).attr("type")=="radio" || $(this).attr("type")=="checkbox"){
                                if($(this).val()==value){
                                    $(this).attr("checked","checked");
                                    if(this.onclick){
                                        this.onclick();
                                    }
                                }
                            }else{
                                $(this).val(value);
                            }
                        }
                    }
                });
            }
        }

        // 参数不存在，获取表单数据
        if(!oData){
            var params = {};
            var _element = inthis.$element;
            _element.find(":input").each(function(){
                if(null != $(this).attr("name") && '' != $(this).attr("name")){
                    if($(this).attr("type")=="radio" || $(this).attr("type")=="checkbox"){
                        if(this.checked){
                            if(params[$(this).attr("name")]){
                                params[$(this).attr("name")] += "," +$.trim($(this).val());
                            }else{
                                params[$(this).attr("name")] = $.trim($(this).val());
                            }
                        }
                    }else if($(this).val()!=null && $(this).val()!=""){
                        params[$(this).attr("name")] = $.trim($(this).val());
                    }
                }
            });
            return params;
        }
    };

    exports.init = function($element,$settings){
        var dataForm = new DataForm($element,$settings);
        window.DataForm = {};
        window.DataForm.edit = function(id){
          if(id){
              dataForm.$element.trigger('edit',{id:id});
          }else{
              dataForm.$element.trigger('add');
          }
        };
        window.DataForm.view = function(id){
            dataForm.$element.trigger('view',{id:id});
        };
        window.DataForm.action = function(){
            dataForm.$element.trigger('action');
        };
        window.DataForm.close = function(){
            dataForm.$element.trigger('close');
        }
        return dataForm;
    }

});