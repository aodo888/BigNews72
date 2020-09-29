$(function () {
    // 1.实现登录与注册页面版面切换
    // 1.1 单击注册页面按钮 显示注册页面
    $('.login a').on('click', function () {
        $('.login').hide().next().show();
    })
    $('.register a').on('click', function () {
        $('.register').hide().prev().show();
    })

    //3.开启验证功能
    //layui这个框架提供了一个保留的对象layui
    //jAuery.js 提供了一个暴漏的对象  $ jQuery

    var form = layui.form
    form.verify({
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            // if (/^\d+\d+\d$/.test(value)) {
            //     return '用户名不能全为数字';
            // }
        }
        , repass: function (value, item) {
            //获取第一个密码
            var passVal = $('.register input[name="password"]').val()
            //判断两次密码是否一致
            if (value != passVal) {
                //清空密码框
                $('.register .pass ,.register .repass').val('')
                return '两次输入的密码不一样'
            }
        }

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        , pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ]
    });



    //3.实现新用户注册
    //3.2 给form表单注册submit事件
    $('.register , MyForm').on('submit', function (e) {
        e.preventDefault()


        $.ajax({
            type: 'post',
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            data: $(this).serialize(),
            success: function (res) {
                layer.msg(res.massage)
                if (res.status == 0) {
                    // 如果注册成功 则要显示登陆界面
                    $('.register .myForm')[0].reset()
                    $('.register').hide().prev().show()

                }
            }
        })
    })




    // 4. 实现登陆功能
    // 4.1 给form标签注册submit事件
    $('.login .myForm').on('submit', function (e) {
        // 4.2 阻止默认行为
        e.preventDefault()
        // 4.3 发送ajax请求 带上数据
        $.ajax({
            type: 'post',
            url: 'http://ajax.frontend.itheima.net/api/login',
            // 使用表单序列化的方式将form标签内的所有的具有name属性的input select textarea标签的值一次性获取并拼接成字符串
            data: $(this).serialize(),
            success: function (res) {
                // 4.4 登陆之后要提示 成功后要跳转到主页面 失败时要提示
                layer.msg(res.message) // 不管成功还是失败都要提示
                if (res.status == 0) {
                    // 跳转到主页面
                    location.href = './index.html'
                }
            }
        })
    })










































})