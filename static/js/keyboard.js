document.onkeyup = function(event){
    var key = event.keyCode;

    // Change Channel with Number Keys
    if(key >= 48 && key <= 57){
        if(key == 48) key += 10; // Zero -> 10
        if(key - 48 <= channelList.length)
            changeChannel(key - 49);
    }

    // Refresh Page with 'R Key'
    else if(key == 82)
        location.reload();

    // Next Channel with Arrows
    else if(key == 38 || key == 39 && channelList.length > 1){
        if(channelNumber + 1 >= channelList.length)
            changeChannel(0);
        else
            changeChannel(channelNumber + 1)
    }

    // Previous Channel with Arrows
    else if(key == 37 || key == 40 && channelList.length > 1){
        if(channelNumber == 0)
            changeChannel(channelList.length - 1);
        else
            changeChannel(channelNumber - 1)
    }

    // Random Channel with Space Bar
    else if(key == 32 && channelList.length > 1){
        var randomChannel = channelNumber;
        while(randomChannel == channelNumber)
            randomChannel = Math.floor((Math.random() * channelList.length));
        changeChannel(randomChannel);
    }

}