var player, playerHandle, currentVideo;
var videoLoading = false;
var playerInitialized = false;
var timeDelta = false;
var channelNumber = 0;
var timer;
var errorCount = 0;

// Constants
var BUFFER_TIME = 3; // Seconds to Jump Ahead to Account for Buffer
var PERMISSIBLE_LAG = 6;
var POLL_TIME = 2500; // Milliseconds Between Server Polls
var ERRORS_BEFORE_PROMPT = 3; // Errors Before the User is Shown an Error Message

function getStatus(){
    $.ajax({
        url: '/status.php?ch='+channelList[channelNumber],
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
        timeDelta = playerHandle.p.getCurrentTime() - data[2];
    // console.log('Delta: '+timeDelta);

    currentTime = Math.floor(data[2]) + BUFFER_TIME;

    if(!videoLoading){
        // If Player Not Initialized
        if (!playerInitialized){
            videoLoading = true;
            currentVideo = data[1];
            initializePlayer(currentVideo, currentTime);

        // If Video Changed
        }else if(data[1] != currentVideo){
            videoLoading = true;
            currentVideo = data[1];
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
    clearTimeout(timer);
    channelNumber = channel;
    getStatus();
}

// Start Program
$(document).ready(getStatus);