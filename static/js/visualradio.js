$(document).ready(function(){
    getChannelList();
    initializePlayer();
    checkInitialized();
});

// Youtube Player Initialization
    var player, playerHandle;

    function initializePlayer(){
        jQuery.tube.defaults['autoload'] = true;
        jQuery.tube.defaults['autoplay'] = true;

        // Load Video Player
        player = $('.container.video').player({
            video: 'none', 
            width: '100%', 
            height: '100%',
            playerVars: {
                controls: 0,
                cc_load_policy: 0,
                disablekb: 0,
                fs: 0,
                iv_load_policy: 3,
                loop: 1,
                modestbranding: 1,
                playsinline: 0,
                rel: 0,
                showinfo: 0
            },
            events: {
                play: function(){
                    playerHandle.p.mute();
                    playerHandle.p.setLoop();
                    // playerHandle.p.setPlaybackQuality('hd1080');
                    videoLoading = false;
                }
            }
        });
        playerHandle = player.data('player');
    }

    const POLLTIME_INITIALIZE = 30; // Milliseconds to wait for player to initialize
    function checkInitialized(){
        if(!playerHandle.p || !playerHandle.p.loadVideoById)
            return setTimeout(checkInitialized, POLLTIME_INITIALIZE);
        update();
    }


// Channel List Initialization 
    var channelList = [];
    var channelNumber = 0;
    function getChannelList(){
        // Grab Active Channel Numbers
        $('.channelguide a').each(function(index){
            $(this).attr('ind',index);
            channelList.push(parseInt($(this).attr('id')));
        });

        // Grab Current Channel from Hash
        if(window.location.hash.length > 1 && $('.channelguide a[id='+window.location.hash.substring(1)+']').attr('id')){
            $('.channelguide a[id='+window.location.hash.substring(1)+']').addClass('active');
            channelNumber = $('.channelguide a[id='+window.location.hash.substring(1)+']').attr('ind');
        }else{
            window.location.hash = $('.channelguide a:first').attr('id');
            $('.channelguide a:first').addClass('active');
        }

        $(window).trigger('channelListInitialized');
    }


// Load Videos, Switch Channels
    const POLLTIME_NOCONNECTION = 1000;
    var videoLoading = false;
    var videoStartTime;
    var videoEndTimer;
    var videoChangeTimer;
    function update(){
        videoLoading = true;
        $.ajax({
            url: '/channel/'+channelList[channelNumber]+'/status',
            dataType: 'json',
            success: function(data){
                $('.error').hide();

                var time = new Date().getTime() / 1000;
                var videoTime = parseInt(data['time_current']);
                videoStartTime = time - videoTime;
                videoEndTimer = setTimeout(update, parseInt(data['time_remaining'])*1000);

                playerHandle.p.loadVideoById(data['youtube_id'], videoTime+LAG_OFFSET);
            },
            error: function(){
                $('.error').show();
                setTimeout(update, POLLTIME_NOCONNECTION);
            }
        });
    }
    $(window).on('changeChannel', function(event, channel){
        if(channelNumber == channel) return;

        channelNumber = channel;
        update();

        $('.channelguide a').removeClass('active');
        $('.channelguide a[ind='+channel+']').addClass('active')

        clearTimeout(videoEndTimer);
        setTimeout(function(){
            window.location.hash = $('.channelguide a[ind='+channel+']').attr('id');
        },TIME_MENUSHOW+50);

        console.log('Channel Changed to: ', channelList[channelNumber]);
    });


// Video Lag Checking
    const ALLOWABLE_LAG = 5; // Seconds
    const INTERVAL_LAGCHECK = 5000; // Milliseconds
    const LAG_OFFSET = 2; // Seconds
    var lagCheckTimer = setInterval(lagCheck, INTERVAL_LAGCHECK);
    function lagCheck(){
        if(videoLoading) return;

        var time = new Date().getTime() / 1000;
        var videoTimeActual = playerHandle.p.getCurrentTime();
        var videoTimeScheduled = time-videoStartTime;
        var lag = videoTimeScheduled-videoTimeActual;

        if(Math.abs(lag) > ALLOWABLE_LAG){
            videoLoading = true;
            playerHandle.p.seekTo(videoTimeScheduled+LAG_OFFSET);
        }
    }