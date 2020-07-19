/**************************************************************************
 * One page template main javascript file
 * @version: 1.1 (19.05.2015)
 * @author Olegnax
 * @website http://olegnax.com
 **************************************************************************/
(function ($) {
	"use strict";
//Global variables
	var $window, root, 
			touch = Modernizr.touch,
			loaderCounter = 0,
//	Array of javascrripts plugins, support external URLs also
			loadScriptsDefault = [
				'imagesloaded.pkgd.min.js',
				'parallax.min.js',
				'smoothScroll.min.js',
				'waypoints.min.js'
			],
			loadScripts = (typeof loadPageScripts === "undefined") ? loadScriptsDefault : loadPageScripts,
			loaderMaxCounter = loadScripts.length + jQuery("body img").length,
			sitePath = window.location.protocol.replace(/\:/g, '') + "://" + window.location.host + window.location.pathname,
			started = 0,
			viewportH,
			fileprotocol = (window.location.protocol == 'file:') ? true : false;

	sitePath = sitePath.split('/');
	sitePath.pop();
	sitePath = sitePath.join('/');
	if (fileprotocol) {
		sitePath = 'http://family.olegnax.com'; //if somebody load html via file protocol
	}


//Easing function
	jQuery.extend(jQuery.easing, {
		easeOutExpo: function (x, t, b, c, d) {
			return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
		}
	});

//Old IE animation fix
	jQuery(document).on("skipAnimation", ".animated", function (e) {
		if (!Modernizr.cssanimations) {

			jQuery(this).trigger('notAnimated');
		}
	});


// Core
	var Core = {
		init: function () {

			$window = $(window);
			root = $('html, body');

			$window.on('ready scroll', function () {
				//			init ToTop function
				SmoothScrollTo.totop();
			});

		}
	};


// Loader
	var Loader = {
		el: jQuery('.loader'),
		bar: jQuery('.loader').find('.bar'),
		//	Site preloader animation
		init: function (callback) {
			if (!touch) {
				jQuery('[data-animation]').css({
					'opacity': 0
				});
			}
			viewportH = jQuery(window).height();
			var margin = (viewportH / 2 - Loader.bar.height() / 2);
			if (Loader.el.length) {
				Loader.bar.css({
					'margin-top': margin + 'px',
					'visibility': 'visible'
				}).addClass('animated fadeInDown fast').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend notAnimated', function () {
					
					jQuery(this).find('.progress').css({
						'visibility': 'visible'
					}).addClass('animated fadeIn faster').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend notAnimated', function () {
						
						Loader.resize();
						$(window).on('load ready resize', function () {
							Loader.resize();
						});
						callback();
					}).trigger('skipAnimation');
				}).trigger('skipAnimation');
			} else {
				callback();
			}
		},
		resize: function () {
			viewportH = jQuery(window).height();
			var margin = (viewportH / 2 - Loader.bar.height() / 2);
			Loader.bar.css('margin-top', margin + 'px');
		},
		progressEl: jQuery('.loader .progress span'),
		updateProgress: function (value) {
			this.progressEl.css({
				width: value + '%'
			});
			if (value === 100) {
				setTimeout(function () {
					Loader.hide();
				}, 800);
			}
			
		},
		hide: function () {
			SmoothScrollTo.init();
			if (Loader.el.length) {
				Loader.bar.find('.progress').addClass('fadeOut faster').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend notAnimated', function () {
					Loader.bar.addClass('fadeOutDown fast').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend notAnimated', function () {
						setTimeout(function () {
							Loader.el.addClass('animated fadeOut faster').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend notAnimated', function () {
								jQuery(this).remove();							
							}).trigger('skipAnimation');

						}, 500);
					}).trigger('skipAnimation');
				}).trigger('skipAnimation');
			} else {
				if (typeof (jQuery.fn.waypoint) !== 'undefined') {
					Waypoints.animation();
				}
			}
		},
		//	Inline preloader
		inlineLoader: {
			loader: '<div class="inline-loader"><svg height="40" width="40" ><circle cx="20" cy="20" r="19" stroke="rgba(190,190,190,.5)" stroke-width="2" fill="none" /></svg><svg height="40" width="40" class="top"><circle cx="20" cy="20" r="19" stroke="#d5ba9c" stroke-width="2" fill="none" stroke-dasharray="25 160" stroke-dashoffset="-8"/></svg><div>',
			init: function (idName) {
				jQuery(idName).each(function () {
					jQuery(this).append(Loader.inlineLoader.loader);
					Loader.inlineLoader.animate(idName);
				});
			},
			animate: function (idName) {
				var angle = 360;
				if (typeof (jQuery.fn.velocity) !== 'undefined') {
					jQuery(idName + ' .top').velocity({
						rotateZ: angle
					}, {
						duration: 900,
						easing: 'linear'
					});
				}
				intervals[idName] = setInterval(function () {
					angle = angle + 360;
					if (typeof (jQuery.fn.velocity) !== 'undefined') {
						jQuery(idName + ' .top').velocity({
							rotateZ: angle
						}, {
							duration: 900,
							easing: 'linear'
						});
					}

				}, 800);
			},
			hide: function (idName) {
				jQuery(idName).find('.inline-loader').remove();
				clearInterval(intervals[idName]);

			}
		}
	};

//Count loading progress for site loader
	var UpdateLoaderCounter = function (url) {
		loaderCounter++;
		var percentage = parseInt(loaderCounter / loaderMaxCounter * 100);

		if (percentage.toString().length == 1) {
			percentage = '  ' + percentage;
		} else if (percentage.toString().length == 2) {
			percentage = ' ' + percentage;
		}

		Loader.updateProgress(percentage);

		if (loaderCounter === loadScripts.length) {
			InitJS();
		}

	};

// AJAX loading of javascripts plugins
	var LoadJS = function () {

		var url = [];

		jQuery.each(loadScripts, function (i)
		{

			if (/(^http:\/\/)|(^https:\/\/)|(^\/\/)|(^www.)/.test(loadScripts[i])) {
				url[i] = loadScripts[i];
			} else {
				url[i] = sitePath + '/js/' + loadScripts[i]
			}

			jQuery.ajax({
				url: url[i],
				dataType: "script",
				cache: true,
				success: function () {
					UpdateLoaderCounter(url[i]);
				}
			});




		});

	}

// Smooth anchor scrolling
	var SmoothScrollTo = {
		init: function () {
			jQuery("body").attr('id', 'pagetop').append('<a href="#pagetop" id="toTop" style="display: none;"><span id="toTopHover" style="opacity: 0;"></span><small>To Top<small></a>');
			SmoothScrollTo.links();
		},
		scroll: function ($target) {


			var offset = $target.offset().top;


			root.stop().animate({
				'scrollTop': offset
			}, 500, 'easeOutExpo');
		},
		links: function () {
			jQuery("a[href^='#']").on({
				click: function (e) {
					e.preventDefault();
					if (this.hash.length && (jQuery(this.hash).length || jQuery('*[data-hash="' + this.hash.replace("#", "") + '"]').length)) {

						var $target = (jQuery(this.hash).length) ? jQuery(this.hash) : jQuery('*[data-hash="' + this.hash.replace("#", "") + '"]');

						SmoothScrollTo.scroll($target);

					}
				},
			});
		},
		//ToTop link show/hide
		totop: function () {
			if (jQuery(window).scrollTop() > 100) {
				jQuery('a#toTop').show();
			} else {
				jQuery('a#toTop').hide();
			}
		}
	}






//Waypoints for menu and hashtags
	var Waypoints = {
		//Content on appear animation. Added animate.css classes to each element with data "animation"
		init: function () {
			jQuery('[data-animation]').waypoint({
				triggerOnce: true,
				offset: '90%',
				handler: function () {

					var ele = jQuery(this);
					var fx = ele.attr('data-animation');
					var delay = ele.attr('data-delay');


					if (typeof delay === "undefined") {
						delay = 0;
					} else {
						delay = parseFloat(delay.replace(",", "."));
					}

					setTimeout(function () {
						ele.addClass('animated ' + fx).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend notAnimated', function () {
							ele.css({
								'opacity': 1
							}).removeClass('animated ' + fx);
						}).trigger('skipAnimation');

					}, delay * 1000);
				}
			});
		}

	}



//General functions
	var General = {
		init: function () {

			if (!touch)
				General.parallax('.parallax-section');


		},
		parallax: function (idName) {
			jQuery(idName).each(function () {
				if (typeof (jQuery.fn.parallax) !== 'undefined') {
					jQuery(this).parallax();
				}
			});
		}
	}



// Init all functions
	var InitJS = function (callback) {


		// check if imagesloaded.pkgd.min.js loaded
		if (typeof (jQuery.fn.imagesLoaded) !== 'undefined') {
				jQuery('body').imagesLoaded().progress(function (instance, image ) {
				UpdateLoaderCounter(image.img.src);
			});
		} else {
			Loader.updateProgress('100');
		}


		Core.init();



		General.init();
		// check if waypoints.min.js loaded
		if (typeof (jQuery.fn.waypoint) !== 'undefined') {
			Waypoints.init();
		}




		

		$window.trigger('resize');
	};



// START
	jQuery(function () {
		Loader.init(function () {

		if (started !== 1)
			LoadJS();
			started = 1;
		});
	});
})(jQuery);