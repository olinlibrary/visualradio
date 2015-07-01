var player, playerHandle, currentVideo;
var videoLoading = false;
var playerInitialized = false;
var timeDelta = false;
var channelList = [];
var channelNumber = 0;
var timer;
var errorCount = 0;

// Constants
var BUFFER_TIME = 3; // Seconds to Jump Ahead to Account for Buffer
var PERMISSIBLE_LAG = 6;
var POLL_TIME = 2500; // Milliseconds Between Server Polls
var ERRORS_BEFORE_PROMPT = 3; // Errors Before the User is Shown an Error Message
var MENU_HIDE_TIMER = 1000;

var menuBarTimer = setTimeout(hideMenuBar, MENU_HIDE_TIMER);

function getChannelList(){
    $('.channelguide a').each(function(index){
        $(this).attr('ind',index);
        channelList.push(parseInt($(this).attr('id')));
    });

    if(window.location.hash.length > 1 && $('.channelguide a[id='+window.location.hash.substring(1)+']').attr('id')){
        $('.channelguide a[id='+window.location.hash.substring(1)+']').addClass('active');
        channelNumber = $('.channelguide a[id='+window.location.hash.substring(1)+']').attr('ind');
    }else{
        window.location.hash = $('.channelguide a:first').attr('id');
        $('.channelguide a:first').addClass('active');
    }

    getStatus();

    $('.channelguide a').click(function(event){
        event.preventDefault();
        changeChannel($(this).attr('ind'));
    });
}

function getStatus(){
    $.ajax({
        url: '/channel/'+channelList[channelNumber]+'/status',
        method: 'GET',
        dataType: 'json',
        success: updatePlayer,
        complete: function(){
            timer = setTimeout(getStatus, POLL_TIME);
        },
        error: function(){
            errorCount++;
            if(errorCount >= ERRORS_BEFORE_PROMPT)
                $('.error').show();
        }
    });
}

function updatePlayer(data){
    $('.error').hide();
    errorCount = 0;

    // Check For Lag
    if(playerInitialized)
        timeDelta = playerHandle.p.getCurrentTime() - data['currentTime'];
    // console.log('Delta: '+timeDelta);

    currentTime = Math.floor(data['currentTime']) + BUFFER_TIME;

    if(!videoLoading){
        // If Player Not Initialized
        if (!playerInitialized){
            videoLoading = true;
            currentVideo = data['youtubeID'];
            initializePlayer(currentVideo, currentTime);

        // If Video Changed
        }else if(data['youtubeID'] != currentVideo){
            videoLoading = true;
            currentVideo = data['youtubeID'];
            playerHandle.p.loadVideoById(currentVideo, currentTime)

        // If Lagging Too Much
        }else if(Math.abs(timeDelta) > PERMISSIBLE_LAG){
            videoLoading = true;
            playerHandle.p.seekTo(currentTime)
            
        }
    }
}

function initializePlayer(videoID, startTime){
    jQuery.tube.defaults['autoload'] = true;
    jQuery.tube.defaults['autoplay'] = true;

    // Load Video Player
    player = $('.container.video').player({
        video: videoID, 
        width: '100%', 
        height: '100%',
        playerVars: {
            autoplay: 1,
            controls: 0,
            cc_load_policy: 0,
            disablekb: 0,
            fs: 0,
            iv_load_policy: 3,
            loop: 1,
            modestbranding: 1,
            playsinline: 0,
            rel: 0,
            showinfo: 0,
            start: startTime
        },
        events: {
            play: function(){
                playerHandle = player.data('player');
                playerHandle.p.mute();
                playerHandle.p.setPlaybackQuality('hd1080');
                videoLoading = false;
                playerInitialized = true;
            }
        }
    });
}

function changeChannel(channel){
    showMenuBar();
    clearTimeout(timer);

    $('.channelguide a').removeClass('active');
    channelNumber = channel;
    $('.channelguide a[ind='+channel+']').addClass('active')

    window.location.hash = $('.channelguide a[ind='+channel+']').attr('id');

    getStatus();
}

// Start Program
$(document).ready(getChannelList);

$(window).mousemove(showMenuBar);
var menuBar = true;
function showMenuBar(){
    clearTimeout(menuBarTimer);
    menuBarTimer = setTimeout(hideMenuBar, MENU_HIDE_TIMER);
    
    if(menuBar) return;
    $('.channelguide').animate({
        bottom: '10px'
    }, 200);
    menuBar = true;
}
function hideMenuBar(){
    if(!menuBar) return;
    $('.channelguide').animate({
        bottom: '-140px'
    }, 1000);
    menuBar = false;
}