document.onkeyup = function(event){
    var key = event.keyCode;

    // Change Channel with Number Keys
    if(key >= 48 && key <= 57){
        if(key == 48) key += 10; // Zero -> 10
        if(key - 48 <= channelList.length)
            $(window).trigger('changeChannel',key - 49);
    }

    // Refresh Page with 'R' key
    else if(key == 82)
        location.reload();

    // Toggle Fullscreen with 'F' key
    else if(key == 70)
        $(window).trigger('toggleFullScreen');

    // Next Channel with Arrows
    else if(key == 38 || key == 39 && channelList.length > 1){
        if(channelNumber + 1 >= channelList.length)
            $(window).trigger('changeChannel',0);
        else
            $(window).trigger('changeChannel',channelNumber + 1);
    }

    // Previous Channel with Arrows
    else if(key == 37 || key == 40 && channelList.length > 1){
        if(channelNumber == 0)
            $(window).trigger('changeChannel',channelList.length - 1);
        else
            $(window).trigger('changeChannel',channelNumber - 1);
    }

    // Random Channel with Space Bar
    else if(key == 32 && channelList.length > 1){
        var randomChannel = channelNumber;
        while(randomChannel == channelNumber)
            randomChannel = Math.floor((Math.random() * channelList.length));
        $(window).trigger('changeChannel',randomChannel);
    }
}

$(window).on('toggleFullScreen', function(){
    if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
});

// Keep Focus off of Iframe
setInterval(function(){
    document.activeElement.blur();
},10);