require(['jquery','lib_user','form','lib_business_type','image-upload','utils'],
function($$jQuery,$$LibUser,$$form,$$LibBusinessType,$$imageUpload,$$utils){

    var $businessType = $$jQuery.find(":input[name='business_type']");
    $$LibBusinessType.init($businessType);

    $$imageUpload.init('#imageSelect','#imageView','#imagePath');

    $$jQuery('form').on('afterParse',function(event,oData){
        $$jQuery('#imageView').attr('src',$$utils.parseUrl(oData.business_card));
    });

    $$form.init('form',{
        data : $$LibUser.currentUser(),
        submitBtn : '#submit',
        url : $$utils.parseUrl('/apply.do'),
        filter : {
            beforeSubmit : function(params){
                var _BusinessCard = $$jQuery(":input[name='business_card']").val();
                if(_BusinessCard==null || /^\s*$/.test(_BusinessCard)){
                    $$utils.alert("请上传您的个人名片，这将是您在推广期间，最直观的传递给其他人的个人信息");
                    return false;
                }
                return true;
            }
        }
    });


    $$jQuery('form').validate({
        rules : {
            home_page : {
                url : !0
            },
            advertisement : {required:!0},
            business : {required:!0}
        },
        messages : {
            advertisement : {
                required : '请输入您的广告词，以便我们的用户更加的了解到您的信息'
            },
            business : {
                required : '请输入您的业务信息，以便我们的用户更加容易的找到人'
            }
        }
    })
});