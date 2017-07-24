// file for touch event handlers

var touchActive, touchStartX, touchStartY, touchCurrentX, touchCurrentY;

document.body.addEventListener('touchstart', function(event) {
  if (!paused)
    event.preventDefault();

  touchActive = event.targetTouches.length == 1 && !paused;

  if (touchActive) {
    touchStartX = event.targetTouches[0].pageX;
    touchStartY = event.targetTouches[0].pageY;
    touchCurrentX = touchStartX;
    touchCurrentY = touchStartY;
  }
}, { passive: false });

document.body.addEventListener('touchmove', function(event) {
  event.preventDefault();

  if (touchActive) {
    touchCurrentX = event.targetTouches[0].pageX;
    touchCurrentY = event.targetTouches[0].pageY;
  }
}, { passive: false });

document.body.addEventListener('touchend', function(event) {
  if (touchActive) {
    var diffX = touchCurrentX - touchStartX;
    var diffY = touchCurrentY - touchStartY;

    // classify the swipe / tap
    if (diffX*diffX + diffY*diffY > 10000) {
      event.preventDefault();
      // swipe
      if (Math.abs(diffX) >= Math.abs(diffY)) {
        if (diffX > 0) {
          // swipe right
          console.log('swipeR');
          if (lane < 2) lane++;
        } else {
          // swipe left
          console.log('swipeL');
          if (lane > 0) lane--;
        }
      } else {
        if (diffY > 0) {
          // swipe down
          paused = !paused;
          document.getElementById("over").style.height = paused ? "100%" : "0";
        } else {
          // swipe up
          yPos = 0;
          yVel = jumpVel;
        }
      }
    } else {
      // tap
    }

  }

  touchActive = false;
}, { passive: false }); 