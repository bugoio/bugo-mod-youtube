if(!youtube){
  var youtube = document.createElement('script');
  youtube.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(youtube, firstScriptTag);
}

$(document).ready(function(){

  $('.video-link').on('click',function(e){
    e.preventDefault();
    console.log(this,'clicked');
    $('.video-modal').toggleClass('open');
    var player;
    var ytid = $(this).attr('data-ytid');
    var target = $(this).attr('data-target');
    var done = false;

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
        event.target.playVideo();
      }

      function onPlayerStateChange(event) {
        switch(true){
          case event.data == YT.PlayerState.ENDED:
            player.destroy();
            $('.video-modal').removeClass('open');
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