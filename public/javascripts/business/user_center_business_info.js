require(['form','utils','http','jquery'],function($form,$utils,$http){

    $form.init('#business_info',{
        data : $utils.parseUrl('/user/current.do'),
        putUrl : $utils.parseUrl('/user_center/business_info.do'),
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

    $('#business_info').validate({
        rules : {
            home_page : {
                url : true
            }
        }
    })
})