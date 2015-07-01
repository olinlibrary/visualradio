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
    $('form#videoInfo [type=submit]').click(function(event){
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
    player = $('div.video').player({
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
                $('button, .time').attr('disabled',false);
            }
        }
    });
}

function loadVideo(){
    var youtubeID = $(this).val();
    if(youtubeID != player.data('player').p.getVideoData()['video_id']){
        player.data('player').p.loadVideoById(youtubeID);
        $('input.time').val('');
        $('button, .time').attr('disabled',true);
    }
}

function validate(){
    ret = true;
    var videoLength = player.data('player').p.getDuration();
    var startTime = parseInt($('input[name=startTime]').val());
    var endTime = parseInt($('input[name=endTime]').val());

    // Check Youtube ID Is Valid
    if(!videoLength){
        ret = false;
        $('div.has-feedback#youtubeID').addClass('has-error');
    }else
        $('div.has-feedback#youtubeID').removeClass('has-error');

    // Check End Time
    if(endTime > videoLength || !endTime){
        ret = false;
        $('div.has-feedback#endTime').addClass('has-error');
    }else
        $('div.has-feedback#endTime').removeClass('has-error');

    // Check Start Time
    if(startTime < 0 || isNaN(startTime) || startTime >= endTime){
        ret = false;
        $('div.has-feedback#startTime').addClass('has-error');
    }else
        $('div.has-feedback#startTime').removeClass('has-error');

    // Update Time Variables
    return ret;
}
