$(function () {
    //3.定义时间0过滤器
    template.defaults.imports.dateFormat = function (dtStr) {
        var dt = new Date(dtStr)
        var y = dt.getFullYear()
        var m = num(dt.getMonth() + 1)
        var d = num(dt.getDate())

        var hh = num(dt.getHours())
        var mm = num(dt.getMinutes())
        var ss = num(dt.getSeconds())
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }
    //补零
    function num(n) {
        return n > 9 ? n : '0' + n
    }

    var layer = layui.layer
    //1.定义提交参数
    var q = {
        pagenum: 1, //页码值
        pagesize: 2, //每页显示多少条数据
        cate_id: '', //	文章分类的 Id
        state: '', //文章的状态
    }

    // 2.初始化文章列表
    initTable()

    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.messaged)
                }
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                renderPage(res.total)
            }
        })
    }
    var form = layui.form
    initCate()
    //3.初始化分类
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                //赋值渲染分类下拉菜单
                form.render()
            }
        })
    }
    //4.提交分类渲染页面
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        //获取表单中选项的值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        //赋值
        q.state = state
        q.cate_id = cate_id
        initTable()
    })
    // 5.分页
    var laypage = layui.laypage;

    function renderPage(num) {
        laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            count: num, //数据总数，从服务端得到
            limit: q.pagesize, //每页显示的条数
            curr: q.pagenum, //起始页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'], //自定义排版
            limits: [2, 3, 5, 7, 9], //每页条数的选择项
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                // console.log(first,obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                //赋值页面
                q.pagenum = obj.curr
                //赋值每页条数
                q.pagesize = obj.limit
                //首次不执行
                if (!first) {
                    initTable()
                    //do something
                }
            }
        });
    }
    // 6.删除文章
    $('body').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id')
        layer.confirm('是否删除?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg('删除成功')
                    // 6.1页面汇总删除删除按钮个数等于1，页码大于1
                    if ($('.btn-delete').length == 1 && q.pagenum > 1) q.pagenum--

                        initTable()
                }
            })

            layer.close(index);
        });
    })
})