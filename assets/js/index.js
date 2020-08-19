$(function () {
    // 1.获取用户信息
    getUserInfo()
    //2.推出
    var layer = layui.layer;
    $('#btnLogout').on('click',function(){
        //框架提供的询问框
        layer.confirm('是否关闭', {
            icon: 3,
            title: '提示'
        }, function (index) {
            // 2.1清空本地token
            localStorage.removeItem('token')
            // 2.2页面跳转
            location.href='/login.html'
            // 2.3关闭询问框
            layer.close(index);
        });
    })
});
//获取用户信息写在入口函数外面
//原因：其他的页面调用  
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            //请求成功，渲染头像
            renderAvatar(res.data)
        }
    })
// 封装渲染用户头像渲染函数
    function renderAvatar(user) {
        //1.用户名判断（昵称优先。没有用username）
        var name = user.nickname || user.username
        $('#welcome').html('欢迎&nbsp&nbsp' + name)
        //2.判断图片路径是否为空
        if (user.user_pic !== null) {
            // 有头像
            //如果上传了头像就改变改变头像路径
            $('.layui-nav-img').attr('url', user.user_pic).show()
            $('.user-avatar').hide()
        }else{
            //美有头像
            $('.layui-nav-img').hide()    
            var text = name[0].toUpperCase();
            $('.user-avatar').show().html(text)
        }
    }
}