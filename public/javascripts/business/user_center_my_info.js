require(['form','utils','http','image-upload','jquery'],function($form,$utils,$http,$imgUpload){

    $imgUpload.init('#selectHeadImg','#viewHeadImg',':input[name="head_img"]');

    $form.init('#my_info_form',{
        data : $utils.parseUrl('/user/current.do'),
        putUrl : $utils.parseUrl('/user_center/my_info.do'),
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
            },
            afterLoad : function(userInfo){
                $('#viewHeadImg').attr("src",$utils.parseUrl(userInfo.head_img || 'images/uer_head_img.png'));
                return userInfo;
            }
        }
    });
})