// JavaScript Document
/*jshint esversion: 6 */
var myVar;
	function outTimer(y,x) {
			"use strict";
			
    myVar = setTimeout(function(){ y(x); removeOpacity('tracker'); removeOpacity('fleet'); removeOpacity('logo'); removeOpacity('modern');  }, 14000);
}
	
function StopoutTimer() {
		"use strict";
	var clearTimeout;
    clearTimeout(myVar);
}
	
document.getElementById('modern').addEventListener("click", function () {
		"use strict";
	var i = 0;
	hideFleet( i );
	hideTracker( i );
	setOpacity( 'modern-expand', '0' );
	setVisibility( 'modern-expand', 'inline' );
	setOpacity('tractor-move', '1');
	setTimeout( function () {
	setOpacity( 'modern-expand', '1' );
	setOpacity( 'modern', '0' );
	setOpacity( 'modern-text', '0' );
	setVisibility( 'modern-text', 'inline' );
			setOpacity('tracker', '0.5'); 
	setOpacity('fleet', '0.5'); 
	setOpacity('logo', '0.5');
		},
				   500);
	setTimeout(function() {
  setVisibility('modern', 'none');
	setVisibility('modern-expand', 'inline');
	 setVisibility('tractor-move', 'inline');
	addClass('tractor-move', ['animated', 'slideInRight']); 
	setOpacity('modern-text', '1'); 

			},
				   1000);
	outTimer(hideModern,0);
});	
document.getElementById('fleet').addEventListener("click", function () {
		"use strict";
		var i = 0;
	hideModern(i);
	hideTracker(i);
	setOpacity( 'fleet-expand', '0' );
	setVisibility( 'fleet-expand', 'inline' );
	setTimeout( function () {
	setOpacity( 'fleet-expand', '1' );
	setOpacity( 'fleet', '0' );
	setOpacity( 'fleet-text', '0' );
	setVisibility( 'fleet-text', 'inline' );
	setOpacity('cogs-move-all', '0');
	setVisibility('cogs-move-all', 'inline');
			setOpacity('tracker', '0.5'); 
	setOpacity('modern', '0.5'); 
	setOpacity('logo', '0.5');
		},
				   500);
	setTimeout(function() {
	setOpacity('fleet-text', '1');
	setOpacity('cogs-move-all', '1');

			},
				   1000);
	outTimer(hideFleet,0);
});	
document.getElementById('tracker').addEventListener("click", function () {
		"use strict";
		var i = 0;
	hideModern(i);
	hideFleet(i);
	setOpacity( 'tracker-expand', '0' );
	setVisibility( 'tracker-expand', 'inline' );
	setTimeout( function () {
	setOpacity( 'tracker-expand', '1' );
	setOpacity( 'tracker', '0' );
	setOpacity( 'tracker-text', '0' );
	setVisibility( 'tracker-text', 'inline' );
	setOpacity('tracker-move', '0');
	setVisibility('tracker-move', 'inline');
			setOpacity('fleet', '0.5'); 
	setOpacity('modern', '0.5'); 
	setOpacity('logo', '0.5');
		},
				   500);
	setTimeout(function() {
	setOpacity('tracker-text', '1');
	setOpacity('tracker-move', '1');

			},
				   1000);
	outTimer(hideTracker,0);
});	

function hideFleet(v) {
		"use strict";
		var i = v; 
		if(i===1) { 
    return; //stop the execution of function
}
		setOpacity('fleet-expand', '0'); 
		setOpacity('cogs-move-all', '0');
		setVisibility('fleet', 'inline');
			setOpacity('fleet', '1');
		setTimeout(function() { 
		setVisibility('fleet-expand', 'none'); 
		setVisibility('cogs-move-all', 'none');
		setOpacity('fleet-text','0');		
		},
				   300); 
		setTimeout(function() { 
			removeOpacity('fleet');
			setVisibility('fleet-text','none');
					   },
				   310); 
	}
function hideModern(v) {
		"use strict";
		var i = v; 
		if(i===1) { 
    return; //stop the execution of function
}
		setOpacity('modern-expand', '0'); 
		setOpacity('tractor-move', '0');
		setVisibility('modern', 'inline');
		setTimeout(function() { 	
		setOpacity('modern', '1');	
		setVisibility('modern-expand', 'none'); 
		setVisibility('tractor-move', 'none');
		removeClass('tractor-move', ['animated', 'slideInRight']);  
		setOpacity('modern-text','0');	
		},
				   300); 

		setTimeout(function() { 
			removeOpacity('modern');
			setVisibility('modern-text','none');
							   },
				   310); 
	}
function hideTracker(v) {
		"use strict";
		var i = v; 
		if(i===1) { 
    return; //stop the execution of function
}
		setOpacity('tracker-expand', '0'); 
		setOpacity('tracker-move', '0');
		setVisibility('tracker', 'inline');
		setOpacity('tracker', '1');
		setTimeout(function() { 
			setVisibility('tracker-expand', 'none'); 
		setVisibility('tracker-move', 'none');
		setOpacity('tracker-text','0');
		},
				   300); 
	setTimeout(function() { 
			removeOpacity('tracker');
			setVisibility('tracker-text','none');
					   },
				   310); 
	
	}	
	
function removeOpacity(id) {
		"use strict";
document.getElementById(id).style.opacity = null;	
}		 
function setVisibility(id, visibility) {
		"use strict";
document.getElementById(id).style.display = visibility;	
}
	function setOpacity(id, opacity) {
			"use strict";
document.getElementById(id).style.opacity = opacity;
}
	function removeClass(id, classes) {
			"use strict";
		var list = classes;
document.getElementById(id).classList.remove(...list );
	}
	function addClass(id, classes) {
			"use strict";
		var list = classes;
document.getElementById(id).classList.add(...list);
	}

	$(function() {
		"use strict";
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});