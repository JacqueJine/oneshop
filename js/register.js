var timer=null;
$('.tableText').on('click',function(){
    //避免计时器累加
    if(timer!=null){
        return false;
    }
    var num=60;
    timer=setInterval(function(){
        num--;
        $('.tableText').text(num+'秒后重新获取验证码');
        if(num<=0){
            clearInterval(timer);
            $('.tableText').text('点击重新获取验证码');
            timer=null;
        }
    },1000);
});
