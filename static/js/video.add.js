var player;

// Set Handlers
$(document).ready(function(){

	initialize();

	$('input[name=youtubeID]').keyup(loadVideo);

	$('button.time').click(function(event){
		event.preventDefault();
		$('input[name='+$(this).attr('name')+']').val(parseInt(player.data('player').p.getCurrentTime()));
	});

    // Validate Upon Submit
    $('form#videoInfo input[type=submit]').click(function(event){
        event.preventDefault();
        if(validate())
            $('form#videoInfo').submit();
    });

});

function initialize(){
    jQuery.tube.defaults['autoload'] = true;
    jQuery.tube.defaults['autoplay'] = true;

    var videoID = 'a';
    if($('input[name=youtubeID]').val().length == 11)
        var videoID = $('input[name=youtubeID]').val();

    // Load Video Player
    player = $('.container.video').player({
        video: videoID, 
        width: '550px', 
        height: '300px',
        playerVars: {
            autoplay: 1,
            cc_load_policy: 0,
            disablekb: 0,
            start: $('input[name=startTime]').val(),
            fs: 0,
            iv_load_policy: 3,
            loop: 1,
            modestbranding: 1,
            playsinline: 0,
            rel: 0,
            showinfo: 0
        },events: {
            play: function(){
                validate();
                $('.time, input[type=submit]').attr('disabled',false);
            }
        }
    });
}

function loadVideo(){
    var youtubeID = $(this).val();
    if(youtubeID != player.data('player').p.getVideoData()['video_id']){
        player.data('player').p.loadVideoById(youtubeID);
        $('input.time').val('');
        $('.time, input[type=submit]').attr('disabled',true);
    }
}

function validate(){
    var videoLength = player.data('player').p.getDuration();
    var startTime = parseInt($('input[name=startTime]').val());
    var endTime = parseInt($('input[name=endTime]').val());

    // Check Youtube ID Is Valid
    if(!videoLength)
        return false;

    // Check End Time
    if(endTime > videoLength || !endTime)
        endTime = videoLength;

    // Check Start Time
    if(startTime < 0 || isNaN(startTime) || startTime >= endTime)
        startTime = 0;

    // Update Time Variables
    $('input[name=endTime]').val(endTime);
    $('input[name=startTime]').val(startTime);
    return true;
}
