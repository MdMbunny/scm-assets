//*****************************************************
//*
//	IE fixes
//	Youtube Embed Fix
//	Toggle Menu
//	Sticky Menu
//	Smooth Scroll
//	Current Link Class
//  Top Of Page
//  Responsive Layout
//  Google Maps
//  Nivo Slider
//	Fancybox
//  Tooltip
//
//	Change Page
//*
//*****************************************************

var DEBUG = false;
var INITPAGE = function(){};
var INITCHILD = function(){};
var READYCHILD = function(){};
var READYPAGE = function(){};

( function($){

	var ARCHIVES = {};

// ******************************************************
// ******************************************************
// *      jQuery INIT
// ******************************************************
// ******************************************************

	// *****************************************************
	// *      RESPONSIVE
	// *****************************************************

	$.fn.responsiveClasses = function( event ) {

		var w 			= $( window ).width();
			a 			= '',
			r 			= '',
			state 		= 'all',
			old 		= this.attr( 'class' ),
			tofull 		= this.attr( 'data-tofull' ),
			tocolumn 	= this.attr( 'data-tocolumn' ),
			sizes 		= {
			wide 		: 1401,
			landscape	: 1121,
			tablet		: 1121,
			notebook 	: 1031,
			portrait 	: 801,
			smart 		: 701,
			smartmid	: 601,
			smartmin	: 501, };

		if( w > 700 ){

			a += 'desktop r1400 ';
			r += 'smart smartmid smartmin smartmicro smartold ';

			if( w < sizes.wide ){
				a += 'r1120 ';
				r += 'wide ';
			}else{
				r += 'r1120 ';
				a += 'wide ';
			}

			if( w < sizes.landscape ) a += 'tablet r1030 ';
			else r += 'tablet r1030 ';

			if( w < sizes.landscape && w > sizes.portrait - 1 ) a += 'landscape ';
			else r += 'landscape ';

			if( w < sizes.notebook ) a += 'notebook r940 ';
			else r += 'notebook r940 ';

			if( w < 941 ) a += 'r800 ';
			else r += 'r800 ';

			if( w < sizes.portrait ) a += 'portrait r700 ';
			else r += 'portrait r700 ';

		}else{

			a += 'tablet portrait smart tofull tocolumn ';
			r += 'wide desktop landscape notebook r1400 r1120 r1030 r940 r800 r700 ';

			if( w < 331 ) a += 'smartold ';
			else r += 'smartold ';					

			if( w < 401 ) a += 'smartmicro ';
			else r += 'smartmicro ';

			if( w < 501 ) a += 'smartmin ';
			else r += 'smartmin ';
			
			if( w < 601 ) a += 'smartmid ';
			else r += 'smartmid ';

		}

		if( event != 'init' ){
			this.removeClass( r );
			this.addClass( a );

			if( w < sizes[ tofull ] ) this.addClass( 'tofull' );
			else this.removeClass( 'tofull' );

			if( w < sizes[ tocolumn ] ) this.addClass( 'tocolumn' );
			else this.removeClass( 'tocolumn' );

			if(event == 'force' || old != this.attr( 'class' )){

				if ( this.hasClass( 'smartmin' ) )		state = 'smartmin';
				else if( this.hasClass( 'smart' ) )		state = 'smart';
				else if( this.hasClass( 'portrait' ) )	state = 'portrait';
				else if( this.hasClass( 'notebook' ) )	state = 'notebook';
				else if( this.hasClass( 'landscape' ) )	state = 'landscape';
				else if( this.hasClass( 'wide' ) )		state = 'wide';
				else if( this.hasClass( 'desktop' ) )	state = 'desktop';

				this.trigger( 'responsive', [ state ] );
			}
		}else{
			return a;
		}
	}

	// *****************************************************
	// *      ENABLE/DISABLE
	// *****************************************************

	$.fn.enableIt = function( event ){

		$.consoleDebug( DEBUG, '-----------');
		$.consoleDebug( DEBUG, 'enableIt');

		return this.each(function() {

		    var $this = $( this );

		    $.consoleDebug( DEBUG, $this );

		    $this.removeClass( 'disabled' );
		    $this.addClass( 'enabled' );
		    $this.trigger( 'enabled' );

		});
	};

	$.fn.disableIt = function( event ){

		$.consoleDebug( DEBUG, '-----------');
		$.consoleDebug( DEBUG, 'disableIt');

		return this.each(function() {

		    var $this = $( this );

		    $.consoleDebug( DEBUG, $this );

		    $this.addClass( 'disabled' );
			$this.removeClass( 'enabled' );
			$this.trigger( 'disabled' );

		});
	};

	// *****************************************************
	// *      CSS
	// *****************************************************

	$.fn.checkCss = function( event ){
		this.find( '[data-bg-color]' ).setCss( 'bg-color', 'background-color' );
		this.find( '[data-zindex]' ).setCss( 'zindex', 'z-index' );
		this.find( '[data-left]' ).setCss( 'left' );
		this.find( '[data-top]' ).setCss( 'top' );
		this.find( '[data-right]' ).setCss( 'right' );
		this.find( '[data-bottom]' ).setCss( 'bottom' );
	}

	// *****************************************************
	// *      EVENTS - Call these when dynamically attaching/loading contents
	// *****************************************************	

	$.fn.eventTools = function( event ){
		//Waypoint.destroyAll(); <-- questo andrà in scm.js per i Dynamic Content Load
		this.find( '[data-content-fade]' ).fadeContent();
		this.find( '[data-tooltip]' ).setTooltip();
		this.find( '[data-cursor]' ).setCursor();
		this.find( '[data-popup]' ).setFancybox();
		this.find( '[data-slider]' ).initSlider();
		this.find( '[data-current-link]' ).currentLink();
		this.find( 'iframe[src*="youtube.com"]' ).youtubeFix();
	}

	$.fn.eventLinks = function( event ){

		var $nav 	= this.find( 'a, .navigation' ).filter(':not(.nolinkit):not(.iubenda-embed)').filter(function( index ) { return $( this ).parents( '.ssba' ).length === 0; }),
			$link 	= this.find( 'a, [data-href]' ).filter(':not(.nolinkit):not(.iubenda-embed)').filter(function( index ) { return $( this ).parents( '.ssba' ).length === 0; });

		$link.filter( ':not([data-link-type])' ).linkIt();
		$nav.off( 'mousedown' ).on( 'mousedown', function(e){ e.stopPropagation(); } );
		$link.off( 'click' ).on( 'click', function(e){

			var $this = $( this );

			$this.trigger( 'clicked' );

			var $toggle = $this.parents( '.no-toggled' );

			var cont = 0;
			if( $toggle.length )
				cont = $toggle.parents( '.toggle-content' ).length;

			$toggled = $( '.toggled' );

			if( !$( 'body' ).hasClass( 'touch' ) || !cont || $toggle.parents( '.toggle' ).length ){
				e.preventDefault();
				e.stopPropagation();
				if( $toggled.length ){
					$toggled.toggledOff( event );
					setTimeout( function(){
						$this.trigger( 'link' );
					}, 400 );
				}else{
					$this.trigger( 'link' );
				}
			}else{
				$toggled.toggledOff(e);
				e.preventDefault();
			}
		
		});

		$link.off( 'link' ).on( 'link', function( e ){

			$.consoleDebug( DEBUG, '-----------');
			$.consoleDebug( DEBUG, '[on link]');

			var $this 	= $( this ),
				$body 	= $( 'body' ),
				href 	= ( $this.attr('href') ? $this.attr('href') : $this.data('href') ),
				target 	= ( $this.attr('target') ? $this.attr('target') : $this.data('target') ),
				state 	= $this.attr('data-link-type');

				$.consoleDebug( DEBUG, 'state: ' + state);

			switch( state ){

				case 'load':
					$.consoleDebug( DEBUG, 'loading content');
					$this.loadContent( event, href );
				break;

				case 'page':
					$.consoleDebug( DEBUG, 'scrolling');
					$this.smoothScroll();
				break;

				default:
					$.consoleDebug( DEBUG, 'changing page');
					$.bodyOut( href, target, state );
				break;
			}


		} );

	};

	// *****************************************************
	// *      LINK
	// *****************************************************

	$.fn.linkIt = function( event ){

		return this.each(function() {

		    var $this 		= $( this );
		    	host 		= new RegExp(location.host);
		    	data 		= $this.data( 'href' );
		    	link 		= ( data ? data.replace('page:', host) : $this.attr( 'href' ).replace('page:', host) );

	    	if( !link )
	    		return;

		    var	linkpath 	= $.removeSlash( link ),
		    	linkanchor 	= linkpath.indexOf( '#' ),
		    	lp 			= linkpath.substr( 0, linkanchor );

			var current 	= document.URL,
				curpath		= $.removeSlash( current ),
				curanchor 	= curpath.indexOf( '#' ),
				lc 			= ( curanchor >= 0 ? curpath.substr( 0, curanchor ) : curpath );

			var	samepath 	= curpath === linkpath;

			var	parent 		= $this.parents( '.sub-menu' ).siblings().find( 'a' ).attr( 'href' ),
				parpath 	= linkanchor === 0 && parent && ( curpath != $.removeSlash( parent ) && parent != '#top' );

			var back 		= linkpath == 'back' || linkpath == 'http:back' || linkpath == 'https:back',
		        load 		= ( $this.data( 'load-content' ) ? $this.data( 'load-content' ) : $this.parent().data( 'load-content' ) ),
		        app 		= ( $.startsWith( linkpath, ['mailto:','callto:','fax:','tel:','skype:'] ) ? linkpath.substr( 0, ( linkpath.indexOf('to:') > 0 ? linkpath.indexOf('to:') : linkpath.indexOf(':') ) ) : null );

		    var href 		= ( back ? '#' : ( app ? link : ( samepath ? '#top' : ( parpath ? parent + link : ( linkanchor >= 0 && lp === lc ? linkpath.substr( linkanchor ) : link ) ) ) ) ),
		        hrefanchor 	= href.indexOf( '#' ),
		        hrefupload 	= href.indexOf( '/uploads/' ),
				samehost 	= host.test( href ),
				target 		= ( data ? $this.data( 'target' ) : ( $this.attr( 'target' ) ? $this.attr( 'target' ) : ( $this.hasClass( 'external' ) ? '_blank' : '' ) ) ),
				state 		= 'site';
			
			if( linkanchor !== 0 && !samehost && target === '_self' )
				return;

	        if( back || app || hrefanchor === 0 ){
	        	state = 'page';
	        	target = '_self';
	        	samehost = true;
	        }

	        if( samehost && hrefupload >= 0 ){
	        	target = '_blank';
	        }

			if( load ){
				
				state = 'load';
			
			}else if( (samehost && target !== '_blank') ){

				target = '_self' ;
				if( state != 'page' ){
					state = 'site';	
				}

			}else{

				target = '_blank';
				state = 'external';
			}

			if(data)
				$this.data( 'href', href ).data( 'target', target );
			else
				$this.attr( 'href', href ).attr( 'target', target );

			$this.attr( 'data-link-type', ( back ? 'back' : ( app ? app : state ) ) );

		});
		
	}

	// *****************************************************
	// *      NAVIGATION
	// *****************************************************

	$.bodyIn = function( event ){

		$.consoleDebug( DEBUG, '-----------');
		$.consoleDebug( DEBUG, 'bodyIn:');

		var $body 			= $( 'body' ),
			$html 			= $( 'html' ),
			$navigation 	= $( '.navigation' ),
			opacity 		= ( $body.data( 'fade-opacity' ) ? parseFloat( $body.data( 'fade-opacity' ) / 10 ) : 0 ),
			duration 		= ( $body.data( 'fade-in' ) ? parseFloat( $body.data( 'fade-in' ) ) : 0 ),
			delay 			= ( $body.data( 'smooth-new' ) ? parseFloat( $body.data( 'smooth-new' ) ): 0 ),
			post 			= ( $body.data( 'smooth-post' ) ? $body.data( 'smooth-post' ) : 0 ),
			offset 			= ( $body.data( 'smooth-offset' ) ? $body.data( 'smooth-offset') : '0' ),
			units 			= ( $body.data( 'smooth-offset-units' ) ? $body.data( 'smooth-offset-units' ) : 'px' ),
			anchor 			= $body.data( 'anchor' ),
			$anchor 		= $( '#' + anchor ),
			$button 		= $( 'a[href="#' + anchor + '"], *[data-href="#' + anchor + '"]' ),
			$doc 			= $( document );

		if( $body.hasClass( 'bodyin' ) ) return;

		$body.addClass( 'bodyin' );
		$body.removeClass( 'bodyout' );
		$body.css( 'opacity', opacity );
		$navigation.css( 'opacity', 1 );

		if( $anchor.length === 0 )
			$anchor = $body;
			
		var pageScroll = function(){

			if( post ){
				if( $button.length ){

					$.consoleDebug( DEBUG, 'scroll to anchor');
					$( $button[0] ).trigger( 'link' );

				}else{

					$html.animate({
						scrollTop: $anchor.offset().top
					}, 1000 );

					$body.animate({
						scrollTop: $anchor.offset().top
					}, 1000, function() {
						$body.enableIt();
					});

				}
			}else{
				$body.enableIt();
			}

		};

		var checkScroll	= function(){

			if( anchor && anchor != 'none' ){

				if( delay ){
					setTimeout( pageScroll, delay * 1000 );
				}else{
					pageScroll();
				}
				
			}else{
				
				$body.enableIt();
			}
    	};

    	if( !post ){
			$.consoleDebug( DEBUG, 'jump to anchor');

			if( units == 'em' ){
				offset = $.EmToPx( Number(offset) )
			}

			$doc.scrollTop( $anchor.offset().top - parseInt( offset ) + $( '#site-navigation-sticky' ).getHighest() + 1 );
		}

    	if( duration > 0 ){
    		
    		$.consoleDebug( DEBUG, 'with animation');

        	$html.animate( {
        		opacity: 1
        	}, duration * 1000 );

        	$body.animate( {
        		opacity: 1
        	}, duration * 1000, checkScroll );

        }else{
        	$.consoleDebug( DEBUG, 'without animation');
        	$body.css( 'opacity', 1 );
        	checkScroll();
        }
	}

	$.bodyOut = function( link, target, state ){

		$.consoleDebug( DEBUG, '-----------');
		$.consoleDebug( DEBUG, 'bodyOut:');

		var $body 		= $( 'body' ),
			$navigation = $( '.navigation' ),
			opacity 	= ( $body.data( 'fade-opacity' ) ? parseFloat( $body.data( 'fade-opacity' ) / 10 ) : 0 ),
			duration 	= ( $body.data( 'fade-out' ) ? parseFloat( $body.data( 'fade-out' ) ) : 0 ),
			wait 		= ( $body.data( 'fade-wait' ) ? $body.data( 'fade-wait' ) : 'no' );
			//opacity 	= ( $body.data( 'fade-out' ) ? 0 : .6 );

		$body.removeClass( 'bodyin' );

		if( state == 'back' ){
			window.history.back();
			return false;			
		//}else if( state != 'app' && target != '_blank' && duration > 0 ){
		}else if( state == 'site' && target != '_blank' && duration > 0 ){

			if( $body.hasClass( 'bodyout' ) ) return;
			$body.addClass( 'bodyout' );

			$.consoleDebug( DEBUG, 'with animation');

			$body.disableIt();

			$navigation.animate( {
        		opacity: opacity
        	}, duration * 600 );

			$body.animate( {
        		opacity: opacity
        	}, duration * 1000, function() {
				$.goToLink( link, target );
			});

		}else{

			$.consoleDebug( DEBUG, 'without animation');

			$.goToLink( link, target, state );

		}

	}


	$.goToLink = function( link, target, state ){

			$.consoleDebug( DEBUG, '-----------');
			$.consoleDebug( DEBUG, 'goToLink:');

			if( !link ){
				$.consoleDebug( DEBUG, 'no link provided');
				$.bodyIn();
				return this;
			}

			$.consoleDebug( DEBUG, link);
			$.consoleDebug( DEBUG, 'target: ' + target);

			if( state == 'mail' ){
				window.location = $.decodeEmail( link );
				return this;
			}

			if( target != '_blank' ){

				$.consoleDebug( DEBUG, 'loading same page');

				// DYNAMIC LOADING CONTENT
				// Check load page anchor issue
				// Check Fancybox, Nivo, bxSlider, etc
				// Update your LoadContent function
				// Add in scm.js the "popstate" Event for History navigation

				/*history.pushState(null, null, link);
				$('<div>').load(link + ' #site-page', function() {
				    $('#site-page').replaceWith( $(this).find('#site-page') );
				    $.consoleDebug( DEBUG, 'Load startPage Call');
				    INITCHILD();
				    INITPAGE();
				    READYCHILD();
				    READYPAGE();
				});*/
				
				window.location = link;
				return this;

			}else{

				$.consoleDebug( DEBUG, 'opening new page');

				window.open( link, 'See You!' );
				return this;

			}

			$.consoleDebug( DEBUG, 'fallback');
			
			$.bodyIn();
			return this;

		};

	// *****************************************************
	// *      TOGGLE
	// *****************************************************

	$.fn.toggledIt = function( event, state ) {
		
		event.stopPropagation();

		return this.each(function() {

			var $this = $( this );

			if( !$this.hasClass( 'toggled' ) )
				return $this.toggledOn( event );
			else
				return $this.toggledOff( event );

		});

	}

	$.fn.toggledOn = function( event, state ) {

		return this.each(function() {

			var $this = $( this );

	        if( !$this.hasClass( 'toggle' ) )
	        	$this = $( this ).parents( '.toggle' );

			$this.data( 'done', false );
			
			$this.find( '.toggle-button' ).children( '[data-toggle-button="off"]' ).hide();
			$this.find( '.toggle-button' ).children( '[data-toggle-button="on"]' ).show();
			if( !$this.hasClass( 'toggled' ) ){
				$this.data( 'done', true );
				$this.addClass( 'toggled' );
				$this.removeClass( 'no-toggled' );
				$this.trigger( 'toggledOn' );

				// +++ todo: aggiungere qui animazione da this.data( 'toggle_in | toggle_out | toggle_in_time | toggle_out_time | toggle_in_ease | toggle_out_ease' )
			}

		} );

	}

	$.fn.toggledOff = function( event, state ) {

		return this.each(function() {

			var $this = $( this );

	        if( !$this.hasClass( 'toggle' ) )
	        	$this = $( this ).parents( '.toggle' );
			
			$this.data( 'done', false );
			
			$this.find( '.toggle-button' ).children( '[data-toggle-button="off"]' ).show();
			$this.find( '.toggle-button' ).children( '[data-toggle-button="on"]' ).hide();
			if( $this.hasClass( 'toggled' ) ){

				$this
					.data( 'done', true )
					.trigger( 'toggledOff' )
					.removeClass( 'toggled' )
					.addClass( 'no-toggled' );
				
				// +++ todo: aggiungere qui animazione da this.data( 'toggle_in | toggle_out | toggle_in_time | toggle_out_time | toggle_in_ease | toggle_out_ease' )

			}else if( !$this.hasClass( 'no-toggled' ) ){

				$this
					.addClass( 'no-toggled' )
					.data( 'done', true )
					.trigger( 'toggledOff' )
					.removeClass( 'toggled' )
					.addClass( 'no-toggled' );
			}

		} );
	}

// +++ todo: plugin


	$.fn.switchByData = function( data, name, classes, hide ) {

		if( !name )
			name = ( classes ? name : 'switch' );

		return this.each(function() {

			var $this 	= $( this ),
				act 	= $this.data( name ),
				wit 	= $this.data( name + '-with' );
				switchWith = ( wit ? wit : '[data-' + name + '=""]' );

			if( $this.hasClass( 'hidden' ) )
				return;

			if( act && act != '' ){

				if( act.indexOf( data ) >= 0 ){ // toccato
				//if( act == data ){
					if( !classes ){
						$this.show();
						$this.siblings( switchWith ).hide();
					}else{
						$this.addClass( classes );
						if( hide )
							$this.find( hide ).addClass( 'hidden' );
					}
					$this.trigger( 'switchOn' );
				}else{
					if( !classes ){
						$this.hide();
						$this.siblings( switchWith ).show();
					}else{
						$this.removeClass( classes );
						if( hide )
							$this.find( hide ).removeClass( 'hidden' );
					}
					$this.trigger( 'switchOff' );
				}
			}

		} );

	}

	// *****************************************************
	// *      STICKY IT
	// *****************************************************
	
	$.fn.stickyIt = function(){

		return this.each(function() {

			var $this 			= $( this ),
				sticky 			= $this.data('sticky-type'),
				offset 			= ( $this.data('sticky-offset') ? $this.data('sticky-offset') : 0 ),
				attach 			= ( $this.data('sticky-attach') ? $this.data('sticky-attach') : 'top' ),
				to 				= ( $this.data('sticky') ? $this.data('sticky') : '' ),
				$to 			= $( to );

			if( $to.length ){
				if( attach == 'top'){
					offset += $to.offset().top;
				}else if( attach == 'bottom'){
					offset += $to.offset().top + $to.outerHeight();
				}
				$to.addClass( sticky );
			}

			if( sticky == 'plus' ){
				var sh = $this.getBoxShadow();
				$this.css( 'top', -( $this.outerHeight() + parseFloat(sh.y) + parseFloat(sh.blur) + parseFloat(sh.exp) ) );
			}
			
			$this
				.attr( 'data-affix', attach )
				.attr( 'data-affix-offset', offset );
			
			$this
				.off( 'affixedOn' )
				.on( 'affixedOn', function () {
				    if( $to.length ) $to.addClass( 'affix-' + sticky );
				});

			$this
				.off( 'affixedOff' )
				.on( 'affixedOff', function () {
				    if( $to.length ) $to.removeClass( 'affix-' + sticky);
				});

		});

	}

	// *****************************************************
	// *      STICKY MENU
	// *****************************************************
	
	$.fn.stickyMenu = function(){

		return this.each(function() {

			var $this 			= $( this ),
				new_offset 		= 0,
				sticky 			= $this.data('sticky-type'),
				offset 			= $this.data('sticky-offset'),
				attach 			= $this.data('sticky-attach'),
				menu 			= $this.data('sticky'),
				$menu 			= $( '#' + menu );

			if( !$menu.length )
				return;

			if( attach == 'nav-top'){
				new_offset = offset + $menu.offset().top;
			}else if( attach == 'nav-bottom'){
				new_offset = offset + $menu.offset().top + $menu.outerHeight();
			}

			if( sticky == 'plus' ){
				
				var sh = $this.getBoxShadow();

				$this.css( 'top', -( $this.outerHeight() + parseFloat(sh.y) + parseFloat(sh.blur) + parseFloat(sh.exp) ) );
			}

			$menu.addClass( sticky );

			// Affix

			$this
				.attr( 'data-affix', 'top' )
				.attr( 'data-affix-offset', new_offset );
			
			$this
				.off( 'affixedOn' )
				.on( 'affixedOn', function () {
				    $menu.addClass( 'affix-' + sticky );
				});

			$this
				.off( 'affixedOff' )
				.on( 'affixedOff', function () {
				    $menu.removeClass( 'affix-' + sticky);
				});

		});

	}


	// *****************************************************
	// *      SMOOTH SCROLL
	// *****************************************************

	$.fn.smoothScroll = function( off, onEnd ) {

		var type 	= $.type( off ),
			$body 	= $( 'body' );

		if( type === 'function' ){
			onEnd = off;
			off = $body.data( 'smooth-offset' );
		}

		$body.disableIt();

		return this.each(function(){


			var $this 			= $( this ),
				link 			= ( $this.data( 'href' ) ? $this.data( 'href' ) : ( $this.attr( 'href' ) ? $this.attr( 'href' ) : '#' ) ),

				time 			= ( $body.data( 'smooth-duration' ) ? parseFloat( $body.data( 'smooth-duration' ) ) : 1 ),
				offset 			= ( off ? off : ( $body.data( 'smooth-offset' ) ? $body.data( 'smooth-offset' ) : '0' ) ),
				units 			= ( off ? off : ( $body.data( 'smooth-offset-units' ) ? $body.data( 'smooth-offset-units' ) : 'px' ) ),
				ease 			= ( $body.data( 'smooth-ease' ) ? $body.data( 'smooth-ease' ) : 'swing' ),
				delay 			= ( $body.data( 'smooth-delay' ) ? parseFloat( $body.data( 'smooth-delay' ) ): 0.1 ),

				win 			= $( window ).height(),
				height 			= $body.height(),
				position 		= $( document ).scrollTop(),

				hash 			= ( link.indexOf( '#' ) === 0 ? link : ( link.indexOf( '#' ) > 0 ? this.hash : '' ) ),
				target 			= ( hash ? $( hash ) : [] ),
				name 			= ( hash ? hash.slice( 1 ) : '' ),
				destination 	= 0,
				difference 		= 0,
				duration 		= 0;

			type = $.type( offset );
			if ( type == 'string' && offset.indexOf( '#' ) === 0 ){
				hash = offset;
				target = $( hash );
				offset = $( 'body' ).data( 'smooth-offset' );
			}

			if( units == 'em' ){
				offset = $.EmToPx( Number(offset) )
			}

			var pageEnable = function(){
				if( onEnd )
					onEnd();
				else
					$body.enableIt();

			}

			var pageScroll = function(){

				$('html').animate( {

						scrollTop: destination

					}, parseFloat( duration ), ease
				);

				$('body').animate( {

						scrollTop: destination

					}, parseFloat( duration ), ease, function() {
						pageEnable();
					}
				);
			};

			if( target.length ){

				destination = target.offset().top - parseInt( offset ) - $( '#site-navigation-sticky' ).getHighest() + 1;

				if( height - destination < win ){
					destination = height - win;
				}

			}else if( name == 'top' ){

				destination = 0;

			}else{

				pageEnable();
				return this;

			}

			difference = Math.abs( destination - position );

			if( !difference ){
				pageEnable();
				return this;
			}

			$this.data('done', false);
			//$body.css( 'pointer-events', 'none' );

			duration = time * ( difference < 6000 ? difference : 6000 );

			duration = ( duration < 500 ? 500 : duration );

			if( delay )
				setTimeout( pageScroll, delay );
			else
				pageScroll();	

			$this.data('done', true);

			return this;

		} );
	}

	// *****************************************************
	// *      CURRENT LINK CLASS
	// *****************************************************

	$.fn.currentLink = function( event, state ){

		return this.each(function() {

			var $elem 			= $( this ),
				elem 			= this,
				$body 			= $( 'body' ),
				currentClass 	= $elem.data( 'current-link' ),
	            offset 			= ( $elem.data( 'current-link-offset' ) ? $elem.data( 'current-link-offset' ) : 0 ),
	            units 			= ( $elem.data( 'current-link-offset-units' ) ? $elem.data( 'current-link-offset-units' ) : 'px' ),
	            threshold 		= ( $elem.data( 'current-link-threshold' ) ? $elem.data( 'current-link-threshold' ) : 0 ),
	            interval 		= ( $elem.data( 'current-link-interval' ) ? $elem.data( 'current-link-interval' ) : 250 ),
	            filter 			= ( $elem.data( 'current-link-filter' ) ? $elem.data( 'current-link-filter' ) : '' ),
	            $links 			= $elem.find( 'a[href^="#"]:not([data-anchor]), a[data-anchor]:not([href^="#"])' ).filter( ':not(.external) :not([href="#top"])' ),
	            $hash 			= [],
	            $anchors 		= [],
	            didScroll 		= true,
	            timer 			= null;

	        if ( units == 'em' ){
	        	offset = $.EmToPx( Number(offset) )
	        }

            if ( filter )
                $links = $links.filter( filter );

            if( !$links.length )
                return this;

            $links.each( function(){
                var hash, anchors;

                hash = $( this ).data( 'anchor' );
                if( !hash )
                    hash = this.hash;
                
                anchors = $body.find( hash );

                if( anchors.length ){
                    $anchors.push( anchors );
                    $hash.push( $( this ) );
                }

            } );

            if( !$hash.length )
            	return this;

			        
	        var setTimer = function() {
	            
	            $( window ).off('scroll.currentLink').on( 'scroll.currentLink', function() {
	                didScroll = true;
	            });
	            
	            setActiveClass();
	            timer = setInterval( function() {

	                if ( didScroll ) {
	                    didScroll = false;
	                    setActiveClass();
	                }

	            }, interval );
	        };
	        
	        var clearTimer = function() {	          

	            clearInterval( timer );
	            $( window ).off( 'scroll.currentLink' );
	            didScroll = false;

	        };
	        
	        var setActiveClass = function() {
	            //var i;

	            var $win 		= $( window ),
	            	$body 		= $( 'body' ),
	            	scrollPos 	= $win.scrollTop(),
	            	heightWin 	= $win.height(),
	            	heightBody 	= $body.outerHeight(),
	            	current 	= '';

	            for( var i = 0; i < $anchors.length; i++ ) {

	                var $anchor = $anchors[i];

	                var coords = {
	                    top: Math.round( $anchor.offset().top ) - offset,
	                    bottom: Math.round( $anchor.offset().top + $anchor.outerHeight() ) - offset
	                };

	                var link = $( $hash[i] ).parent();
	                var $link = $( link );
	                var hs = $hash[i][0]['hash'];
					
	                if ( scrollPos >= coords.top - threshold && scrollPos < coords.bottom - threshold ){
	                	if( !$link.hasClass( currentClass ) ){
		                    $link.addClass( currentClass );
	                	}
	                }else{
	                	if( $link.hasClass( currentClass ) ){
							$link.removeClass( currentClass );
	                	}
	                }
	            }

	            if ( scrollPos + heightWin >= heightBody ) {

	                link = $( $hash[$hash.length-1] ).parent();
	                $link = $( link );
	                $( $hash ).each( function(){
	                    $( this ).parent().removeClass( currentClass );
	                });

	                //hs = $hash[$hash.length-1][0]['hash'];
	                //cBody = 'current-' + hs.substring(1,hs.length);
	                
	                $link.addClass( currentClass );
	                //$body.addClass( cBody );

	            }
	        }

	        didScroll = true;
            setTimer();
			    
		});

	}

	// *****************************************************
	// *      CURRENT SECTION CLASS
	// *****************************************************

	$.fn.currentSection = function( event, state ){

		return this.each(function() {

			var $elem 			= $( this ),
				elem 			= this,
				//$body 			= $( 'body' ),
				current 		= 'current-',
	            offset 			= 100,
	            threshold 		= 0,
	            interval 		= 500,
	            $sections 		= $elem.find( '.scm-section' ),
	            $hash 			= [],
	            $anchors 		= [],
	            didScroll 		= true,
	            timer 			= null;

            if( !$sections.length )
                return this;

            /*$sections.each( function(){
                var hash, anchors;

                hash = $( this ).attr( 'id' );
                if( !hash )
                    return this;
                
                anchors = $body.find( hash );

                if( anchors.length ){
                    $anchors.push( anchors );
                    $hash.push( $( this ) );
                }

            } );*/

            /*if( !$hash.length )
            	return this;*/

			        
	        var setTimer = function() {
	            
	            $( window ).off('scroll.currentSection').on( 'scroll.currentSection', function() {
	                didScroll = true;
	            });
	            
	            setActiveClass();
	            timer = setInterval( function() {

	                if ( didScroll ) {
	                    didScroll = false;
	                    setActiveClass();
	                }

	            }, interval );
	        };
	        
	        var clearTimer = function() {	          

	            clearInterval( timer );
	            $( window ).off( 'scroll.currentSection' );
	            didScroll = false;

	        };

	        var removeActiveClasses = function(index, classNames) {
				
				var current_classes = classNames.split(" "), // change the list into an array
					classes_to_remove = []; // array of classes which has to be removed

				$.each(current_classes, function (index, class_name) {
					// if the classname begins with current add it to the classes_to_remove array
					if (/current-.*/.test(class_name)) {
						classes_to_remove.push(class_name);
					}
				});
				// turn the array back into a string
				return classes_to_remove.join(" ");

			}
	        
	        var setActiveClass = function() {
	            //var i;

	            var $win 		= $( window ),
	            	$body 		= $( 'body' ),
	            	scrollPos 	= $win.scrollTop(),
	            	heightWin 	= $win.height(),
	            	heightBody 	= $body.outerHeight(),
	            	current 	= '';

	            for( var i = 0; i < $sections.length; i++ ) {

	                var $section = $( $sections[i] );
	                var $next = $( $sections[i+1] );

	                var coords = {
	                    top: Math.round( $section.offset().top ) - offset,
	                    bottom: Math.round( $section.offset().top + $section.outerHeight() ) - offset,
	                };

	                coords.middle = Math.round( coords.top + ( coords.bottom - coords.top ) * .5 );

	                var add = 'current-' + $section.attr( 'id' );
				
	                if ( scrollPos >= coords.top - threshold && scrollPos < coords.bottom - threshold ){
                		if( !$elem.hasClass( add ) ){
                			

                			//$elem.trigger( 'onCurrent', [ add ] );
	                		$elem.removeClass( removeActiveClasses );
		                	$elem.addClass( add );
		                	$section.addClass( 'current-view' );
		                	$section.addClass( 'current-view-act' );
		                	$section.removeClass( 'current-view-pre' );
		                }
		                if( scrollPos >= coords.middle - threshold ){
							if( !$elem.hasClass( 'current-half' ) ){
								$elem.addClass( 'current-half' );
								if( $next.length ){
									$next.addClass( 'current-view' );
									$next.addClass( 'current-view-pre' );
								}
							}
		                }else{
		                	if( $elem.hasClass( 'current-half' ) ){
		                		$elem.removeClass( 'current-half' );
		                		if( $next.length ){
									$next.removeClass( 'current-view-pre' );
								}
							}
		                }
	                }else{
	                	if( $elem.hasClass( add ) )
	                		$elem.removeClass( removeActiveClasses );
	                		if( !$section.hasClass( 'current-view-pre' ) )
		                		$section.removeClass( 'current-view' );
	                		$section.removeClass( 'current-view-act' );
	                }
	            }
	        }

	        didScroll = true;
            setTimer();
			    
		});

	}

	// *****************************************************
	// *      AFFIX IT
	// *****************************************************

	$.fn.affixIt = function(off,aff){

		return this.each(function() {

			var $this 	= $( this ),
				ref 	= ( aff ? aff : ( $this.attr( 'data-affix' ) ? $this.attr( 'data-affix' ) : 'top' ) ),
				offset 	= ( off ? off : ( $this.attr( 'data-affix-offset' ) ? $this.attr( 'data-affix-offset' ) : 0 ) );

			$this.off('.affix');
			$this
			    .removeClass("affix affix-top affix-bottom")
			    .removeData("bs.affix");
			
			switch( ref ){

				case 'top': $this.affix( { offset: { top: parseInt( offset ) } }); break;
				case 'bottom': $this.affix( { offset: { bottom: parseInt( offset ) } }); break;
				default: return this; break;

			}

			$this
				.off('affix.bs.affix')
				.on( 'affix.bs.affix', function () {
				    $this.trigger( 'affixedOn' );
				} )
				.off('affix-top.bs.affix affix-bottom.bs.affix')
				.on( 'affix-top.bs.affix affix-bottom.bs.affix', function () {
				    $this.trigger( 'affixedOff' );
				} );

		});

	}

	// *****************************************************
	// *      FADE CONTENT (WAYPOINTS)
	// *****************************************************

	$.fn.fadeContent = function(off,aff){

		return this.each(function() {

			var $this 	= $( this ),
				$cont = $this.find( $this.attr( 'data-content-fade' ) ),
				offset = $this.attr( 'data-content-fade-offset' );

			if( !$cont.length )
				return this;

			$cont.css( { 'opacity': '0', 'top': '50px' } ).waypoint(function(direction) {
				if (direction === 'down') {
					$(this.element).animate({ opacity: 1, top: 0 }, 500)
				}
				else {
					$(this.element).animate({ opacity: 0, top: 50 }, 500)
				}
			}, {
				offset: offset
			});

		});
	}

	// *****************************************************
	// *      GOOGLE MAPS
	// *****************************************************


	$.fn.googleMap = function() {

			var $body = $( 'body' );
			var countMaps = 0;
			var totMaps = this.length;

			return this.each(function() {

				var $this 		= $( this ),
					markers 	= $this.children( '.marker' ),
					zoom 		= parseFloat( $this.data( 'zoom' ) ),
					style 		= [],
					args 		= [],
					map 		= [];

				$this.attr('id', 'map-' + countMaps);

				style = [
					{
						featureType: 'all',
						elementType: 'all',
						stylers: [
							{ saturation: -30 },
							{ visibility: 'simplified' }
						]
					},
					{
						featureType: 'all',
						elementType: 'labels.icon',
						stylers: [
						  { visibility: 'off' }
						]
					},
					{
						featureType: 'administrative.province',
						elementType: 'all',
						stylers: [
							{ visibility: 'off' }
						]
					},
					{
						featureType: 'administrative.country',
						elementType: 'labels',
						stylers: [
						  { visibility: 'off' },
						]
					},
					{
						featureType: 'administrative.neighborhood',
						elementType: 'labels',
						stylers: [
						  { visibility: 'off' },
						]
					},
					{
						featureType: 'administrative.locality',
						elementType: 'labels',
						stylers: [
						  { visibility: 'on' },
							{ weight: 1 },
							{ saturation: -100 },
							{ lightness: 30 },
						]
					},
					{
						featureType: 'administrative.land_parcel',
						elementType: 'labels',
						stylers: [
						  { visibility: 'off' },
						]
					},
					{
						featureType: 'road',
						elementType: 'geometry',
						stylers: [
							{ weight: 1 },
							{ saturation: -100 },
							{ lightness: 50 },
						]
					},
		        ];

		        args = {
		        	center: new google.maps.LatLng(0, 0),
					zoom: zoom,
					disableDefaultUI: true,
					draggableCursor : 'crosshair',
				    draggingCursor  : 'crosshair',
				    styles                : style,
				    panControl            : false,
				    zoomControl           : true,
				    mapTypeControl        : false,
				    scaleControl          : false,
				    streetViewControl     : true,
				    overviewMapControl    : true,
				    rotateControl         : true,
				    scrollwheel           : false,
				    zoomControlOptions    : {
				        style    : google.maps.ZoomControlStyle.SMALL,
				        position : google.maps.ControlPosition.LEFT_CENTER
				      },							
		        };
				
				map = new google.maps.Map( this, args );

				infowindow = new google.maps.InfoWindow({
					content		: '',
					maxWidth	: 500
				});

				map.markers = [];
				
				$( markers ).markerMap( map, infowindow, zoom, countMaps );

				//$this.centerMap( map, zoom );
				
				var tilesloaded = google.maps.event.addListener( map, 'tilesloaded', function() {

					$body.trigger( 'mapLoaded' );
					countMaps++;
					if( countMaps >= totMaps ){
						$body.trigger( 'mapsLoaded', [ totMaps ] );
						google.maps.event.removeListener( tilesloaded );
					}

				});

			});
		
	}

	$.fn.markerMap = function( map, infowindow, zoom, count, reg ) {

		return this.each(function() {

			var $this 			= $( this ),
				latlng 			= null,
				lat 			= $this.data( 'lat' ),
				lng 			= $this.data( 'lng' ),
				address 		= $this.data( 'address' ),
				marker_img 		= $this.data( 'img' ),
				marker_color	= $this.data( 'icon-color' ),
				marker_icon		= ( $this.data( 'icon' ) && !marker_img ? '<i class="fa ' + $this.data( 'icon' ) + '" style="color:' + marker_color + ';"></i>' : '' ),
				marker 			= [],
				classes 		= $this.attr('class') + ' ',
				id 				= classes.substr( classes.indexOf( 'scm-marker marker marker-' ) + 25, classes.substr( 25 ).indexOf( ' ' ) );

			if( address ){
				var geocoder = new google.maps.Geocoder();

				var sets = { 'address': address };
				if( reg )
					sets.region = reg;

				geocoder.geocode( sets, function(results, status) {

					$.consoleDebug( DEBUG, '-----------');
					$.consoleDebug( DEBUG, 'markerMap');

					$.consoleDebug( DEBUG,  'Searching Location for: ' + address );
			    	
			    	if (status == google.maps.GeocoderStatus.OK) {
			    		var str = ( reg ? reg : 'world' );
			    		$.consoleDebug( DEBUG,  'Location found within ' + str.toUpperCase() + ' Region');
			        	latlng = results[0].geometry.location;
			        	$.consoleDebug( DEBUG,  'LatLng are ' + latlng );
			        	setMarker();
			    	}else{
			    		$.consoleDebug( DEBUG,  'Google Maps Marker: ' + status);
			    		if( reg ){
			    			$.consoleDebug( DEBUG,  'Pointing to lat 0 and lng 0');
				    		latlng = new google.maps.LatLng( 0, 0 );
				    		setMarker();
				    	}else{
				    		$.consoleDebug( DEBUG,  'Searching address within IT Region');
				    		$this.markerMap( map, infowindow, zoom, count, 'it' );
				    	}
			    	}

			    });
			}else if( lat ){
				latlng = new google.maps.LatLng( lat, lng );
				setMarker();
			}else{
				latlng = new google.maps.LatLng( 0, 0 );
				setMarker();
			}

			var setMarker = function(){

				//var image = new google.maps.MarkerImage(
					//marker_img
					//<?php echo json_encode(SCM_URI_CHILD); ?> + 'assets/img/marker.png',
					/*new google.maps.Size( 24, 42 ),
					new google.maps.Point( 0, 0 ),
					new google.maps.Point( 12, 42 )*/
				//);
				/*
				var shadow = new google.maps.MarkerImage(
						themeImgs + 'map/marker-shadow.png',
						new google.maps.Size( 58, 44 ),
						new google.maps.Point( 0, 0 ),
						new google.maps.Point( 16, 44 )
					);

				var shape = {
						coord : [20,0,23,1,24,2,25,3,27,4,27,5,28,6,29,7,29,8,30,9,30,10,31,11,31,12,31,13,31,14,31,15,31,16,31,17,31,18,31,19,31,20,31,21,30,22,30,23,29,24,29,25,28,26,28,27,27,28,27,29,26,30,25,31,25,32,24,33,23,34,22,35,22,36,21,37,20,38,20,39,19,40,18,41,17,42,16,43,15,43,14,42,13,41,12,40,11,39,11,38,10,37,9,36,9,35,8,34,7,33,6,32,6,31,5,30,4,29,4,28,3,27,3,26,2,25,2,24,1,23,1,22,0,21,0,20,0,19,0,18,0,17,0,16,0,15,0,14,0,13,0,12,0,11,1,10,1,9,2,8,2,7,3,6,4,5,4,4,6,3,7,2,8,1,11,0,20,0],
						type  : 'poly'
					};
				*/

				marker = new MarkerWithLabel({
					raiseOnDrag : false,
					clickable   : true,
					draggable 	: false,
					icon 		: ' ',
					//icon 		: ( marker_icon ? ' ' : '' ),
					//icon        : image,
					//shadow      : shadow,
					//shape       : shape,
					cursor      : 'pointer',
					//animation   : google.maps.Animation.BOUNCE,
					position	: latlng,
					map			: map,
					labelContent: marker_icon,
				    labelAnchor: new google.maps.Point(13, 40),
				    labelClass: 'labels' // the CSS class for the label
				});
				
				if ( marker_img )
					marker.setIcon( marker_img );

				map.markers.push( marker );

				$location = $activator = $('[data-id="' + id + '"]');
				$action = ( $location.data('open-marker') ? $location.data('open-marker') : false );

				if( $action == false ){
					$activator = $location.children( '[data-open-marker]' );
					if( $activator.length ){
						$action = $activator.data('open-marker');
					}else{
						$action = [];
					}
				}

				if( $this.html() ){

					with( { mark: marker, location: $location } ){

						google.maps.event.addListener( mark, 'click', function() {
							openInfoWindow(mark, location);
						});

					}

					if( $action ){

						$activator.css( 'cursor', 'pointer' );
						$location.addClass( 'onmap' );

						switch( $action ){
							case 'over':

								$activator.mouseenter(function () {
									focusMarker();								    
								});

							break;

							default:

								$activator.click(function () {
									focusMarker();
								});

							break;
						}
					}
				}

				var focusMarker = function(){

					var elem = document.createElement( 'a' );
					var $elem = $( '<a id="temp" href="#map-' + count + '"></a>' );
					$elem.smoothScroll();
					$elem.remove();

					//map.panTo(latlng);
					//google.maps.event.addListenerOnce( map, 'idle', function(){
					    google.maps.event.trigger( marker, 'click' );
					//});
				}

				var openInfoWindow = function( mark, location ){
					infowindow.close();
					infowindow.setContent( $this.html() );
					infowindow.open( map, marker );
					$( '.onmap' ).removeClass( 'infowindow' );
					if( location.hasClass( 'onmap' ) )
						location.addClass( 'infowindow' );
				}

				$this.centerMap( map, zoom );

			};
		});
	}

	$.fn.centerMap = function( map, zoom ) {

		var bounds = new google.maps.LatLngBounds();

		$.each( map.markers, function( i, marker ){

			var latlng = new google.maps.LatLng( marker.position.lat(), marker.position.lng() );
			bounds.extend( latlng );

		});

		if( map.markers.length == 1 ){

		    map.setCenter( bounds.getCenter() );
		    map.setZoom( zoom );

		}else{

			google.maps.event.addListener(map, 'zoom_changed', function() {
			    zoomChangeBoundsListener = 
			        google.maps.event.addListener(map, 'bounds_changed', function( event ) {

			            if ( this.getZoom() > zoom && this.initialZoom == true ) {
			                // Change max/min zoom here
			                this.setZoom( zoom );
			                this.initialZoom = false;
			            }

			        google.maps.event.removeListener( zoomChangeBoundsListener );

			    });
			});

			map.initialZoom = true;
			map.fitBounds( bounds );

		}
	}
	
	// *****************************************************
	// *      SLIDER CAPTION
	// *****************************************************

	// +++ todo: passare data a figli (animazioni caption, più livelli, ecc)
	// queste 2 funzioni vengono riviste

	$.fn.captionMoveIn = function( state, slider, speed ){	

		var $slider = $( slider );
		
		$slider.disableIt();
		//$slider.css( 'pointer-events', 'none' );

		return this.each( function() {

			var $this = $( this ),
				from = $this.outerWidth();

			$this.css( { left: from + 'px', opacity: 1 } );
				
				$this.animate({

					'left': '0px'

				}, speed, function(){
					$slider.enableIt();
				} );

		});

	}

	$.fn.captionMoveOut = function( state, slider, speed ){

		var $slider = $( slider );

		//$slider.css( 'pointer-events', 'none' );
		$slider.disableIt();
	
		return this.each( function() {

			var $this = $( this ),
				to = - $this.outerWidth();

			$this.css( { left: '0px', opacity: 1 } );

			$this.animate({

				'left': to + 'px'

			}, speed, function(){
			} );

		});

	}

	// *****************************************************
	// *      SLIDER
	// *****************************************************

	$.fn.initSlider = function() {

		return this.each( function() {

			var slides = $( this ).find( '.slide-image' );

			if( slides.length ){

				slides.css( 'display', 'none' );
				$( slides[0] ).css( 'display', 'inline-block' );

			}

		});

	}

	// *****************************************************
	// *      NIVO SLIDER
	// *****************************************************

	$.fn.setNivoSlider = function(){

		if( !$.functionExists( 'nivoSlider' ) )
			return this;

		return this.each( function() {

			var $body 		= $( 'body' ),
				$this 		= $( this ),
				theme 		= 'theme-' + ( $this.data( 'slider-theme' ) ? $this.data( 'slider-theme' ) : 'default' );

			if( $this.find( '.slide-image' ).length < 2 )
				return this;

			$this.parent().addClass( 'slider-wrapper' );
			$this.parent().addClass( theme );
			$this.addClass( 'nivoSlider' );

			$this.find( 'img' ).each( function(){
				$( this ).css( 'display', 'inline-block' );
			});

			$this.nivoSlider( {
			    effect: 			$this.data( 'slider-effect' ), 									// sliceDown | sliceDownLeft | sliceUp | sliceUpLeft | sliceUpDown | sliceUpDownLeft | fold | fade | random | slideInRight | slideInLeft | boxRandom | boxRain | boxRainReverse | boxRainGrow | boxRainGrowReverse
			    slices: 			$this.data( 'slider-slices' ), 									// For slice animations
			    boxCols: 			$this.data( 'slider-cols' ), 									// For box animations
			    boxRows: 			$this.data( 'slider-rows' ), 									// For box animations
			    animSpeed: 			$this.data( 'slider-speed' ), 									// Slide transition speed
			    pauseTime: 			$this.data( 'slider-time' ), 									// How long each slide will show
			    startSlide: 		$this.data( 'slider-start' ), 									// Set starting Slide (0 index)
			    directionNav: 		$this.data( 'slider-direction' ), 								// Next & Prev navigation
			    controlNav: 		$this.data( 'slider-control' ), 								// 1,2,3... navigation
			    controlNavThumbs: 	$this.data( 'slider-thumbs' ), 									// Use thumbnails for Control Nav
			    pauseOnHover: 		$this.data( 'slider-hover' ), 									// Stop animation while hovering
			    manualAdvance: 		$this.data( 'slider-manual' ), 									// Force manual transitions
			    prevText: 			'', 			// Prev directionNav text
			    nextText: 			'', 			// Next directionNav text
			    randomStart: 		$this.data( 'slider-random' ), 									// Start on a random slide
			    beforeChange: function( e ){       													// Triggers before a slide transition

			    	$this.find( '.nivo-caption' ).captionMoveOut( 'before', this, $this.data( 'slider-speed' ) );

			    },
			    afterChange: function( e ){        						// Triggers after a slide transition

			    	$this.find( '.nivo-caption' ).captionMoveIn( 'after', this, $this.data( 'slider-speed' ) );

			    },
			    slideshowEnd: function( e ){       						// Triggers after all slides have been shown

			    },
			    lastSlide: function( e ){          						// Triggers when last slide is shown

			    },
			    afterLoad: function( e ){          						// Triggers when slider has loaded

			    	var $next = $this.find( 'a.nivo-nextNav' ),
			    		$prev = $this.find( 'a.nivo-prevNav' );

			    	$next.append( '<i class="fa ' + $this.data( 'slider-next' ) + '">' );
			    	$prev.append( '<i class="fa ' + $this.data( 'slider-prev' ) + '">' );

			    	var next_over = parseInt( $next.css( 'right' ) ),
			    		next_shw = $next.getBoxShadow(),
			    		next_w = $next.outerWidth() + parseFloat(+next_shw.x) + parseFloat(next_shw.blur) + parseFloat(next_shw.exp),
			    		next_out = next_over - next_w,
			    		next_mid = next_over - next_w/4,
			    		prev_over = parseInt( $prev.css( 'left' ) ),
			    		prev_shw = $prev.getBoxShadow(),
			    		prev_w = $prev.outerWidth() + parseFloat(+prev_shw.x) + parseFloat(prev_shw.blur) + parseFloat(prev_shw.exp),
			    		prev_out = prev_over - prev_w,
			    		prev_mid = prev_over - prev_w/4;

					$next.css( 'right', next_out );
					$prev.css( 'left', prev_out );

			    	$this.mouseenter( function(e){
						$next.animate( {
							'right': next_mid + 'px'
						}, 300 );
						$prev.animate( {
							'left': prev_mid + 'px'
						}, 300 );
			    	} );

			    	$this.mouseleave( function(e){
						$next.animate( {
							'right': next_out + 'px'
						}, 300 );
						$prev.animate( {
							'left': prev_out + 'px'
						}, 300 );
			    	} );

			    	$next.mouseenter( function(e){
			    		var $imgs = $this.find( 'img' );
			    		$imgs.attr( 'data-transition', 'sliceDown' );

						$( this ).animate( {
							'right': next_over + 'px'
						}, 200 );
					} );
					$prev.mouseenter( function(e){
						var $imgs = $this.find( 'img' );
			    		$imgs.attr( 'data-transition', 'sliceDownLeft' );

						$( this ).animate( {
							'left': prev_over + 'px'
						}, 200 );
			    	} );

			    	$next.mouseleave( function(e){
			    		var $imgs = $this.find( 'img' );
			    		$imgs.attr( 'data-transition', $this.data( 'slider-effect' ) );

						$( this ).animate( {
							'right': next_mid + 'px'
						}, 200 );
					} );
					$prev.mouseleave( function(e){
						var $imgs = $this.find( 'img' );
			    		$imgs.attr( 'data-transition', $this.data( 'slider-effect' ) );

						$( this ).animate( {
							'left': prev_mid + 'px'
						}, 200 );
			    	} );
			    	
			    	$body.trigger( 'nivoLoaded', [ $this ] );
			    	//$this.find( '.nivo-caption' ).addClass( 'box' );
			    	$this.find( '.nivo-caption' ).addClass( 'box' ).captionMoveIn( 'load', this, $this.data( 'slider-speed' ) );
			    }
			});

			if( $body.hasClass( 'touch' ) ){

				$this.find( 'a.nivo-nextNav' ).css( 'visibility', 'hidden' );
				$this.find( 'a.nivo-prevNav' ).css( 'visibility', 'hidden' );

				$this.swipe( {
			
			        swipeLeft: function( event, direction, distance, duration, fingerCount ) {
			        	//$this.find( 'img' ).data( 'transition','sliceDownLeft' );
			        	$this.find( 'a.nivo-nextNav' ).trigger( 'mouseenter' );
						$this.find( 'a.nivo-nextNav' ).trigger( 'click' );
						event.stopPropagation();

			        },
			        swipeRight: function( event, direction, distance, duration, fingerCount ) {
			        	//$this.find( 'img' ).data( 'transition','sliceDown' );
		                $this.find( 'a.nivo-prevNav' ).trigger( 'mouseenter' );
		                $this.find( 'a.nivo-prevNav' ).trigger( 'click' );
		                //$this.find( 'img' ).data( 'transition','sliceDownLeft' );
			        	event.stopPropagation();

			        },
			        threshold: 10,
			        excludedElements: ''
					
				});

			}
			
		});

	}

	// *****************************************************
	// *      FANCYBOX
	// *****************************************************

	$.fn.setFancybox = function() {

		if( !$.funExists( 'fancybox' ) )
			return this;

		return this.each( function() {

			var $this 			= $( this ),
				popup 			= ( $this.data( 'popup' ) ? $this.data( 'popup' ) : '' );

				if( !popup  || !popup.length )
					return;

			var len 			= popup.length,
				path 			= ( $this.data( 'popup-path' ) ? $this.data( 'popup-path' ) : '' ),
				init 			= ( $this.data( 'popup-init' ) ? $this.data( 'popup-init' ) : 0 ),
				title 			= ( $this.data( 'popup-title' ) ? $this.data( 'popup-title' ) : '' ),
				type 			= ( $this.data( 'popup-type' ) ? $this.data( 'popup-type' ) : 'image' ),
				content 		= ( $this.data( 'popup-content' ) ? $this.data( 'popup-content' ) : '' );
				
			var arrows 			= ( len === 1 ? 0 : ( $this.data( 'popup-arrows' ) ? $this.data( 'popup-arrows' ) : 0 ) ),
				mini 			= ( $this.data( 'popup-miniarrows' ) ? $this.data( 'popup-miniarrows' ) : 0 ),
				name 			= ( $this.data( 'popup-name' ) ? $this.data( 'popup-name' ) : 0 ),
				counter			= ( $this.data( 'popup-counter' ) ? $this.data( 'popup-counter' ) : 0 ),
				info			= ( $this.data( 'popup-info' ) ? $this.data( 'popup-info' ) : 0 ),
				color			= ( $this.data( 'popup-color' ) ? $this.data( 'popup-color' ) : 0 ),
				list 			= ( len === 1 ? 0 : ( $this.data( 'popup-list' ) ? $this.data( 'popup-list' ) : 0 ) ),
				data 			= ( $this.data( 'popup-data' ) ? $this.data( 'popup-data' ) : 'float' ),
				reverse			= ( $this.data( 'popup-reverse' ) ? $this.data( 'popup-reverse' ) : 0 ),
				titles 			= ( $this.data( 'popup-titles' ) ? parseInt( $this.data( 'popup-titles' ) ) : 0 ),
				captions	 	= ( $this.data( 'popup-captions' ) ? parseInt( $this.data( 'popup-captions' ) ) : 0 ),
				alternates 		= ( $this.data( 'popup-alternates' ) ? parseInt( $this.data( 'popup-alternates' ) ) : 0 ),
				descriptions 	= ( $this.data( 'popup-descriptions' ) ? parseInt( $this.data( 'popup-descriptions' ) ) : 0 ),
				dates 			= ( $this.data( 'popup-dates' ) ? parseInt( $this.data( 'popup-dates' ) ) : 0 ),
				modifies 		= ( $this.data( 'popup-modifies' ) ? parseInt( $this.data( 'popup-modifies' ) ) : 0 ),
				filenames 		= ( $this.data( 'popup-filenames' ) ? parseInt( $this.data( 'popup-filenames' ) ) : 0 ),
				types 			= ( $this.data( 'popup-types' ) ? parseInt( $this.data( 'popup-types' ) ) : 0 );
				
			var images 			= [],
				i 				= 0,
				j 				= 0,
				space 			= $.EmToPx( 1 ),
				extra 			= $.EmToPx( 3 ),
				margin 			= [ extra + space, extra, extra + space, extra ];

			$this.disableIt();

			for ( i = 0; i < len; i++ ) {

				if( type == 'video' ){

					images.push( '<iframe width="854" height="510" src="' + popup[i] + '" frameborder="0" allowfullscreen></iframe>' );

				}else if( type == 'load' ){

					$this.css( 'opacity', .3 );
					$( $.iconLoading( 'double', 'absolute middle' ) ).appendTo( $this ).hide().fadeIn('slow');

					$.get( popup[i], function ( response ) {
						images.push( $( '<div>' + response + '</div>' ).find( content ).html() );
						j++;
						if( j == len ){
							$this.find( '.loading' ).remove();
							$this.enableIt();
							$this.animate( { 'opacity' : 1 }, 'fast' );
						}
					});

				}else if( typeof( popup[i] ) === 'string' ){

					images.push( popup[i] );

				}else if( typeof( popup[i].url ) !== undefined ){

					var temp = { href: path + popup[i].url };
					var tit = '';

					if( titles || captions || alternates || descriptions || dates || modifies || filenames || types ){

						if ( titles && popup[i].title )
							tit = tit + '<span class="imgdata title">' + popup[i].title + '</span>';
						if ( captions && popup[i].caption )
							tit = tit + '<span class="imgdata caption">' + popup[i].caption + '</span>';
						if ( alternates && popup[i].alt )
							tit = tit + '<span class="imgdata alt">' + popup[i].alt + '</span>';
						if ( descriptions && popup[i].description )
							tit = tit + '<span class="imgdata description">' + popup[i].description + '</span>';
						if ( dates && popup[i].date )
							tit = tit + '<span class="imgdata date">' + popup[i].date + '</span>';
						if ( modifies && popup[i].modified )
							tit = tit + '<span class="imgdata modified">' + popup[i].modified + '</span>';
						if ( filenames && popup[i].filename )
							tit = tit + '<span class="imgdata filename">' + popup[i].filename + '</span>';
						if ( types && popup[i].type )
							tit = tit + '<span class="imgdata type">' + popup[i].type + '</span>';

						temp.title = tit;
						
					}

					images.push( temp );
					
				}

			}

			if( type != 'load' ){
				$this.enableIt();
			}

			if( type == 'video' || type == 'load' )
				type = 'html';

			$this.click( function() {

				var $current = $( '.fancybox-overlay' );
				if( $current.length ){
					$current.remove();
				}

			    $.fancybox.open(
			    	images,
			    	{
			    		modal: false,
						type: type,
		                scrolling: 'auto',
		                autoSize: false,
			    		padding: 0,
			    		margin: margin,

			    		openOpacity: true,
			    		arrows: false,
			    		nextClick: false,
				   		closeBtn: false,
				   		closeOpacity: true,
				   		closeClick: false,
				   		index: init,
				   		list: list,
				   		
				   		openEffect: 'fade',
				   		closeEffect: 'fade',
				   		nextEffect: 'elastic',
				   		prevEffect: 'elastic',
				   		openEasing: 'easeOutSine',
				   		closeEasing: 'easeInSine',
				   		nextEasing: 'easeInOutSine',
				   		prevEasing: 'easeInOutSine',
				   		openSpeed: 50,
				   		closeSpeed: 350,
				   		nextSpeed: 600,
				   		prevSpeed: 600,
				   		
				   		helpers: {
			    			overlay: {
			    				css : {
					                'background-color' : 'rgba(0, 0, 0, .85)',
					                'background-image' : 'none',
					            },
					            closeClick:false,
		                        speedOut:50,
		                        showEarly:true
			    			},
			    			title: { type: data },
				   		},
				   		tpl: {
				   			wrap 	 : '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
				   			//next     : '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span>&rsaquo;</span></a>',
							//prev     : '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span>&lsaquo;</span></a>',
							//closeBtn : '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
				   		},
				   		
						beforeLoad: function() {
							
							// DISABLE SCROLLING
							window.ontouchmove  = function(e) {
								e = e || window.event;
								if (e.preventDefault)
									e.preventDefault();
								e.returnValue = false;  
							}
							$( 'body' ).addClass( 'no-scroll' );

						},

						afterLoad: function() {

							var $over = $( '.fancybox-overlay' );
							var $wrap = $( '.fancybox-wrap' );

							$over.addClass( type );
							$over.addClass( data );
							if(reverse )
								$over.addClass( 'reverse' );

							// ARROWS
							if( arrows ){
								
							    var $arrows = $( '.fancybox-nav' );
							    if (!$arrows.length){
							    	$( '<a title="Next" class="fancybox-stuff fancybox-nav fancybox-next" href="javascript:;"><span>&rsaquo;</span></a>' ).click( function() {
								        $.fancybox.next();
								    }).appendTo( $over );
							    	$( '<a title="Previous" class="fancybox-stuff fancybox-nav fancybox-prev" href="javascript:;"><span>&lsaquo;</span></a>' ).click( function() {
								        $.fancybox.prev();
								    }).appendTo( $over );
								    if( mini )
									    $over.addClass( 'miniarrows' );
							    }
							}
							
							// NAVLIST
							if( list ){
							    var $list = $( '.fancybox-links' );
							    if (!$list.length){
							    	$list = $( '<ul class="fancybox-stuff fancybox-links" data-elements="' + this.group.length + '"></ul>' );
							        for (var i = 0; i < this.group.length; i++){
							        	$( '<li data-index="' + i + '"><label></label></li>' ).click( function() {
									        if( $( this ).hasClass( 'active' ) )
									        	return;
									        $.fancybox.jumpto( $( this ).data( 'index' ) );
									    }).appendTo( $list );
							        }
							    	$over.prepend( $list );
							    	$over.addClass( 'list list-points' );
							    }

							    $list.find( '[data-index=' + this.index + ']' ).addClass( 'active' ).siblings().removeClass( 'active' );
							}

							// TOOLS
							//if( tools ){
							    var $tools = $( '.fancybox-tools' );
							    if (!$tools.length){
							    	
							    	$tools = $( '<div class="fancybox-tools"></div>' );
							    	
							    	if( color ){
							    		$( '<a title="Color" class="fancybox-stuff fancybox-item fancybox-color" href="javascript:;"><i class="fa fa-circle"></i></a>' ).click( function() {
									        $( this ).toggleClass( 'on' );
									        $over.toggleClass( 'white' );
									    }).appendTo( $tools );
							    	}
							    	
							    	if( info ){
							    		$( '<a title="Info" class="fancybox-stuff fancybox-item fancybox-info" href="javascript:;"><i class="fa fa-info-circle"></i></a>' ).click( function() {
									        $( this ).toggleClass( 'on' );
									        $over.toggleClass( 'info' );
									        
									        if( $over.hasClass( 'info' ) )
									        	$( this ).parent().siblings( '.fancybox-nav' ).css( 'opacity', 0 );
									        else
									        	$( this ).parent().siblings( '.fancybox-nav' ).css( 'opacity', 'initial' );
									        
									        $over.find( '.fancybox-counter, .fancybox-name, .fancybox-links, .fancybox-title' ).toggleClass( 'hidden' );
									    }).appendTo( $tools );
							    	}
							    	
							    	//if( close ){
							    		$( '<a title="Back" class="fancybox-stuff fancybox-item fancybox-back" href="javascript:;"><i class="fa fa-times-circle"></i></a>' ).click( function() {
									        $.fancybox.close();
									    }).appendTo( $tools );
							    	//}

							    	$over.prepend( $tools );
							    }
							//}

							// TITLE
							if( name ){
							    var $name = $( '.fancybox-name' );
							    if (!$name.length)
							    	$over.prepend( $( '<h1 class="fancybox-stuff fancybox-name text-center">' + title + '</h1>' ) );
							}

							// COUNTER
							if( counter ){
							    var $counter = $( '.fancybox-counter' );
							    if (!$counter.length)
							    	$over.prepend( $( '<h2 class="fancybox-stuff fancybox-counter">' + ( this.index + 1 ) + '/' + this.group.length + '</h2>' ) );
							}

							$wrap.eventLinks();

						},

						beforeShow: function() {

							$( '.fancybox-counter' ).html( ( this.index + 1 ) + '/' + this.group.length );
							$( '.fancybox-wrap' ).bind("contextmenu", function (e) { return false; });

						},

						afterShow: function() {						
						},

						beforeClose: function() {

							// ENABLE SCROLLING
							$( 'body' ).removeClass( 'no-scroll' );
							window.ontouchmove = null;

						},
			    	}
			    );
			    
			    return false;
			});
		});
	}

	// *****************************************************
	// *      TOOLTIP
	// *****************************************************

	$.fn.setTooltip = function( event ){

		if( !$.functionExists( 'powerTip' ) )
			return this;

		return this.each(function() {

		    var $this = $( this );

			var data = $this.data('tooltip');
			var $element = $this.find( data );
			
			var content = $element.html();
			$element.addClass('invisible');
			//classes = $element.attr('class') + ' tooltip';
			var classes = 'tooltip' + ( $this.data('tooltip-class') ? ' ' + $this.data('tooltip-class') : '' );
			var direction = ( $this.data('tooltip-direction') ? $this.data('tooltip-direction') : 'n' );
			
			$this.data('powertipjq', $([
			    '<div class="' + classes + '">' + content + '</div>',
			    ].join('\n'))
			);
			
			$this.powerTip({
				placement: direction,
				smartPlacement: true,
				popupId: 'tooltip',
				//followMouse: true
			});

		});
	};

	// *****************************************************
	// *      CURSOR
	// *****************************************************

	$.fn.setCursor = function( icn, at ){

		if( !$.functionExists( 'awesomeCursor' ) )
			return this;

		return this.each(function() {

		    var $this 		= $( this ),
		    	$elems 		= ( $this.data('cursor-node') ? $this.find( $this.data('cursor-node') ) : $this ), // String (node 'a, data-href, div') || 'link' = a || 'all' = a, data-href
				icon 		= ( icn ? icn : ( $this.data('cursor') ? $this.data('cursor') : ( $elems.is($this) ? 'mouse-pointer' : 'hand-pointer-o' ) ) ), // String
				attr 		= $.extend( {
					color 		: ( $this.data('cursor-color') ? $this.data('cursor-color') : '#000000' ), // String ( red, #FF0000, rgb(255,0,0), hsl(0,100%,50%) )
					size 		: ( $this.data('cursor-size') ? $this.data('cursor-size') : 14 ), // Number
					hotspot		: ( $this.data('cursor-pivot') ? $this.data('cursor-pivot') : [0,0] ), // Array || String ( bottom left - center - center top - center right - top right )
					flip 		: ( $this.data('cursor-flip') ? $this.data('cursor-flip') : '' ), // String ( horizontal, vertical, both )
					rotate 		: ( $this.data('cursor-rotate') ? $this.data('cursor-rotate') : 0 ), // Number
					outline 	: ( $this.data('cursor-outline') ? $this.data('cursor-outline') : null ), // String ( red, #FF0000, rgb(255,0,0), hsl(0,100%,50%) )
				}, at ),
				defaults 	= ( $this.data('cursor-defaults') ? $this.data('cursor-defaults') : 0 ); // Boolean

			if( defaults )
				$.fn.awesomeCursor.defaults = $.extend( $.fn.awesomeCursor.defaults, attr);
			$elems.awesomeCursor( icon, attr );

		});
	};

		// *****************************************************
	// *      LOAD CONTENT
	// *****************************************************

	$.fn.loadContent = function( event, link ){
		
		var $body = $('body');
		$body.disableIt();

		return this.each( function() {

			var $this 	= $( this ),
				$element = $this.parent(),
				id = ( $element.data( 'load-content' ) ? $element.data( 'load-content' ) : $this.data( 'load-content' ) ),
				paged = ( $element.data( 'load-paged' ) ? $element.data( 'load-paged' ) : $this.data( 'load-paged' ) ),
				offset = ( $element.data( 'load-offset' ) ? $element.data( 'load-offset' ) : $this.data( 'load-offset' ) ),
				page = $.getUrlParameter( ( $element.data( 'load-page' ) ? $element.data( 'load-page' ) : $this.data( 'load-page' ) ), link ),
				$container = $( id ),
				c_height = $container.outerHeight(),
				$parent = $container.parent(),
				p_height = $parent.outerHeight(),
				elem = document.createElement( 'a' ),
				loading = $.iconLoading(),
				$loading;

			elem.href = id;

    		$parent.css( 'overflow', 'hidden' );
			$parent.css('height', p_height);


			$body.trigger( 'loadContentBefore' );

			
			if( !ARCHIVES[id] )
				ARCHIVES[id] = {};
			ARCHIVES[id][paged] = $container.html();

			var buildContent = function(){

				$( elem ).remove();

				$container.fadeOut('fast', function(){

					if( ARCHIVES[id] && ARCHIVES[id][page] ){

						$container.html( ARCHIVES[id][page] );
						$body.trigger( 'loadContent' );
						adjustContent();

					}else{

						$loading = $( loading ).appendTo( $parent ).hide().fadeIn('slow');
						
						$container.html( '' );
						// come secondo parametro puoi passare un oggetto con variabili POST
						$container.load( link + ' ' + id + ' > *', function( response, status, xhr ) {
							if ( status == 'error' ) {
								var msg = 'Spiacenti, è stato riscontrato un errore: ';
								$container.html( '<span class="scm-error error">' + msg + xhr.status + ' ' + xhr.statusText + '</span>' );
							}else{
								$body.trigger( 'loadContent' );
								$loading.fadeOut('fast', function(){
									$container = $(id);
									$loading.remove();
									adjustContent();

								});
							}
						});
					}
				});
			}

			var adjustContent = function(){
				$container.fadeIn('fast', function(){
					
					var new_height = $container.outerHeight();

					if( c_height != new_height ){
					
						$parent.animate({ 'height' : p_height - ( c_height - new_height ) }, 'slow', function(){
							enableContent();
							$body.trigger( 'loadContentAfter' );
						});

					}else{
						enableContent();
						$body.trigger( 'loadContentAfter' );
					}
				});
			}

			var enableContent = function(){

				$parent.css( 'height', 'auto' );
				$parent.css( 'overflow', 'visible' );
				$container.eventTools();
				$container.eventLinks();
				$( elem ).smoothScroll( offset );
			}

			$( elem ).smoothScroll( offset, buildContent );

		});
	}

	// *****************************************************
	// *      CSS
	// *****************************************************

	$.fn.setCss = function( data, attr ) {

		if( !attr )
			attr = data;
			
		return this.each(function() {

			var $this 		= $( this );
				val 		= $this.attr( 'data-' + data );

			$this.css( attr, val );

		});

	}

	// *****************************************************
	// *      YOUTUBE EMBED FIX
	// *****************************************************

	$.fn.youtubeFix = function(){

		return this.each( function() {

			var $this 	= $( this ),
				srcAtt 	= $this.attr( 'src' );

			if ( -1 == srcAtt.indexOf( '?' ) )
				srcAtt += '?wmode=transparent';
			else
				srcAtt += '&amp;wmode=transparent';
			$this.attr( 'src', srcAtt );

		});
	}


} )( jQuery );