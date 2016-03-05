var problem_input,          /* 问题描述框 */
    problem_btn_input;      /* 问题提交按钮 */


require(['http','utils','$$Login'],function($http,$utils,$$Login){
    /* 获取问题描述狂 */
    problem_input = $('#problem');
    /* 获取问题提交按钮 */
    problem_btn_input = $('#search_problem');

    /* 问题提交 */
    var submit_problem = function(){
        // 判断是否登录，如果没有登录，将会跳转登录页面
        if(!$$Login.$ValidateLogin()) {
            if(confirm('登录之后才可提问题，是否立即登录？')) {
                to_login(window.location.href);
            }
            return !1;
        }

        // 判断问题是否为null
        if($utils.strIsBlankOrNull(problem_input.val())){
            $utils.alert('请输入问题描述，多个关键字之间最好使用空格进行分割，以便于我们尽快的找到匹配的服务商！');
            return !1;
        }

        // 提交问题
        $http.Post('/question.do').params('question',problem_input.val()).success(function(resp){
            if($http.ValidateResp.success(resp)){
                $utils.alert(resp.message);
            }else{
                $utils.alert(resp.message);
            }
        }).error(function(){
            $utils.alert('问题提交失败，请检查您的网络是否链接');
        }).go();
    };

    /* 绑定提交按钮事件 */
    problem_btn_input.bind('click',submit_problem);
});