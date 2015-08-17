// variables
var menu = document.getElementById('menu');
var menuChilds = menu.children;

// delta params
var defaultDuration = 1000;
var defaultDelay = 10
var submenuIsVisible = false;
var x;
// delta params

// variables

// interval auxiliar
function intervalInstance(id, type) {
	this.id = id;
	this.type = type;
}

var interval = {
	intervals : [],

	make : function (func, delay, intervalType) {
		var newInterval = setInterval(func, delay);

		this.intervals[this.intervals.length] = new intervalInstance(newInterval, intervalType);

		return newInterval;
	},

	clear : function (id) {
		var index;
		for (index = 0; index < this.intervals.length; index++)
			if (this.intervals[index].id == id) {
				clearInterval(this.intervals[index].id);
				this.intervals.splice(index, 1);
				index -= 1;
			}
	},

	clearType : function (type) {
		var index;
		for (index = 0; index < this.intervals.length; index++)
			if (this.intervals[index].type == type) {
				clearInterval(this.intervals[index].id);
				
				this.intervals.splice(index, 1);
				index -= 1;
			}
	},

	clearAll : function () {
		var index;
		for (index = 0; index < this.intervals.length; index++)
			clearInterval(this.intervals[index].id);

		this.intervals = [];
	}
};
// interval auxiliar

// functions
var deltaPow = function(progress) {
	return Math.pow(progress, 5);
}

var deltaBack = function (progress) {
	return back(progress, x);
}

var back = function (progress, x) {
    return Math.pow(progress, 2) * ((x + 1) * progress - x)
}


var deltaEaseOut = function(delta) {
	return function(progress) {
		return 1 - delta(1-progress);
	}
}

var deltaEaseInOut = function(delta) {
	return function(progress) {
		if (progress <= 0.5) { // the first half of the animation)
			return delta(2 * progress) / 2
		} else { // the second half
			return (2 - delta(2 * (1 - progress))) / 2
		}

	}
}
// funcitons

// generic movement and animation functions
var moveBack = function(element, initialPos, amountRemove, type, delay, duration, styleType, deltaFunc) {
	
	var c = initialPos;
	var to = amountRemove;
	animate(type, delay || defaultDelay, duration || defaultDuration, deltaFunc, function(delta) {
		element.style.top = (c - (to * delta)) + styleType;
	});

}

var moveFoward = function(element, initialPos, amountAdd, type, delay, duration, styleType, deltaFunc) {
	
	var c = initialPos;
	var to = amountAdd;

	animate(type, delay || defaultDelay, duration || defaultDuration, deltaFunc, function(delta) {
		element.style.top = (c + (to * delta)) + styleType;
	});
}

var animate = function(type, delay, duration, deltaFunc, stepFunc) {
	
	var start = new Date;

	var id = interval.make(function() {
		var timePassed = new Date - start;
		var progress = timePassed / duration;

		if (progress > 1)
			progress = 1;

		var delta = deltaFunc(progress);
		stepFunc(delta)
		
		if (progress == 1) {
			interval.clear(id);
		}

	}, delay, type);

};
// generic movement and animation functions

// animations
var menuMovement = function() {
	var initialPos = parseInt(menu.style.top);

	moveBack(menu, // element
			 initialPos, // initial position
			 initialPos - 3, // amout to remove from position
			 'menu',
			 10, // delay
			 500, // duration
			 '%', // style type - % or px
			 deltaEaseOut(deltaPow) // function to calculate delta
	);

}

var subMenuAppearing = function() {
	var submenu = document.getElementById('submenu');

	var initialPos = parseInt(submenu.style.top);
		
	var type = 'submenu';
	interval.clearType(type);

	moveBack(submenu, // element
		   initialPos, // initial position
		   initialPos - 10, // amout to remove from position
		   type,
		   10, // delay
		   500, // duration
		   '%', // style type - % or px
		   deltaEaseOut(deltaPow) // function to calculate delta
	);
}

var subMenuDisappearing = function() {
	var submenu = document.getElementById('submenu');

	var initialPos = parseInt(submenu.style.top);

	var type = 'submenu';
	interval.clearType(type);

	moveFoward(submenu, // element
			   initialPos, // initial position
			   100 - initialPos, // amout to to add in position
		   	   type,
			   10, // delay
			   500, // duration
			   '%', // style type - % or px
			   deltaPow // function to calculate delta
	);
}

// loops to add events
var index;
var curElement;
for(index = 0; index < menuChilds.length; index += 1) {
	curElement = menuChilds[index].children[0];
	
	curElement.addEventListener('click', function() {
		menuMovement();

		if(this.text == 'PORTFOLIO') {

			if (!submenuIsVisible) {
				submenuIsVisible = true;
				subMenuAppearing();
			}
		}
		else {

			if (submenuIsVisible) {
				submenuIsVisible = false;
				subMenuDisappearing();
			}
		}
	});
}
// animations