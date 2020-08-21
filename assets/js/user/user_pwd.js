$(function () {
    //1.定义校验规则
    var form = layui.form
    form.verify({
        // 1.1密码
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 1.2新旧不重复
        samePwd: function (value) {
            if (value == $('[name=oldPwd]').val()) {
                return '原密码与新密码不能重复的！'
            }
        },
        // 1.3两次密码必须相同
        rePwd:function(value){
            if (value !== $('[name=newPwd]').val()) {
                return'两次密码不一致'
            }
        }
    })
    // 2.表单提交
    $('.layui-form').on('submit',function(e){
        //阻止默认提交
        e.preventDefault()
        // 提交ajax
        $.ajax({
            method:'POST',
            url: '/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                // console.log(res);
                if(res.status!==0){
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg('修改成功')
                $('.layui-form')[0].reset()
            }
        })
    })
})