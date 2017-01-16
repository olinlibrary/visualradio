const TIME_MENUPERSIST = 1000;
const TIME_MENUSHOW = 200;
const TIME_MENUHIDE = 1000;

var menuBar = true;
var menuBarTimer  = setTimeout(hideMenuBar, TIME_MENUPERSIST);

$(window).on('mousemove changeChannel', showMenuBar);

function showMenuBar(){
    clearTimeout(menuBarTimer);
    menuBarTimer = setTimeout(hideMenuBar, TIME_MENUPERSIST);
    
    if(menuBar) return;
    $('.channelguide').animate({
        bottom: '10px'
    }, TIME_MENUSHOW);
    menuBar = true;

    $('body').removeClass('hideCursor');
}

function hideMenuBar(){
    if(!menuBar) return;
    $('.channelguide').animate({
        bottom: '-150px'
    }, TIME_MENUHIDE);
    menuBar = false;

    $('body').addClass('hideCursor');
}

$('.channelguide a.channel').click(function(event){
    event.preventDefault();
    $(window).trigger('changeChannel', $(this).attr('ind'));
});


// Mute
var IS_MUTED = true;
$('a#mute').click(function(event){
    event.preventDefault();
    IS_MUTED = !IS_MUTED;

    if(IS_MUTED){
        $(this).removeClass('off');
        playerHandle.p.mute();
    }else{
        $(this).addClass('off');
        playerHandle.p.unMute();
    }

});