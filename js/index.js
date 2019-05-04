//头部
$('.ss_listBg').hover(function () {
    $('.ss_list_bg').slideDown('slow');
}, function () {
    $('.ss_list_bg').slideUp('slow');
});

//全部商品分类
$('.leftNav ul li').hover(function () {
    $(this).find('.zj').show();
}, function () {
    $(this).find('.zj').hide();
});

//轮播图
var num = 0;
var timer = null;
var lis = $('.slide_box li');
var Lnum = $('.num li');
timer = setInterval(run, 1000);

function run() {
    style(num);
    num++;
    num >= lis.length ? num = 0 : num;
}

//公用方法
function style(index) {
    for (var i = 0; i < lis.length; i++) {
        lis[i].style.display = 'none';
        Lnum[i].className = '';
    }
    lis[index].style.display = 'block';
    Lnum[index].className = 'active';
}

Lnum.on('mouseenter', function () {
    var dex = $(this).index();
    clearInterval(timer);
    style(dex);
});
Lnum.on('mouseleave', function () {
    var dex = $(this).index();
    timer = setInterval(run, 1000);
    num = dex;
});

//快讯滚动
var li_h = $('#express li').innerHeight();
var timer = null;
function pun() {

    $('#express').animate({
        'marginTop': -li_h,
    }, 2000, function () {
        $('#express').css('margin-top', '0px');
        $('#express li').slice(0, 1).appendTo('#express');
    });
}

timer = setInterval(pun, 1000);

$('#express li').on('mouseenter', function () {
        clearInterval(timer);
    }
);

$('#express li').on('mouseleave', function () {
    timer = setInterval(pun, 1000);
});

//购物车
$('.car_t').on('click',function(){
    $('.last').toggle();
});
//1.模拟数据
var shopcar = {
    totalprice: 0,
    totalnum: 0,
    shoplist: [
        /*{
            price:190,
            num:1,
            tprice:190
        },
        {
            price:4.8,
            num:1,
            tprice:4.8
        },
        {
            price:769,
            num:1,
            tprice:769
        }*/

    ]
};
//2.初始化数据（从页面拿数据）
var li = $('.last .shop ul li');
li.each(function (index, item) {
    var p = $(item).find('.J_smallTotalPrice').text().slice(1)-0;
    var n = $(item).find('.J_inputCount').val() - 0;
    var newshop = {
        num: n,
        price: p,
        tprice: n * p
    };
    shopcar.shoplist.push(newshop);
});

//加法
$('.J_btnAddCount').on('click', function () {
    //获取下标
    var c_index = $(this).parents('li').index();
    var newnum = ++shopcar.shoplist[c_index].num;
    change_data(c_index, newnum);

});

//减法
$('.J_btnDelCount').on('click', function () {
    //获取下标
    var c_index = $(this).parents('li').index();
    var newnum = shopcar.shoplist[c_index].num;
    if (newnum <= 1) {
        alert('不能再减了！！！');
        return false;
    }
    --newnum;
    change_data(c_index, newnum);


});

//删除
$('.close').on('click', function () {
    var c_index = $(this).parents('li').index();
    $(this).parents('li').remove();
    //删除类数组元素
    shopcar.shoplist.splice(c_index, 1);
    change_data(-1);
    if(shopcar.shoplist.totalnum==0){
        $('.noshop').show();
        $('.shop').hide();
    }
});


//改变data的值
function change_data(index, num) {
    //改变单个总价格 删除是不执行
    if (index > -1) {
        shopcar.shoplist[index].num = num;
        shopcar.shoplist[index].tprice = num * shopcar.shoplist[index].price;
    }

    //改变所有总的数量和价格
    shopcar.shoplist.totalprice = 0;
    shopcar.shoplist.totalnum = 0;
    $.each(shopcar.shoplist, function (index, item) {
        shopcar.shoplist.totalprice += item.tprice;
        shopcar.shoplist.totalnum += item.num;
    });
    change_html(index);
}

//改变html
function change_html(index) {
    //单个价格  删除时不执行
    if (index > -1) {
        li.eq(index).find('.J_smallTotalPrice').text('￥'+shopcar.shoplist[index].tprice);
        li.eq(index).find('.J_inputCount').val(shopcar.shoplist[index].num);
    }

    //总价格
    $('.J_totalCount').text('('+shopcar.shoplist.totalnum+')');
    $('.J_totalPrice').text('￥'+shopcar.shoplist.totalprice);
}

