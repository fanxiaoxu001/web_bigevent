$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    //2.为上传绑定点击事件
    $('#btnChooseImage').on('click', function () {
        $("#file").click()
    })
    // 3.修改剪裁图片
    $("#file").on('change', function (e) {
        //3.1拿到用户选择的文件
        var file = e.target.files[0]
        if (file.length == 0) {
            return
        }
        var newImageUrl = URL.createObjectURL(file)
        $image
            .cropper('destroy') //销毁旧的裁剪区
            .attr('src', newImageUrl) //重新设置图片路径
            .cropper(options) //重新初始化裁剪区
    })
    //4.上传头像、
    $("#btnUpload").on("click", function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
        // 发送ajax
        $.ajax({
            method: "POST",
            url: "/my/update/avatar",
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg("更换头像失败")
                }
                layui.layer.msg("更换头像成功");
                window.parent.getUserInfo()
            }
        })
    })
})