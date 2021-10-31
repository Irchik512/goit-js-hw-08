import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const LOCAL_KEY = 'videoplayer-current-time';
const iframeEl = document.querySelector('#vimeo-player');
const player = new Player(iframeEl);

player.on('play', () => console.log('played the  video!'));
// player.getVideoTitle().then(title => console.log('title:', title));
player.on(
  'timeupdate',
  throttle(evt => {
    localStorage.setItem(LOCAL_KEY, evt.seconds);
  }, 1000),
);

player
  .setCurrentTime(localStorage.getItem(LOCAL_KEY))
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
