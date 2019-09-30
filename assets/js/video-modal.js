if(!youtube){
  var youtube = document.createElement('script');
  youtube.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(youtube, firstScriptTag);
}

$(document).ready(function(){

  $('.video-link').on('click',function(e){
    e.preventDefault();
    var player;
    var ytid = $(this).attr('data-ytid');
    var target = $(this).attr('data-target');
    var modal = $(this).attr('data-modal');
    var done = false;

    console.log(player,ytid,target);

    $('#' + modal).toggleClass('open');


    function onYouTubeIframeAPIReady() {
      player = new YT.Player(target,{
        height: '390',
        width: '640',
        videoId: ytid,
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });

      function onPlayerReady(event) {
        player.playVideo();
      }

      function onPlayerStateChange(event) {
        console.log(event.data,YT.PlayerState);
        switch(true){
          case event.data == YT.PlayerState.ENDED:
            console.log('ended');
            // $('.video-modal').removeClass('open');
            player.destroy();
            // $('.video-modal div div').append('Hey sign up for our newsletter');
            break;
        }
      }

      function stopVideo() {
        player.stopVideo();
      }

      function pauseVideo() {
        player.pauseVideo();
      }

      console.log(player);

      $('.video-modal').on('click',function(){
        console.log($(this).is('.open'),'clicked');
        if($(this).is('.open')){
          $('.video-modal').removeClass('open');
          pauseVideo();
        }
      });

      $('.iframe-wrapper').on('click',function(e){
        e.stopPropagation();
      });
    }

    onYouTubeIframeAPIReady();

  });

});