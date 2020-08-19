//测试环境服务器地址
var baseURL = 'http://ajax.frontend.itheima.net'
//拦截所有ajax请求
//处理参数
$.ajaxPrefilter(function (uu) {
    //拼接对应环境服务器地址
    uu.url = baseURL + uu.url
    //对需要权限的接口配置头信息
    //必须以my开有才行
    if (uu.url.indexOf('/my/') !== -1) {
        uu.headers = {
            //重新登陆，因为token有时间限制
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //拦截所有响应，判断身份认证信息
    uu.complete = function (res) {
        // console.log(res);
        var obj = res.responseJSON
        if (obj.status === 1 && obj.message === '身份认证失败！') {
            // 清空本地token
            localStorage.removeItem('token')
            // 页面跳转
            location.href = '/login.html'
        }
    }
})