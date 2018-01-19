( function($){

// ******************************************************			
// ******************************************************
	// jQuery READY
// ******************************************************
// ******************************************************

	var GOOGLE_API_KEY;

	var $window;
	var $body;
	var $page;

	var start;
	var wait;
	var touch;

	var isTouch = function() {
	  return 'ontouchstart' in window        // works on most browsers 
	      || navigator.maxTouchPoints;       // works on IE10/11 and Surface
	}

	// *****************************************************
	// *      INIT
	// *****************************************************

	var initPage = function(){
		$.consoleDebug( DEBUG, 'initPage()');

		$window 	= $( window );
		$body 		= $( 'body' );

		start 		= 'documentDone';
		wait 		= $body.data( 'fade-wait' );
		touch 		= isTouch();//$body.hasClass( 'touch' );

		GOOGLE_API_KEY = $body.attr( 'data-gmap' );

		$body.removeClass('loaded');
		$body.removeClass( 'bodyin' );
		$( 'html' ).removeClass( 'no-js' );

		$body.setLocationData( window.location );
		$body.disableIt();
		$body.addClass( touch ? 'touch' : 'no-touch' );

		$( document )
			.on( 'mousedown', function(e) { $body.removeClass( 'keyboard' ) })
        	.on( 'keydown', function(e) {
				if( e.key == 'Tab' ) $body.addClass( 'keyboard' );
			});
	}

	// *****************************************************
	// *      DEBUG
	// *****************************************************

	var debugEvents = function(){
		$.consoleDebug( DEBUG, 'debugEvents()');

		if( DEBUG ){
			$body.on( 'documentDone', function(e){ $.log('[on] document.done', touch); } );
			$body.on( 'nivoLoaded', function(e){ $.log('[on] nivoLoaded', touch); } );
			$body.on( 'mapLoaded', function(e){ $.log('[on] mapLoaded', touch); } );
			$body.on( 'mapsLoaded', function(e){ $.log('[on] mapsLoaded', touch); } );
			$body.on( 'documentReady', function(e){ $.log('[on] document.ready', touch); } );
			$body.on( 'documentLoaded', function(e){ $.log('[on] document.loaded', touch); } );
		}
		$body.trigger( 'documentJquery' );
		if( DEBUG ) $.log('[on] documentJquery', touch);
	}

	// *****************************************************
	// *      TOUCH
	// *****************************************************

	/*var touchEvents = function(){
		$.consoleDebug( DEBUG, 'touchEvents()');

        if ( touch ) {

            $( '.navigation' ).toggleSwipe();

        }
	}*/

	// *****************************************************
	// *      START EVENTS
	// *****************************************************

	var startEvents = function(){
		$.consoleDebug( DEBUG, 'startEvents()');

		$.consoleDebug( DEBUG, '- start event is: ' + start );
		
		var isready = false;
		$body.off( start ).on( start, function(e){
			if( DEBUG ) $.log('[on] startEvent.' + start, touch);
			isready = true;
			$.bodyIn();
		} );
	}

	// *****************************************************
	// *      LAYOUT EVENTS
	// *****************************************************

	var layoutEvents = function(){
		$.consoleDebug( DEBUG, 'layoutEvents()');

		// WINDOW RESIZE event
		var interval, resizing;
		$window.off( 'resize' ).on( 'resize', function(e){
			$body.trigger( 'resizing' );
			resizing = true;
			clearTimeout( interval );
			interval = setTimeout( function(){
				if ( resizing ){
					resizing = false;
					$body.trigger( 'resized' );
					$.consoleDebug( DEBUG, '- resized' );
					clearInterval( interval );
				}
			}, 250 );
		} );
		
		// BODY RESIZING and RESIZED event
		$body.off('resizing resized imgsLoaded').on( 'resizing resized imgsLoaded', function(e){
			$body.eventResponsive( e );
			$( '[data-equal]' ).equalChildrenSize();
		} );

		var $toggle_mobile = $( '[data-switch-toggle="is-mobile"]' );
		if( $toggle_mobile.length && $body.hasClass( 'is-mobile' ) ){
			$toggle_mobile.switchByData( 'is-mobile', 'switch-toggle', 'toggle', '.toggle-image, .toggle-home' );
			$( '[data-switch="is-mobile"]' ).switchByData( 'is-mobile', 'switch' );
			$body.addClass('toggled-nav');
			$toggle_mobile.toggledOff();
		}

		var $toggle_touch = $( '[data-switch-toggle="touch"]' );
		if( $toggle_touch.length && $body.hasClass( 'touch' ) ){
			$toggle_touch.switchByData( 'touch', 'switch-toggle', 'toggle', '.toggle-image, .toggle-home' );
			$( '[data-switch="touch"]' ).switchByData( 'touch', 'switch' );
			$body.addClass('toggled-nav');
			$toggle_touch.toggledOff();
		}

		// BODY RESPONSIVE event
		$body.off('responsive').on( 'responsive', function( e, state ) {
			$( '[data-switch-toggle]' ).not( '[data-switch-toggle="is-mobile"]' ).not( '[data-switch-toggle="touch"]' ).switchByData( state, 'switch-toggle', 'toggle', '.toggle-image, .toggle-home' );
			$( '[data-switch]' ).not( '[data-switch="is-mobile"]' ).not( '[data-switch="touch"]' ).switchByData( state, 'switch' );
			$( '[data-sticky]' ).stickyMenu();
			$( '[data-affix]' ).affixIt();
		} );
	}

	// *****************************************************
	// *      TOGGLE MENU EVENTS
	// *****************************************************

	var navEvents = function(){

		$.consoleDebug( DEBUG, 'navEvents()');

		$window.off( 'scroll').on( 'scroll', function(e){
			
			$( '.toggled' ).toggledOff();
		} );
		
		$body.on( 'resizing', function(e){ $( '.toggled' ).toggledOff(); } );
		$body.off( 'switchOn').on( 'switchOn', '.navigation.toggle', function( e, state ){ $( this ).toggledOff(); $body.addClass('toggled-nav'); } );
		$body.off( 'switchOff').on( 'switchOff', '.navigation[data-toggle="true"]', function( e, state ){ $body.removeClass('toggled-nav'); } );
		
		$page = $( '.site-page' );
		$page.off( 'click').on( 'click', '.toggle-button', function(e){ $( this ).toggledIt(e); } );
		$page.off( 'mousedown').on( 'mousedown', '*', function(e){ if( e.target == this ){ $( '.toggled' ).toggledOff(); } } );
	}

	// *****************************************************
	// *      ACF FORMS EVENTS
	// *****************************************************

	var formEvents = function(){

		$.consoleDebug( DEBUG, 'formEvents()');

		/*$document = $( document );
		$document.keydown( function(e){
			if( e.key == 'Alt' ){
				$body.addClass( 'form-active' );
			}
		} );
		$document.keyup( function(e){
			if( e.key == 'Alt' ){
				$body.removeClass( 'form-active' );
			}
		} );*/

		var $forms = $( '#scm-forms' );

		if( $forms.length ){

			//$( '.acf-gallery-add' ).click( function(e){
				/*e.preventDefault;
				e.stopPropagation();

				var media = wp.media({
					title: 'Select or Upload Media Of Your Chosen Persuasion',
  					button: { text: 'Use this media' },
    				multiple: true,
    				frame: 'post'
				})
				media.view.settings.post.id = $this.data( 'id' );
				media.open();*/
			//} );
		
			$( '.post[data-id]' ).click( function(e){
				
				if( e[ADVANCED] && !$forms.hasClass( 'show' ) ){
					e.preventDefault;
					e.stopPropagation();
					window.ontouchmove  = function(e) {
						e = e || window.event;
						if (e.preventDefault)
							e.preventDefault();
						e.returnValue = false;  
					}
					$body.addClass( 'no-scroll' );
					$this = $( this );


					if( wp.media ){
						wp.media.view.settings.post.id = $this.data( 'id' );
						/*wp.media.events.on( 'editor:frame-create', function( arguments ) {
						});*/
					}
					
					$form = $( '#form-' + $this.data( 'id' ) );
					$forms.addClass( 'show' );
					if( $form.length )
						$form.addClass( 'show' );
				}
			} );

			$( '#scm-close-forms' ).click( function(e){
				e.preventDefault;
				e.stopPropagation();
				window.ontouchmove = null;
				$body.removeClass( 'no-scroll' );
				$forms.removeClass( 'show' );
				$( '.acf-form' ).removeClass( 'show' );
			});

			$.consoleDebug( DEBUG, '- form events');
		}

		$.consoleDebug( DEBUG, '- no form events');
	}

	// *****************************************************
	// *      POPSTATE
	// *****************************************************

	var popstateEvents = function(){
		$.consoleDebug( DEBUG, 'popstateEvents()');

		window.onpopstate = function(event) {
			if( event.state ){
				
				
				//if( link.length ){
					switch( event.state.type ){
						/*case 'single':
							var element = event.state.element;
							var link = $( '[data-href="' + $.getCleanUrl( document.location.href ) + '"]' );

							if( link.length ){
								$(link[0]).loadSingle( '', true );
							}else if( element ){
								console.log( element );
								$body.loadSingle( $.getCleanUrl( document.location.href ), true, element );
							}
							return;
						break;*/
						/*case 'load':
							$(link[0]).loadContent( document.location.href, '', '', '', true );
						break;*/
						default:
							window.location.href = document.location.href;
						break;
					}
				//}
			}
		}
	}

	// *****************************************************
	// *      LOAD EVENTS
	// *****************************************************

	var loadEvents = function(){
		$.consoleDebug( DEBUG, 'loadEvents()');

		$body.off( 'loadSingleAfter' ).on( 'loadSingleAfter', function(e,parent){
			INITPAGE();
		} );

		/*var $fancy = $( '[data-popup]' );
		if( $fancy.length ){

			var $head = $( 'head' );

			var path = 'https://cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/';

			$head.append( '<link type="text/css" href="' + path + 'jquery.fancybox.min.css" rel="stylesheet" media="all">' );
			$head.append( '<link type="text/css" href="' + path + 'helpers/jquery.fancybox-thumbs.css" rel="stylesheet" media="all">' );
			$head.append( '<link type="text/css" href="' + path + 'helpers/jquery.fancybox-buttons.css" rel="stylesheet" media="all">' );
        
			$body.append( '<script type="text/javascript" src="' + path + 'jquery.fancybox.pack.js">' );
			$body.append( '<script type="text/javascript" src="' + path + 'helpers/jquery.fancybox-thumbs.js" async defer>' );
			$body.append( '<script type="text/javascript" src="' + path + 'helpers/jquery.fancybox-buttons.js" async defer>' );
			$body.append( '<script type="text/javascript" src="' + path + 'helpers/jquery.fancybox-media.js" async defer>' );

			$fancy.setFancybox();
		}*/
		
		// IMAGES event
		$( '[data-slider="nivo"]' ).setNivoSlider();
		$( '[data-slider="bx"]' ).setBxSlider();
		$body.on( 'imgsLoaded', function( e ) {
		    $( '[data-equal]' ).equalChildrenSize();
		});

		// ADD TO CALENDAR event
	    var $cals = $( '.addtocalendar' );
	    if( $cals.length ){

	    	$cals.InitCalendar();
	    	
	    }
		
		initMaps();
		initCharts();

		// WINDOW LOADED event
		$window.off( 'load' ).on( 'load', function(e){
			if( $body.attr( 'data-premature-action' ) ){
				$.consoleDebug( DEBUG, '*** PREMATURE ACTION ***');
				window.location.hash = '#content-loaded';
				setTimeout(function(){
					$body.removeAttr( 'data-premature-action' );
					$body.setUrlData( window.location.pathname, $body.attr( 'data-anchor' ), $body.attr( 'data-params' ) );
				}, 500);
			}
			$body.trigger( 'documentLoaded' );
			$body.addClass('loaded');
		} );
	}

	// GOOGLE MAPS event
	var initMaps = function(){

	    var $maps = $( '.scm-map' );
	    if( $maps.length ){

	    	if( !GOOGLE_API_KEY )
				alert( 'Set Google Maps API Key' );

			if( !window.ifgooglemaps || typeof google != 'object' ){
            	
		    	$.getScript( 'https://maps.googleapis.com/maps/api/js?key=' + GOOGLE_API_KEY, function( data, textStatus, jqxhr ) {
					$.getScript( 'https://cdn.rawgit.com/googlemaps/v3-utility-library/master/markerwithlabel/src/markerwithlabel.js', function( data, textStatus, jqxhr ) {
						//$.getScript( 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js', function( data, textStatus, jqxhr ) {
						$.getScript( 'https://cdn.rawgit.com/googlemaps/v3-utility-library/master/markerclustererplus/src/markerclusterer.js', function( data, textStatus, jqxhr ) {
							
							window.ifgooglemaps = 1;
							$maps = $( '.scm-map' );
							$maps.googleMap();

						});
					});
				});
			}

			$.consoleDebug( DEBUG, '- maps events');
		}else{
			$.consoleDebug( DEBUG, '- no maps events');
		}

	}

	// GOOGLE CHARTS event
	var initCharts = function(){
		
	    var $charts = $( '.scm-chart' );
	    if( $charts.length ){

	    	console.log(window.ifgooglecharts);  

	    	if( !window.ifgooglecharts || typeof google != 'object' )
                $.getScript( 'https://www.gstatic.com/charts/loader.js', function( data, textStatus, jqxhr ) {
                     console.log('1');   
                    window.ifgooglecharts = 1;
                    google.charts.load( 'current', { packages: ['corechart'] } ); // variabile da elementi esistenti data-packages
                    google.charts.setOnLoadCallback( function(){
                    	console.log('e 2');
                        $charts = $( '.scm-chart' );
                        $charts.googleChart();
                    } );

                });

	    	$.consoleDebug( DEBUG, '- charts events');
	    }else{
	    	$.consoleDebug( DEBUG, '- no charts events');
	    }
	}

	// *****************************************************
	// *      SETUP PAGE
	// *****************************************************

	var setupPage = function(){
		$.consoleDebug( DEBUG, 'setupPage()');

		// Set TOOLS
		$body.eventsInit( 1, 1, 1, wait != 'nobg', 'force');
		
		// Trigger DOCUMENT READY event
		$body.trigger( 'documentDone' );
		$body.addClass('ready');
	}

	// *****************************************************
	// *      START
	// *****************************************************

	INITPAGE = function(){
		$.consoleDebug( DEBUG, '[ INITPAGE Start ]');

		initPage();
			debugEvents();
			//touchEvents();
			startEvents();
			layoutEvents();
			navEvents();
			formEvents();
			popstateEvents();
			loadEvents();
		setupPage();

		$.consoleDebug( DEBUG, '[ INITPAGE Done ]');
	}
	INITPAGE();

	READYPAGE = function(){
		// Safari Fix **************************************
		window.onpageshow = function(event) {
		    if (event.persisted && $body.hasClass('safari')) 
		    	$.bodyIn();
		};
	}

	// *****************************************************
	// *****************************************************
	// *****************************************************
		
	jQuery(function($){

		READYCHILD();
		READYPAGE();	

		// Trigger DOCUMENT READY event
		$body.trigger( 'documentReady' );
	});

} )( jQuery );

