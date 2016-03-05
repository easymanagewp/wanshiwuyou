define(['utils','http','jquery','jquery.ajaxfileupload'],function($utils,$http){

    /**
     * selectSelector 选择按钮
     * viewSelector 图片显示区域
     * pathSelector 图片路径保存框
     */
    var ImageUpload = function(selectSelector,viewSelector,pathSelector){
        var inthis = this;

        this.$select = $(selectSelector);
        this.$view = $(viewSelector);
        this.$path = $(pathSelector);

        this.$fileSelect = null;
        if(this.$select.attr('type')!='file'){
            this.$fileSelect = $('<input name="file" style="display: none;" type="file">');
            this.$select.before(this.$fileSelect);
            this.$select.on('click',function(){
                inthis.$fileSelect.click();
            })
        }else{
            this.$fileSelect = this.$select;
        }

        $(this.$fileSelect).ajaxfileupload({
            'action' : base_path+'/upload.do',
            'onComplete': function(response) {
                if($http.ValidateResp.success(response)){
                    var path = response.result.path;
                    inthis.$view.attr("src",base_path+"/"+path);
                    inthis.$path.val(path);
                }else{
                    alert(response.message);
                }
            },
            'onCancel' : function(error){
                $utils.alert(error.message);
            }
        });
    };

    return {
        init : function(selectSelector,viewSelector,pathSelector){
            return new ImageUpload(selectSelector,viewSelector,pathSelector);
        }
    }
});