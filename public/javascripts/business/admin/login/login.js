require(['$$Login','jquery'],function($$Login,$$jQuery){
    $$jQuery(function(){
        $$Login.init({
            url : '/admin/login.do',
            md5 : !1,
            loginNameKey : 'login_name',
            validateCode : false,
            successUrl : '/admin/main.html'
        });

        $$jQuery('.submit').on('click',function(){
            $$jQuery('form').submit();
        });
    })
});