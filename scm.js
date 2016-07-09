( function($){

// ******************************************************			
// ******************************************************
	// jQuery READY
// ******************************************************
// ******************************************************

		var GOOGLE_API_KEY;

		var $window;
		var $html;
		var $head;
		var $body;
		var $location;
		var $navigation;
		var $page;

		var href;
		var start;
		var touch;
		var wait;


		// *****************************************************
		// *      INIT
		// *****************************************************

		var initPage = function(){
			$.consoleDebug( DEBUG, '- initPage Start');
			GOOGLE_API_KEY = 'AIzaSyBZEApCxfzuavDWXdJ2DAVAftxbMjZWrVY';

			$window 	= $( window );
			$html 		= $( 'html' );
			$head 		= $( 'head' );
			$body 		= $( 'body' );
			$location 	= $( location );
			$navigation = $( '.navigation' );
			$page 		= $( '.site-page' );

			href 		= $location.attr( 'href' );
			start 		= 'documentDone';
			wait 		= $body.data( 'fade-wait' );
			touch 		= ( typeof Modernizr !== 'undefined' && ( Modernizr.touchEvents || Modernizr.touch ) ) && ( $body.hasClass('is-iphone') || $body.hasClass('is-tablet') || $body.hasClass('is-mobile') );

			$html.removeClass( 'no-js' );

			$.consoleDebug( DEBUG, '- initPage End');
		}

		// *****************************************************
		// *      DEBUG
		// *****************************************************

		var debugEvents = function(){
			$.consoleDebug( DEBUG, '- debugEvents Start');

			if( DEBUG ){
				$body.on( 'documentDone', function(e){ $.log('document.done', touch); } );
				//$body.on( 'imgsLoaded', function(e){ $.log('imgsLoaded', touch); } );
				$body.on( 'nivoLoaded', function(e){ $.log('nivoLoaded', touch); } );
				$body.on( 'mapLoaded', function(e){ $.log('mapLoaded', touch); } );
				$body.on( 'mapsLoaded', function(e){ $.log('mapsLoaded', touch); } );
			}
			$body.trigger( 'documentJquery' );
			if( DEBUG ) $.log('documentJquery', touch);
			
			$.consoleDebug( DEBUG, '- debugEvents End');
		}

		// *****************************************************
		// *      TOUCH
		// *****************************************************

		var touchEvents = function(){
			$.consoleDebug( DEBUG, '- touchEvents Start');

	        if ( touch ) {
	            $body.addClass( 'touch' );
	            $body.removeClass( 'mouse' );
	        }else{
	            $body.removeClass( 'touch' );
	            $body.addClass( 'mouse' );
	        }

	        if( touch ){

				if( $navigation.attr( 'data-toggle' ) == "true" ){

					$navigation.swipe( {				

				        swipeDown: function( e, direction, distance, duration, fingerCount ) {

				        	var $this 		= $( this ),
				        		$target 	= $( e.target ),
				        		toggle = ( $target.hasClass( '.toggle' ) ? 1 : $target.parents( '.toggle' ).length );

				        	if( toggle ){
			        			$this.toggledOn( e );
			        			e.stopPropagation();
			        		}
			        		
				        },

				        swipeUp: function( e, direction, distance, duration, fingerCount ) {

				        	var $this = $( this ),
				        		$target 	= $( e.target ),
								toggle = ( $target.hasClass( '.toggle' ) ? 1 : $target.parents( '.toggle' ).length );
				        	
				        	if( toggle ){
			        			$this.toggledOff( e );
			        			e.stopPropagation();
			        		}

				        },

				        threshold: 10,
				        excludedElements: '',

				    });
				
				}
				
			}
			$.consoleDebug( DEBUG, '- touchEvents End');
		}

		// *****************************************************
		// *      CHECK URL ANCHOR
		// *****************************************************

		var checkUrlAnchor = function(){
			$.consoleDebug( DEBUG, '- checkUrlAnchor Start');
			if( href.indexOf( '#' ) > -1 ){
				var split = href.split('#')
				$('body').data( 'anchor', split[1] );

				if ( typeof window.history.replaceState == 'function' ) {
					history.replaceState(null, null, split[0]);
					//window.history.replaceState({}, '', location.href.slice(0, -1));
				}else{
					window.location.replace("#");
				}
			}
			$.consoleDebug( DEBUG, '- checkUrlAnchor End');
		}

		// *****************************************************
		// *      START EVENTS
		// *****************************************************

		var startEvents = function(){
			$.consoleDebug( DEBUG, '- startEvents Start');
			switch( wait ){
				case 'images': case 'nobg':
					start = 'imgsLoaded';
				break;
				case 'sliders':
					if( $( '.nivoSlider' ).length ) start = 'nivoLoaded';
					else start = 'imgsLoaded';
				break;
				case 'maps':
					if( $( '.scm-map' ).length ) start = 'mapsLoaded';
					else start = 'imgsLoaded';
				break;
				default:
					start = 'documentDone';
				break;
			}

			var isready = false;

			$body.on( start, function(e){ isready = true; $.bodyIn(e); } );
			setTimeout(function() {
				if( !isready ){
					$.consoleDebug( DEBUG, 'BodyIn FORCED START');
					$.bodyIn();
				}
         	}, 5000);

			$.consoleDebug( DEBUG, '- startEvents End');
		}

		// *****************************************************
		// *      LAYOUT EVENTS
		// *****************************************************

		var layoutEvents = function(){
			$.consoleDebug( DEBUG, '- layoutEvents Start');
			$body.off('resizing resized').on( 'resizing resized imgsLoaded', function(e){
			
				$body.responsiveClasses( e );
				$( '[data-equal]' ).equalChildrenSize();
			
			} );

			
			$body.off('responsive').on( 'responsive', function( e, state ) {
				$( '[data-switch-toggle]' ).switchByData( state, 'switch-toggle', 'toggle', '.toggle-image, .toggle-home' );
				$( '[data-switch]' ).switchByData( state, 'switch' );
				$( '[data-sticky]' ).stickyMenu();
				$( '[data-affix]' ).affixIt();

			} );

			$.consoleDebug( DEBUG, '- layoutEvents End');
		}

		// *****************************************************
		// *      TOGGLE MENU EVENTS
		// *****************************************************

		var navEvents = function(){
			$.consoleDebug( DEBUG, '- navEvents Start');
			$navigation.off( 'toggledOn').on( 'toggledOn', function(e){

				$elems = $( this ).find( '[data-toggle-button="on"]' );
				$elems.css( 'transform', 'rotate(90deg)' );
				$elems.animate( { transform: 'rotate(0deg)' }, 200, 'linear' );

			} );

			$navigation.off( 'toggledOff').on( 'toggledOff', function(e){

				$elems = $( this ).find( '[data-toggle-button="off"]' );
				$elems.css('transform', 'rotate(-90deg)');
				$elems.animate( { transform: 'rotate(0deg)' }, 200, 'linear' );

			} );

			$body.on( 'resizing', function(e){ $( '.toggled' ).toggledOff(e); } );
			$window.off( 'scroll').on( 'scroll', function(e){ $( '.toggled' ).toggledOff(e); } );
			$body.off( 'switchOn').on( 'switchOn', '.toggle', function( e, state ){ $( this ).toggledOff( e, state ) } );
			$page.off( 'click').on( 'click', '.toggle-button', function(e){ $( this ).toggledIt(e); } );
			$page.off( 'mousedown').on( 'mousedown', '*', function(e){ if( e.target == this ){ $( '.toggled' ).toggledOff(e); } } );
			$.consoleDebug( DEBUG, '- navEvents End');
		}

		// *****************************************************
		// *      TRIGGERS
		// *****************************************************

		var triggerEvents = function(){
			$.consoleDebug( DEBUG, '- triggerEvents Start');
			// Trigger WINDOW RESIZED event
			var interval, resizing;
			$window.resize( function(e){

				$body.trigger( 'resizing' );
								
				resizing = true;

				clearTimeout( interval );
				interval = setTimeout( function(){
					if ( resizing ){
						resizing = false;
						$body.trigger( 'resized' );
						$.consoleDebug( DEBUG, 'resized' );
						clearInterval( interval );
					}
				}, 250 );

			} );
			
			// Trigger DOCUMENT READY event
			$body.trigger( 'documentDone' );
			//$.consoleDebug( DEBUG, 'document.done' );
			$body.addClass('ready');

			// Set tools
			$body.eventTools();
			$body.eventLinks();
			$body.currentSection();
			$body.checkCss();

			// Load NivoSlider and trigger
			// Call EqualChildrenSize function
			// Load GoogleMaps and trigger


			$body.on( 'imgsLoaded', function( instance ) {
			    
			    $( '[data-slider="nivo"]' ).setNivoSlider();
			    
			    $( '[data-equal]' ).equalChildrenSize();

			    var $maps = $( '.scm-map' );

			    if( $maps.length > 0 ){

			    	window.initialize = function() {
					    script = document.createElement('script');
						script.type = 'text/javascript';
						script.src = 'https://cdn.rawgit.com/googlemaps/v3-utility-library/master/markerwithlabel/src/markerwithlabel.js';
						//script.src = 'http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerwithlabel/src/markerwithlabel.js';
						// dovesse dar problemi, getScript markerwithlabel, on done ...
						document.body.appendChild( script );
						$maps.googleMap();
					}
			    	    			    	
					var script = document.createElement('script');
					script.type = 'text/javascript';
					script.src = 'https://maps.googleapis.com/maps/api/js?key=' + GOOGLE_API_KEY + '&callback=initialize';
					script.async = 'async';
					script.defer = 'defer';		

					document.body.appendChild( script );
								
				}

			});

			var bgs = {};

			if( wait != 'nobg')
				bgs = { background: true };

			$html.imagesLoaded( bgs )
				.always( function( instance ) {
					$body.trigger( 'imgsLoaded', instance );
					$.consoleDebug( DEBUG, 'imgsLoaded' );
				})
				.done( function( instance ) {
					$body.trigger( 'imgsDone', instance );
					$.consoleDebug( DEBUG, 'imgsDone' );
				})
				.fail( function() {
					$body.trigger( 'imgsFail' );
					$.consoleDebug( DEBUG, 'imgsFail' );
				})
				.progress( function( instance, image ) {
					var result = image.isLoaded ? 'loaded' : 'broken';
					if( image.isLoaded ){
						$body.trigger( 'imgLoaded', instance, image );
						$.consoleDebug( DEBUG, 'imgLoaded: ' + image.img.src );
					}else{
						$body.trigger( 'imgFailed', instance, image );
						$.consoleDebug( DEBUG, 'imgFailed: ' + image.img.src );
					}					
				});

			$body.responsiveClasses('force');
			$.consoleDebug( DEBUG, '- triggerEvents End');

		}

		// *****************************************************
		// *      START
		// *****************************************************

		INITPAGE = function(){
			$.consoleDebug( DEBUG, '--- startPage Start');
			initPage();
			debugEvents();
			touchEvents();
			checkUrlAnchor();
			startEvents();
			layoutEvents();
			navEvents();
			triggerEvents();
			$.consoleDebug( DEBUG, '--- startPage Done');
		}

		INITPAGE();

		READYPAGE = function(){
			// Safari Fix **************************************
			window.onpageshow = function(event) {
			    if (event.persisted && $body.hasClass('safari')) {
			    	$.bodyIn(event);
			        //window.location.reload()
			    }
			};
		}

	// *****************************************************
	// *****************************************************
	// *****************************************************
		
	jQuery(function($){

		READYCHILD();
		READYPAGE();		

	});

} )( jQuery );

