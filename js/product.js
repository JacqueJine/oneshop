//头部
$('.ss_listBg').hover(function () {
    $('.ss_list_bg').slideDown('slow');
}, function () {
    $('.ss_list_bg').slideUp('slow');
});

//选择
$('#choice1 li').on('click',function(){
    $('#choice1 li').removeClass();
    $(this).addClass('checked');
});
$('#choice2 li').on('click',function(){
    $('#choice2 li').removeClass();
    $(this).addClass('checked');
});

//加减
$('.n_btn_1').on('click',function(){
    var num=$('.n_ipt').val();
    num++;
    $('.n_ipt').val(num);
});
$('.n_btn_2').on('click',function(){
    var num=$('.n_ipt').val();
    if(num<=1){
        return false;
    }
    num--;
    $('.n_ipt').val(num);
});

//推荐搭配
//单个
var price=308;
$('.checkbox input').on('click',function(){
    var p=$(this).parent('.checkbox').next('span').text().slice(1)-0;
    if(this.checked){
       price+=p;
    }else{
        price-=p;
    }
    $('.team_sum span').text(price);
});
//组合
$('.team_sum .sum_ipt').on('blur',function(){
    var num=$(this).val()-0;
    var pr=$(this).siblings('span').text()-0;
    var Asum=num*pr;
    $('.team_sum span').text(Asum);
});


