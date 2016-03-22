(function(business_type){
    define(function(require,exports,module){
        var $$http = require('http');
        var $$jquery = require('jquery');
        module.exports = business_type($$jquery,$$http);
    });
})(function($$jquery,$$http){
   var LibBusinessType = function($businessSelect){
       this.$businessSelect = $businessSelect;
        $$http.Get('/business_type.do').success(function(resp){
            if($$http.ValidateResp.success(resp)){
                var business_type_arr = resp.result;
                $$jquery.each(business_type_arr,function(){
                    var business_type = this;
                    $$jquery($businessSelect).append(
                        $('<option>').val(business_type.code).text(business_type.name)
                    );
                });
            }else{}
        }).async(!1).go();
   };
   return {
       init : function($businessSelect){
            return new LibBusinessType($businessSelect);
       }
   };
});