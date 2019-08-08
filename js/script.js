var size = window.innerHeight + 220;
var current = 1;

function move(scene) {

  var device = el_device.offsetWidth;
  var margin = (device - size) / 2;

  for (var [i, layer] of document.querySelectorAll('img').entries()) {

    var gap = size * (0.5 * i + 1) - size / 2;
    var jump = -(gap * scene + size * 1.5 * (scene - 1) - margin) + (current * (10 + current));

    layer.style.left = jump + 'px';
  }
}

move(1);

function moveLeft() {
	if (current !== 1) {
		current--;
	 	move(current);
	}
}

function moveRight() {
	if (current !== 5) {
		current++;
	 	move(current);
	}
}

var isMoving = false;

function changePage(e) {
	isMoving = true;
		setTimeout(function() {
		isMoving=false;
	},500);

	var direction = (function () {
		var delta = (e.type === 'DOMMouseScroll' ?
				   e.originalEvent.detail * -40 :
				   e.originalEvent.wheelDelta);

		return delta > 0 ? 0 : 1;
	}());
	
	if(direction === 1) {
		moveRight(); 
	} else {
		moveLeft();
	}
}

$(window).on('mousewheel DOMMouseScroll', function (e) {
	if (isMoving) return;
	changePage(e);
});