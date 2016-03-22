define(function(require,exports,module){
    var $ = require('jquery');

    var CheckAll = function(params){
        var inthis = this;
        this.$grid.on('parseDataSuccess',function(){
            var $checkAll = inthis.$grid.find(params[0]);
            var $checkBox = inthis.$grid.find(params[1]);

            $checkAll.prop('checked',false);

            $checkAll.on('click',function(){
                if($checkAll.prop('checked')){
                    $checkBox.prop('checked',true);
                } else{
                    $checkBox.prop('checked',false);
                }
            });

            $checkBox.on('click',function(){
                var checkAll = true;
                $checkBox.each(function(){
                    if(!$(this).prop('checked')){
                        $checkAll.prop('checked',false);
                        checkAll = false;
                        return false;
                    }
                });
                if(checkAll){
                    $checkAll.prop('checked',true);
                }
            });
        })
    };

    module.exports = CheckAll;
});