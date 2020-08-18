//测试环境服务器地址
var baseURL = 'http://ajax.frontend.itheima.net'
//拦截所有ajax请求
//处理参数
$.ajaxPrefilter(function (uu) {
    //拼接对应环境服务器地址
    uu.url = baseURL+uu.url
})