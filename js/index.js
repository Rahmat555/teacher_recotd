$(function () {
    check = $('.util-checkbox').find('li');
    check.on('click',function(){
        $(this).addClass('cur').siblings().removeClass('cur')
    })

    var menu_btn = $('.m-menubtn');
    var menu1 = menu_btn.next('ul');

    var menu_btn2 = $('.m-login');
    var menu2 = menu_btn2.next('ul');
    menu_btn.on('click',function(){


        menu2.fadeOut();
        menu2.removeClass('on').addClass('of')
        if(menu1.attr('class')==='' || menu1.attr("class")===undefined || menu1.attr("class")==='of'){
            $(this).next('ul').fadeIn();
            menu1.removeClass('of').addClass('on')
        }
        else{
            $(this).next('ul').fadeOut()
            menu1.removeClass('on').addClass('of')
        }
    })
    menu_btn2.on('click',function(){

        menu1.fadeOut();
        menu1.removeClass('on').addClass('of')
        if(menu2.attr('class')==='' || menu2.attr("class")===undefined || menu2.attr("class")==='of'){
            $(this).next('ul').fadeIn();
            menu2.removeClass('of').addClass('on')
        }
        else{
            $(this).next('ul').fadeOut()
            menu2.removeClass('on').addClass('of')
        }
    })

    var sj =  $('.show_jsearch');

    sj.on('click',function(){
        $(this).next('ul').toggle();
    })

    /**
     * 获取URL参数
     * @param name
     * @returns {string|null}
     */
    function getQueryString(name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        let r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        };
        return null;
    }

    let channel = getQueryString("ch");
    if(channel){
        localStorage.setItem('ch',channel);
    }

})