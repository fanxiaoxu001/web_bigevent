$(function () {
    //1. 点击注册 显示注册页面隐藏登陆页面
    $("#link_reg").on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    // 2.点击登录 显示登录页面隐藏注册页面
    $("#link_login").on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    })
    // 3.自定义验证规则
    var form = layui.form
    form.verify({
        //密码规则
        pwd: [
            /^[\S]{6,16}$/,
            '密码必须6-16为之间，且不能有空格'
        ],
        // 校验两次密码是否一致
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码输入不一致'
            }
        }
    })
    // 4.注册功能
    var layer = layui.layer;
    $("#form_reg").on('submit', function (e) {
        //清除默认样式
        e.preventDefault()
        //发送ajax
        $.ajax({
            method: 'post',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val()
            },
            success: function (res) {
                //返回状态判断
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录')
                //模拟点击事件，点击登录
                $('#link_login').click()
                //清空表单内容
                $('#form_reg')[0].reset()
            }
        })
    })
    //5.登录功能
    $('#form_login').submit(function (e) {
        //发送ajax
        e.preventDefault();
        $.ajax({
            method:'POST',
            url: '/api/login',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                layer.msg('恭喜您，登陆成功')
                //保存token，未来的接口要使用token
                localStorage.setItem('token',res.token)
                location.href='/index.html'
            }

        })
    })
})