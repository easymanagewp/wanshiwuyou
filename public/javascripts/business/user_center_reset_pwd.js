require(['form','utils','http','jquery'],function($form,$utils,$http){

    $form.init('#reset_pwd_form',{
        putUrl : $utils.parseUrl('/user_center/reset_pwd.do'),
        method : 'put',
        filter : {
            afterSubmit : function(err, response){
                if (err) {
                    $utils.alert('无法连接到服务器');
                } else if ($http.ValidateResp.success(response)) {
                    $utils.alert(response.message);
                } else {
                    $utils.alert(response.message);
                }
            }
        }
    });
});