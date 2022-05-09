$(document).ready(function(){
       
    $('.moreless-button').click(function(){
        $('.moretext').slideToggle();
        if($(this).text() == '...ver mais'){
            $(this).text('...ver menos')
        } else{
            $(this).text('...ver mais')
        }
    })

    $('.item-menu').click(function(){
        $('.item-menu').removeClass('active')
        $(this).addClass('active')
    })

});