//*****************************************************
//*
//	IE fixes
//	Youtube Embed Fix
//	Toggle Menu
//	Affix It
//	Sticky It
//	Sticky Menu
//	Smooth Scroll
//	Current Link Class
//  Top Of Page
//  Responsive Layout
//  Google Maps
//  Nivo Slider
//	Fancybox
//  Tooltip
//  Editable Table
//
//	Change Page
//*
//*****************************************************

var DEBUG = 0;
var ADVANCED = 'altKey';
var INITPAGE = function(){};
var INITCHILD = function(){};
var READYCHILD = function(){};
var READYPAGE = function(){};
var $MAGIC;

( function($){

	var CONTENTS = {};
	$MAGIC = new $.ScrollMagic.Controller();

// *****************************************************
// *      MAIN PLUGINS
// *****************************************************

	// *****************************************************
	// *      SET EVENTS - Call these when dynamically attaching/loading contents
	// *****************************************************

	$.fn.eventsInit = function( links, tools, css, images, responsive ){
		
		$MAGIC.update();
		
		if( links !== undefined && links !== null )
			this.eventLinks( links );
		if( tools !== undefined && tools !== null )
			this.eventTools( tools );
		if( css !== undefined && css !== null )
			this.eventCss( css );
		if( images !== undefined && images !== null )
			this.eventImages( images );
		if( responsive !== undefined && responsive !== null )
			this.eventResponsive( responsive );
		return this;
	}

	// *****************************************************

	$.fn.eventResponsive = function( option ) {

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

		if( option != 'init' ){
			this.removeClass( r );
			this.addClass( a );

			if( w < sizes[ tofull ] ) this.addClass( 'tofull' );
			else this.removeClass( 'tofull' );

			if( w < sizes[ tocolumn ] ) this.addClass( 'tocolumn' );
			else this.removeClass( 'tocolumn' );

			if( option == 'force' || old != this.attr( 'class' ) ){

				if ( this.hasClass( 'smartmin' ) )		state = 'smartmin';
				else if( this.hasClass( 'smart' ) )		state = 'smart';
				else if( this.hasClass( 'portrait' ) )	state = 'portrait';
				else if( this.hasClass( 'notebook' ) )	state = 'notebook';
				else if( this.hasClass( 'landscape' ) )	state = 'landscape';
				else if( this.hasClass( 'wide' ) )		state = 'wide';
				else if( this.hasClass( 'desktop' ) )	state = 'desktop';

				this.trigger( 'responsive', [ state ] );
			}			
		}
		
		return this;
	}

	$.fn.eventImages = function( bg ) {
		$.consoleDebug( DEBUG, '-- images events');
		var $this = this;
		var bgs = ( !bg ? { background: '*' } : null );
		$this.imagesLoaded( bgs )
			.always( function( instance ) {
				$this.trigger( 'imgsLoaded', instance );
				$.consoleDebug( DEBUG, '- imgsLoaded' );
			})
			.done( function( instance ) {
				$this.trigger( 'imgsDone', instance );
				$.consoleDebug( DEBUG, '- imgsDone' );
			})
			.fail( function() {
				$this.trigger( 'imgsFail' );
				$.consoleDebug( DEBUG, '- imgsFail' );
			})
			.progress( function( instance, image ) {
				var result = image.isLoaded ? 'loaded' : 'broken';
				if( image.isLoaded ){
					$this.trigger( 'imgLoaded', instance, image );
					$.consoleDebug( DEBUG, '-- imgLoaded: ' + image.img.src );
				}else{
					$this.trigger( 'imgFailed', instance, image );
					$.consoleDebug( DEBUG, '-- imgFailed: ' + image.img.src );
				}					
			});

		return this;
	}

	$.fn.eventCss = function(){
		$.consoleDebug( DEBUG, '-- css events');
		this.find( '[data-bg-color]' ).setCss( 'bg-color', 'background-color' );
		this.find( '[data-zindex]' ).setCss( 'zindex', 'z-index' );
		this.find( '[data-left]' ).setCss( 'left' );
		this.find( '[data-top]' ).setCss( 'top' );
		this.find( '[data-right]' ).setCss( 'right' );
		this.find( '[data-bottom]' ).setCss( 'bottom' );

		return this;
	}

	$.fn.eventTools = function(){
		$.consoleDebug( DEBUG, '-- tools events');
		this.find( '.scm-map' ).googleMap();
		this.find( '.addtocalendar' ).AddToCalendar();
		this.find( '[data-content-fade]' ).fadeContent();
		this.find( '[data-tooltip]' ).setTooltip();
		this.find( '[data-cursor]' ).setCursor();
		this.find( '[data-popup]' ).setFancybox();
		this.find( '[data-slider]' ).initSlider();
		this.find( '[data-current-view]' ).currentView();
		this.find( '[data-current-link]' ).currentLink();
		this.find( 'iframe[src*="youtube.com"]' ).youtubeFix();

		return this;
	}

	$.fn.eventLinks = function(){

		$.consoleDebug( DEBUG, '-- links events');

		var //$nav 	= this.find( 'a, .navigation' ).filter(':not(.nolinkit):not(.iubenda-embed)').filter(function( index ) { return $( this ).parents( '.a2a_kit .ssba-wrap, .acf-form, .scm-map, .bx-controls, .addtocalendar' ).length === 0; }),
			$link 	= this.find( 'a, [data-href], .navigation' ).filter(':not(.nolinkit):not(.iubenda-embed)').filter(function( index ) { return $( this ).parents( '.social-share, .acf-form, .scm-map, .bx-controls, .addtocalendar' ).length === 0; });
			//$anch 	= this.find( 'a' ).filter(':not(.nolinkit):not(.iubenda-embed)').filter(function( index ) { return $( this ).parents( '.a2a_kit .ssba-wrap, .acf-form, .scm-map, .bx-controls, .addtocalendar' ).length === 0; }),
			//$data 	= this.find( '[data-href]' ).replaceTag( '<a>', true );

			//console.log( $anch.length );
			//console.log( $data.length );
			//console.log( this.find( 'a' ).filter(':not(.nolinkit):not(.iubenda-embed)').filter(function( index ) { return $( this ).parents( '.a2a_kit .ssba-wrap, .acf-form, .scm-map, .bx-controls, .addtocalendar' ).length === 0; }).length );
		//$link.filter( ':not([data-link-type])' ).linkIt();
		$link.linkIt();

		/*$link.off( 'mousedown' ).on( 'mousedown', function(e){
			e.stopPropagation();
		});*/
		$link.off( 'mousedown' ).on( 'mousedown', function(e){
			e.stopPropagation();
		});

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
					$toggled.toggledOff();
					setTimeout( function(){
						$this.trigger( 'link' );
					}, 400 );
				}else{
					$this.trigger( 'link' );
				}
			}else{
				$toggled.toggledOff();
				e.preventDefault();
			}
		});

		$link.off( 'link anchor' ).on( 'link anchor', function( e ){

			var $this 	= $( this ),
				$body 	= $( 'body' ),
				href 	= ( $this.attr('href') ? $this.attr('href') : $this.data('href') ),
				target 	= ( $this.attr('target') ? $this.attr('target') : $this.data('target') ),
				anchor 	= ( $this.attr('anchor') ? $this.attr('anchor') : $this.data('anchor') ),
				state 	= $this.attr('data-link-type');

			$.consoleDebug( DEBUG, '-----------');
			$.consoleDebug( DEBUG, '[link] > ' + state );

			switch( state ){

				case 'single':
					$.consoleDebug( DEBUG, '- loading single post');
					e.stopPropagation();
					e.preventDefault();
					$this.loadSingle( href );
				break;

				case 'load':
					$.consoleDebug( DEBUG, '- loading content');
					$this.loadContent( href );
				break;

				case 'page':
					$.consoleDebug( DEBUG, '- scrolling');
					$this.smoothAnchor( anchor );
				break;

				default:
					$.consoleDebug( DEBUG, '- changing page');
					$.bodyOut( href, target, state );
				break;
			}
		});

		return this;
	}

	// *****************************************************
	// *      SET HREF and TARGET
	// *****************************************************

	$.fn.linkIt = function( event ){

		return this.each(function() {

		    var $this 		= $( this ),
		    	host 		= new RegExp(location.host),
		    	data 		= $this.data( 'href' ),
		    	link 		= ( undefined !== data ? data.replace('page:', host) : ( undefined !== $this.attr( 'href' ) ? $this.attr( 'href' ).replace('page:', host) : '' ) );

	    	if( !link )
	    		return;

		    var	linkpath 	= $.removeSlash( link ),
		    	linkanchor 	= linkpath.indexOf( '#' ),
		    	lp 			= linkpath.substr( 0, linkanchor );

			var current 	= document.location.href,//document.URL,
				curpath		= $.removeSlash( current ),
				curanchor 	= curpath.indexOf( '#' ),
				lc 			= ( curanchor >= 0 ? curpath.substr( 0, curanchor ) : curpath );

			var	samepath 	= curpath === linkpath;

			var	parent 		= $this.parents( '.sub-menu' ).siblings().find( 'a' ).attr( 'href' ),
				parpath 	= linkanchor === 0 && parent && ( curpath != $.removeSlash( parent ) && parent != '#top' );

			var back 		= linkpath == 'back' || linkpath == 'http:back' || linkpath == 'https:back',
		        load 		= ( $this.data( 'load-content' ) ? $this.data( 'load-content' ) : $this.parent().data( 'load-content' ) ),
		        single 		= ( $this.data( 'load-single' ) ? $this.data( 'load-single' ) : '' ),
		        app 		= ( $.startsWith( linkpath, ['mailto:','callto:','fax:','tel:','skype:'] ) ? linkpath.substr( 0, ( linkpath.indexOf('to:') > 0 ? linkpath.indexOf('to:') : linkpath.indexOf(':') ) ) : null );

		    var href 		= ( single ? link : ( back ? '#' : ( app ? link : ( samepath ? '#top' : ( parpath ? parent + link : ( linkanchor >= 0 && lp === lc ? linkpath.substr( linkanchor ) : link ) ) ) ) ) ),
		        hrefanchor 	= href.indexOf( '#' ),
		        hrefupload 	= href.indexOf( '/uploads/' ),
				samehost 	= hrefanchor === 0 ? true : host.test( href ),
				target 		= ( data ? $this.data( 'target' ) : ( $this.attr( 'target' ) ? $this.attr( 'target' ) : ( $this.hasClass( 'external' ) ? '_blank' : '' ) ) ),
				state 		= 'site',
				type 		= ( $this.data( 'link-type' ) ? $this.data( 'link-type' ) : '' );

			if( data && ( href == $.getCleanUrl( current ) || hrefanchor === 0 ) ){
				$this.addClass( 'current' );
			}else{
				$this.removeClass( 'current' );
			}

			if( type ) return this;
			
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
				target = '_self';
			
			}else if( (samehost && target !== '_blank') ){

				target = '_self' ;
				if( state != 'page' ){
					state = 'site';	
				}

			}else{

				target = '_blank';
				state = 'external';
			}

			if( single ){
				/*hrefanchor = 0;
				href = link;*/
				state = 'single';
				target = '_self';
			}

			if( hrefanchor === 0 )
				$this.attr( 'data-anchor', href );




			if(data)
				$this.data( 'href', href ).data( 'target', target );
			else
				$this.attr( 'href', href ).attr( 'target', target );

			$this.attr( 'data-link-type', ( back ? 'back' : ( app ? app : state ) ) );

		});
	}

	// *****************************************************
	// *      URL
	// *****************************************************

	$.fn.setUrlData = function( href, hash, params, push, type, element, title ){
		$.consoleDebug( DEBUG, '- setUrlData');
		
		return this.each( function() {

			var $this = $( this );
			var attr = {
				hash: '#top',
				params: '',
				type: type,
				element: element,
			};
		
			if( hash && hash !== undefined && hash !== null ){
				$this.attr( 'data-anchor', hash );
				attr.hash = hash;
			}

			if( params && params !== undefined && params !== null ){
				$this.attr( 'data-params', params );
				attr.params = params;
			}

			if( !push )
				$.replaceState( href + attr.params, attr, title );
			else if( push )
				$.pushState( href + attr.params, attr, title );

		});
	}

	$.fn.setLocationData = function( location, push ){
		$.consoleDebug( DEBUG, 'from location');
		return this.each( function() {

			var $this = $( this );
			$this.setUrlData( location.pathname, location.hash, location.search, push );
		
		});
	}

	$.fn.setLinkData = function( link, push ){
		$.consoleDebug( DEBUG, 'from link');
		return this.each( function() {

			var $this = $( this );
			$this.setUrlData( $.getCleanUrl( link ), $.getUrlHash( link ), $.getUrlSearch( link ), push );
		
		});
	}

	// *****************************************************
	// *      LOAD CONTENT
	// *****************************************************

	$.fn.getAnchor = function(){
		return ( this.data( 'anchor' ) ? this.data( 'anchor' ) : this.getLink() );
	}

	$.fn.getLink = function(){
		return ( this.attr( 'href' ) ? this.attr( 'href' ) : ( this.data( 'href' ) ? this.data( 'href' ) : '' ) );
	}

	$.getLoading = function( type, args ){
		switch( type ){
			/*case 'progress-bar':
				return $( $.progressBarLoading( args ) );
			break;*/

			case 'icon':
				return $( $.iconLoading( args ) );
			break;

			case 'circle':
				return $( $.circleLoading( args ) );
			break;

			default:
				return $( $.barLoading( args ) );
			break;
		}
	}

	$.fn.ajaxPost = function( url, aj_data, complete, loading, loading_args ){

		if( typeof complete !== 'function' )
			return this;

		var $loading = $.getLoading( loading, loading_args ).appendTo( this ).hide().fadeIn( 'slow' );

		$.ajax({
			url: url,
			type: 'post',
			data: aj_data,
			error: function(jqXHR, exception) {
				var msg = 'Spiacenti, è stato riscontrato un errore.';
	            if (jqXHR.status === 0) {
	                msg = 'Not connect.\n Verify Network.';
	            } else if (jqXHR.status == 404) {
	                msg = 'Requested page not found. [404]';
	            } else if (jqXHR.status == 500) {
	                msg = 'Internal Server Error [500].';
	            } else if (exception === 'parsererror') {
	                msg = 'Requested JSON parse failed.';
	            } else if (exception === 'timeout') {
	                msg = 'Time out error.';
	            } else if (exception === 'abort') {
	                msg = 'Ajax request aborted.';
	            } else {
	                msg = 'Uncaught Error.\n' + jqXHR.responseText;
	            }
	            
				if( typeof complete === 'function' ) complete( '<span class="scm-error error">' + msg + '</span>', exception );
	        },
			success: function( html ) {
				
				$loading.fadeOut( 'slow', function(){
					$loading.remove();
					if( typeof complete === 'function' ) complete( html );
				} );
			}
		});
		
		return this;
	}

	$.fn.loadSingle = function( set_link, back, elem ){

		var $body = $('body');
		var ajaxurl = $body.data( 'ajax' );
		if( !ajaxurl ) return this;
		$body.disableIt();
		
		return this.each( function() {

			var $this = $( this );

			if( !elem )
				$this.addClass('current').siblings().removeClass('current');

			var link = ( set_link ? set_link : $this.getLink() );
				template = ( elem ? elem.template : ( $this.data( 'load-template' ) ? $this.data( 'load-template' ) : '' ) ),
				type = ( elem ? elem.type : ( $this.data( 'post-type' ) ? $this.data( 'post-type' ) : '' ) ),
				id = 'single-' + type;
			
			// Dynamic vars
			var	$container = $( '.post[data-post-type="' + type + '"][data-template="' + template + '"]' ),
				$parent = $container.parent(),
				params = ( $('body').attr( 'data-params' ) ? $('body').attr( 'data-params' ) : '' );				

			if( !$container.length ){
				$body.enableIt();
				var archive = parseInt( $.getUrlParameter( 'archive-' + type, params, 0 ) );
				$.goToLink( link + ( archive ? '?archive-' + type + '=' + archive : '' ), $this.data( 'target' ), $this.data( 'link-type' ) );
				return this;
			}

			var next = ( elem ? elem.id : $this.data( 'id' ) ),
				name = sanitizeTitle( $container.attr( 'data-post-title' ) ? $container.attr( 'data-post-title' ) : '' ),
				current = parseFloat( ( $container.data( 'id' ) ? $container.data( 'id' ) : next ) ),
				resize = ( elem ? elem.resize : ( $this.data( 'load-resize' ) ? $this.data( 'load-resize' ) : '10em' ) ),
				offset = ( elem ? elem.offset : ( $this.data( 'load-offset' ) ? $this.data( 'load-offset' ) : 2 ) ),
				units = ( elem ? elem.units : ( $this.data( 'load-units' ) ? $this.data( 'load-units' ) : 'em' ) ),
				time = ( elem ? elem.time : ( $this.data( 'load-time' ) ? $this.data( 'load-time' ) : .5 ) ),
				c_height = $parent[0].scrollHeight,
				w_height = $( window ).height(),
				replace = false,
				aj_data = {
					action: 'load_single',
					//name: 'single',
					single: next,
					template: template,
					//query_vars: ajaxcall.query_vars,
				},
				replaceContent = function( html ){
					$parent.html( html ).hide();
					
					// Dynamic vars
					$container = $( '.post[data-post-type="' + type + '"][data-template="' + template + '"]' );
					$parent = $container.parent();
					params = ( $('body').attr( 'data-params' ) ? $('body').attr( 'data-params' ) : '' );
					
					$body.trigger( 'loadSingle', [ $parent ] );
					enableContent();
				},
				enableContent = function(){
					
					$body.trigger( 'loadSingleBefore', [ $parent ] );
					
					var title = $container.attr( 'data-post-title' );
					var slug = sanitizeTitle( title );
					if( title ) document.title = title;

					$body
						.removeClass( type + '-' + name )
						.addClass( type + '-' + slug )
						.removeClass( 'postid-' + current )
						.addClass( 'postid-' + next );
					$( 'article.page' )
						.removeClass( name )
						.addClass( slug );
					//$('*[href*="' + name + '"]:not(.page-numbers)').each(function(){
					$('*[href*="' + name + '"]').each(function(){
				        this.href = this.href.replace( name, slug );
				    });
				    $('form[action*="' + name + '"]').each(function(){
				        this.action = this.action.replace( name, slug );
				    });

				    $parent.fadeIn('fast', function(){
				    	var new_height = ( !replace ? $parent[0].scrollHeight : $container.outerHeight() + parseInt( $parent.css('padding-top') ) + parseInt( $parent.css('padding-bottom') ) );
				    	$parent.animate( { 'height': new_height }, ( c_height == new_height ? .1 : 'slow' ), function(){
							$parent.css( 'height', 'auto' ).css( 'overflow', 'visible' );
							if( !back )
								$('body').setUrlData( link, '', params, true, 'single', { 'template':template, 'type':type, 'id':id  } );
							
							if( !replace ){
								$body.trigger( 'loadSingleAfter', [ $parent ] );
							}else{
								$parent.eventsInit( 1, 1, 1, null, 1 );
								$body.enableIt();
							}
						} );
				    } );
					
					
				};

			$body.trigger( 'beforeLoadSingle', [ $parent ] );

			$parent.css( 'overflow', 'hidden' ).css( 'height', c_height );

			if( !CONTENTS[id] ) CONTENTS[id] = { replace: {}, popup: {} };
			CONTENTS[id].replace[current] = $parent.html();
			if( CONTENTS[id].replace[next] ){
				
				replace = true;
				
				$parent.smoothScroll( { delay: 0, offset: offset, units:units, time: time, head: true, complete: function(){
					$container.fadeOut( 'fast', function(){
						replaceContent( CONTENTS[id].replace[next] );
					} );
				}});

			}else{
				
				replace = false;

				$parent.smoothScroll( { delay: 0, offset: offset, units:units, time: time, head: true, complete: function(){

					c_height = $.parsePx(resize);

					$parent.animate({ 'height': c_height }, time*1000 );
					$container.fadeOut( time*1000, function(){
						$parent.ajaxPost( ajaxurl, aj_data, replaceContent, 'bar', { classes: 'absolute middle full-width double' } );
					} );

				}});
			}
			
		});
	}

	$.fn.loadContent = function( set_link, set_id, set_current, set_type, back ){


		var $body = $('body');
		var ajaxurl = $body.data( 'ajax' );
		if( !ajaxurl ) return this;
		$body.disableIt();

		return this.each( function() {

			var link = ( set_link ? set_link : $( this ).getLink() );

			var $this = ( set_id ? $( this ) : $( this ).closest( '[data-load-content]' ) );
			if( !$this.length )
				$this = $( this );

			var id = ( set_id ? set_id : ( $this.data( 'load-content' ) ? $this.data( 'load-content' ) : $this.attr( 'id' ) ) ),
				$container = $( '#' + id );

			if( !$container.length ){
				$body.enableIt();
				return this;
			}

			$body.trigger( 'loadContentBefore', [ $container ] );

			var	c_height = $container.outerHeight(),
				w_height = $( window ).height();

			var	type = ( set_type ? set_type : ( $this.data( 'load-type' ) ? $this.data( 'load-type' ) : 'replace' ) ),
				$parent = $container.wrap( '<div class="load-' + type + ' relative inline-block"></div>' ).parent();

			var	current = parseFloat( set_current ? set_current : ( $this.data( 'load-current' ) ? $this.data( 'load-current' ) : 1 ) ),
				next = $.getUrlParameter( id, link, 0 );

			var aj_data = {
				action: 'load_archive',
				//name: id,
				archive: ARCHIVES[id],
				//query_vars: ajaxcall.query_vars,
			};

			if( next ) aj_data[id] = next;

			var enableContent = function(){
				$body.trigger( 'loadContentBefore', [ $container ] );
				var new_height = $container.outerHeight();
				$parent.animate( { 'height' :new_height }, ( c_height == new_height ? .1 : 'slow' ), function(){
					$parent.css( 'height', 'auto' ).css( 'overflow', 'visible' );
					$container.unwrap();
					$body.enableIt();
					$body.trigger( 'loadContentAfter', [ $container ] );
					if( !back ){
						$('body').setUrlData( window.location.pathname, window.location.hash, $.replaceUrlParameter( id, next, ( $('body').attr( 'data-params' ) ? $('body').attr( 'data-params' ) : '' ) ), false, 'load' );
					}
				} );
			}

			var replaceContent = function( html, err ){
				$container.hide().html( html ).eventsInit( 1, 1, 1, null, 1 );
				$body.trigger( 'loadContent', [ $container ] );
				$container.fadeIn('fast', enableContent );
			}

			var moreContent = function( html, err ){
				$children = $( html ).hide();
				$first = $children.first();
				$container.append( $children ).eventsInit( 1, 1, 1, null, 1 );
				$children.fadeIn( 'fast' );
				$children.not( '.scm-pagination' ).last().addClass( 'last' );
				$first.smoothScroll( { complete: true } );
				enableContent();
			}

			if( !CONTENTS[id] )
				CONTENTS[id] = { replace: {}, popup: {} };

			$parent.css( 'overflow', 'hidden' ).css( 'height', c_height );

			switch( type ){
				case 'replace':

					CONTENTS[id].replace[current] = $container.html();

					$container.smoothScroll( { offset: 1, units:'em', head: true, complete: true } ).fadeOut('fast', function(){

						if( CONTENTS[id].replace[next] ){
							replaceContent( CONTENTS[id].replace[next] );

						}else{

							$container.html( '' );
							$container.show();
							if( c_height > w_height )
								$parent.animate({ 'height': w_height - $.getStickyHeight() }, 'fast' );

							$parent.ajaxPost( ajaxurl, aj_data, replaceContent, 'bar', { classes: 'absolute middle full-width double' } );
						}
					});
				break;

				case 'more':

					back = true;
					
					$container.children().last().fadeOut( 'fast', function(){
						this.remove();
						$last = $container.children().last();
						$last.removeClass( 'last' );
						aj_data[id + '-more'] = { counter: $last.data( 'counter' ), current: $last.data( 'current' ), total: $last.data( 'total' ), odd: $last.data( 'odd' ) };

						$parent.ajaxPost( ajaxurl, aj_data, moreContent, 'bar', { classes: 'relative full-width double' } );
					} );
					

				break;
			}
		});
	}

// *****************************************************
// *      NAVIGATION UTILITIES
// *****************************************************

	// *****************************************************
	// *      GO TO LINK
	// *****************************************************

	$.goToLink = function( link, target, state ){

		$.consoleDebug( DEBUG, '-----------');
		$.consoleDebug( DEBUG, 'goToLink:');

		if( !link ){
			$.consoleDebug( DEBUG, 'no link provided');
			$.bodyIn();
			return;
		}

		$.consoleDebug( DEBUG, link);
		$.consoleDebug( DEBUG, 'target: ' + target);

		if( state == 'mail' ){
			window.location = $.decodeEmail( link );
			return;
		}

		target = ( target ? target : ( state == 'site' || state == 'single' || state == 'load' ? '_self' : '_blank' ) );

		if( target != '_blank' ){

			$.consoleDebug( DEBUG, 'loading same page');

			window.location = link;
			return;

		}else{

			$.consoleDebug( DEBUG, 'opening new page');

			window.open( link, 'See You!' );
			return;

		}

		$.consoleDebug( DEBUG, 'fallback');
		
		$.bodyIn();
		return;
	}

	// *****************************************************
	// *      PAGE ENTER
	// *****************************************************

	$.bodyIn = function(){

		$.consoleDebug( DEBUG, '-----------');

		var $body 			= $( 'body' ),
			$html 			= $( 'html' ),
			$navigation 	= $( '.navigation' ),
			opacity 		= parseFloat( $body.data( 'fade-opacity' ) ? $body.data( 'fade-opacity' ) : 0 ) / 10,
			duration 		= parseFloat( $body.data( 'fade-in' ) ? $body.data( 'fade-in' ) : 0 ),
			delay 			= parseFloat( $body.data( 'smooth-new' ) ? $body.data( 'smooth-new' ) : 0 ),
			page 			= ( $body.data( 'smooth-page' ) ? $body.data( 'smooth-page' ) : false ),
			anchor 			= ( $body.data( 'anchor' ) ? $body.data( 'anchor' ) : '' ),
			$anchor 		= $( anchor );

		if( $body.hasClass( 'bodyin' ) ) return;

		$body.addClass( 'bodyin' );
		$body.removeClass( 'bodyout' );
		$body.css( 'opacity', opacity );
		//$navigation.css( 'opacity', 1 );		

		var scroll	= function(){

			if( page && $anchor.length ){
				$.consoleDebug( DEBUG, 'scroll to anchor');
				$anchor.smoothScroll( { delay: delay } );
			}else{
				$body.enableIt();
			}
    	};

    	if( !page && $anchor.length ){

			$.consoleDebug( DEBUG, 'jump to anchor');
			$anchor.smoothScroll( { delay: delay, time: 0 } );
		}

    	if( duration ){
    		$.consoleDebug( DEBUG, 'bodyIn: with animation');
        	$body.animate( {
        		opacity: 1
        	}, duration * 1000, scroll );

        }else{
        	$.consoleDebug( DEBUG, 'bodyIn: without animation');
        	$body.css( 'opacity', 1 );
        	scroll();
        }
	}

	// *****************************************************
	// *      PAGE EXIT
	// *****************************************************

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

// *****************************************************
// *      PLUGINS
// *****************************************************

	// *****************************************************
	// *      ENABLE/DISABLE
	// *****************************************************

	$.fn.enableIt = function( event ){

		$.consoleDebug( DEBUG, '[' + this[0].localName + '] ENABLED');

		return this.each(function() {

		    var $this = $( this );

		    $this.removeClass( 'disabled' );
		    $this.addClass( 'enabled' );
		    $this.trigger( 'enabled' );

		});
	}

	$.fn.disableIt = function( event ){

		$.consoleDebug( DEBUG, '[' + this[0].localName + '] DISABLED');

		return this.each(function() {

		    var $this = $( this );

		    $this.addClass( 'disabled' );
			$this.removeClass( 'enabled' );
			$this.trigger( 'disabled' );

		});
	}

	// *****************************************************
	// *      SMOOTH SCROLL
	// *****************************************************

	$.scrollTo = function( destination, duration, ease, delay, complete ){

		var $body = $( 'body' );
		var $html = $( 'html' );

		$body.disableIt();
		var ended = function() {
			$html.add($body).off('scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove');
			if( typeof complete === 'function' )
				complete();
			else if( !complete )
				$body.enableIt();
		}
		var scroll = function(){

			if( duration ){
				$html.add($body).on('scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove', function(){
			       $html.add($body).stop();
			       ended();
				});
				$html.animate( {
					scrollTop: parseFloat( destination )
				}, parseFloat( duration ), ease );
				$body.animate( {
					scrollTop: parseFloat( destination )
				}, parseFloat( duration ), ease, ended);
			}else{
				$html.scrollTop( parseFloat( destination ) );
				$body.scrollTop( parseFloat( destination ) );
				ended();
			}
		}

		if( delay )
			setTimeout( scroll, delay*1000 );
		else
			scroll();
	}

	$.getSmoothData = function() {
		var $body = $( 'body' );
		var args = {
			time : 		parseFloat( $body.data( 'smooth-duration' ) ? $body.data( 'smooth-duration' ) : 0 ),
			delay : 	parseFloat( $body.data( 'smooth-delay' ) ? $body.data( 'smooth-delay' ) : 0 ),
			offset : 	parseFloat( $body.data( 'smooth-offset' ) ? $body.data( 'smooth-offset' ) : 0 ),
			head : 		$body.data( 'smooth-head' ) ? $body.data( 'smooth-head' ) : 0,
			units : 	( $body.data( 'smooth-offset-units' ) ? $body.data( 'smooth-offset-units' ) : 'px' ),
			ease : 		( $body.data( 'smooth-ease' ) ? $body.data( 'smooth-ease' ) : 'swing' ),
		}

		return args;

	}

	$.getSmoothDestination = function( obj, off, uni, head ) {

		if( obj.is( 'body' ) ) return 0;

		var win 			= $( window ).height(),
			body 			= $( 'body' ).height(),
			height 			= obj.offset().top,
			offset 			= parseFloat( off ),
			head 			= ( head ? $.getStickyHeight() : 0 ),
			units 			= ( uni ? uni : 'px' ),
			destination 	= 0;
		
		if( units == 'em' )
			offset = $.EmToPx( offset )

		destination = height - offset - head;
		/*if( obj.hasClass('has-fade') && !obj.hasClass('current-fade') )
			destination -= $.EmToPx( 3 )*/ // vincolato a css

		if( body - destination < win )
			destination = body - win;

		return destination;
	}

	$.fn.smoothAnchor = function( anc, args ) {

		$.consoleDebug( DEBUG, '- smoothAnchor' );

		var $body = $( 'body' );
		
		return this.each(function(){

			var $this 			= $( this ),
				anchor 			= $.getUrlHash( anc ? anc : ( $this.data( 'anchor' ) ? $this.data( 'anchor' ) : ( $this.data( 'href' ) ? $this.data( 'href' ) : ( $this.attr( 'href' ) ? $this.attr( 'href' ) : ( $this.attr( 'id' ) ? '#' + $this.attr( 'id' ) : '' ) ) ) ) ),
				$target 		= ( !anchor || anchor == '#' ? $this : $( anchor ) );

			if( !$body.hasClass( 'loaded' ) )
				$body.attr( 'data-premature-action', 'true' );

			if( $target.length )
				$target.smoothScroll( args );
			else
				$body.smoothScroll( args );
		});
	}

	$.fn.smoothScroll = function( args ) {

		$.consoleDebug( DEBUG, '- smoothScroll' );

		var $body = $( 'body' );

		var a = $.extend(
			{ time:1, delay:0.1, offset:0, head:0, units:'px', ease:'swing', complete:false },
			$.getSmoothData(),
			args
		);
		
		return this.each(function(){

			var $this 			= $( this ),

				time 			= a.time,
				offset 			= a.offset,
				units 			= a.units,
				head 			= a.head,
				ease 			= a.ease,
				delay 			= a.delay,
				complete 		= a.complete,

				position 		= $( document ).scrollTop(),
				destination 	= 0,
				difference 		= 0,
				duration 		= 0;

			destination = $.getSmoothDestination( $this, offset, units, head );
			difference = Math.abs( destination - position );
			duration = Math.max( time * Math.min( difference, 6000 ), 500 );

			if( !difference )
				$body.enableIt();
			else
				$.scrollTo( destination, ( !time ? 0 : duration ), ease, delay, complete );

			return this;

		} );
	}

	// *****************************************************
	// *      CURRENT LINK CLASS ( PERSONALE - PROVA A VEDERE DI NUOVO SE RIESCI A PASSARE DA MAGIC SCROLL, COME currentView() )
	// *****************************************************

	$.fn.currentLink = function( event, state ){

		return this.each(function() {

			/*var $elem 			= $( this ),
				elem 			= this,
				$body 			= $( 'body' ),
				currentClass 	= $elem.data( 'current-link' ),
	            offset 			= ( $elem.data( 'current-link-offset' ) ? $elem.data( 'current-link-offset' ) : 0 ),
	            units 			= ( $elem.data( 'current-link-offset-units' ) ? $elem.data( 'current-link-offset-units' ) : 'px' ),
	            threshold 		= ( $elem.data( 'current-link-threshold' ) ? $elem.data( 'current-link-threshold' ) : 0 ),
	            interval 		= ( $elem.data( 'current-link-interval' ) ? $elem.data( 'current-link-interval' ) : 250 ),
	            filter 			= ( $elem.data( 'current-link-filter' ) ? $elem.data( 'current-link-filter' ) : '' ),
	            $links 			= $elem.find( '[data-anchor]' ).filter( ':not([data-anchor="#top"])' ),
	            $last 			= $( '.page > .section.last' ).attr( 'id' ),
	            $lasts 			= ( $last && $last.length ? $links.filter('[data-anchor="#' + $last + '"]') : $links ),
	            anchors 		= '',
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

            for (var i = 0; i < $links.length; i++) {
            	var link = $( $links[i] );
            	anchors = anchors + link.attr('data-anchor');
            	if( i < $links.length - 1 )
            		anchors = anchors + ', ';
            }

            $anchors = $( anchors );

            $anchors.each(function() {

                var $anchor = $( this );
                var $link = $links.filter('[data-anchor="#' + $anchor.attr('id') + '"]').parent();

                new $.ScrollMagic.Scene({
		        	triggerElement: $anchor,
			        duration: function(e){ return Math.round( $anchor.outerHeight() ); },
			    })
			    .setClassToggle( $link, currentClass)
				.addIndicators()
			    .addTo( $MAGIC );

            });*/

	        var $elem 			= $( this ),
				elem 			= this,
				$body 			= $( 'body' ),
				currentClass 	= $elem.data( 'current-link' ),
	            offset 			= parseFloat( $elem.data( 'current-link-offset' ) ? $elem.data( 'current-link-offset' ) : 0 ),
	            units 			= ( $elem.data( 'current-link-offset-units' ) ? $elem.data( 'current-link-offset-units' ) : 'px' ),
	            threshold 		= parseFloat( $elem.data( 'current-link-threshold' ) ? $elem.data( 'current-link-threshold' ) : 0 ),
	            interval 		= parseFloat( $elem.data( 'current-link-interval' ) ? $elem.data( 'current-link-interval' ) : 250 ),
	            filter 			= ( $elem.data( 'current-link-filter' ) ? $elem.data( 'current-link-filter' ) : '' ),
	            $links 			= $elem.find( '[data-anchor]' ).not( '[data-anchor="#top"], [data-anchor="#"]' ),
	            $last 			= $( '.page > .section.last' ).attr( 'id' ),
	            $lasts 			= ( $last && $last.length ? $links.filter('[data-anchor="#' + $last + '"]') : $links ),
	            anchors 		= '',
	            $anchors 		= [],
	            didScroll 		= true,
	            timer 			= null;

	        if ( units == 'em' )
	        	offset = $.EmToPx( offset )

            if ( filter )
                $links = $links.filter( filter );

            if( !$links.length )
                return this;

            for (var i = 0; i < $links.length; i++) {
            	var link = $( $links[i] );
            	anchors = anchors + link.attr('data-anchor');
            	if( i < $links.length - 1 )
            		anchors = anchors + ', ';
            }

            $anchors = $( anchors );
			        
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

	            var $win 		= $( window ),
	            	heightWin 	= $win.height(),
	            	heightBody 	= $( 'body' ).outerHeight(),
	            	scrollPos 	= $win.scrollTop(),
	            	pageEnd 	= scrollPos + heightWin >= heightBody,
	            	current 	= '',
	            	off 		= $.getStickyHeight() + offset;

	            if ( pageEnd && $last && $last.length ){
	            	
	            	$links.parent().removeClass( currentClass );
	                $lasts.parent().addClass( currentClass );
	            
	            }else{

		            for( var i = 0; i < $anchors.length; i++ ) {

		                var $anchor = $( $anchors[i] );
		                

		                var coords = {
		                    top: Math.round( $anchor.offset().top ) - off,
		                    bottom: Math.round( $anchor.offset().top + $anchor.outerHeight() ) - off
		                };

		                var $link = $links.filter('[data-anchor="#' + $anchor.attr('id') + '"]').parent();
		                var active = scrollPos >= coords.top - threshold && scrollPos < coords.bottom - threshold;
						
		                if ( active ){
			                $link.addClass( currentClass );
		                }else{
							$link.removeClass( currentClass );
						}
		            }
		        }	            
	        }

	        didScroll = true;
            setTimer();
			    
		});
	}

	// *****************************************************
	// *      CURRENT SECTION CLASS
	// *****************************************************

	$.fn.currentView = function( offset ){

		return this.each(function() {

			var $this = $( this );

			if( $this.attr( 'data-magic' ) ) return this;
			$this.attr( 'data-magic', 1 );

	        new $.ScrollMagic.Scene({
	        	triggerElement: $this,
		        duration: function(){ return Math.round( $this.outerHeight() ); },
		    })
		    .setClassToggle( $this, 'current-view-act')
			//.addIndicators()
		    .addTo( $MAGIC );

		    new $.ScrollMagic.Scene({
	        	triggerElement: $this,
		        duration: function(){ return $( window ).height() + Math.round( $this.outerHeight() ); },
		        triggerHook: 1,
		    })
			.setClassToggle( $this, 'current-view')
			.on( 'enter', function(e){
		    	if( e.type == 'enter' && e.scrollDirection == 'FORWARD' )
		    		$this.addClass( 'current-fade' )
		    	else if( e.type == 'exit' && e.scrollDirection == 'REVERSE' )
		    		$this.removeClass( 'current-fade' );
		    } )
			//.addIndicators()
		    .addTo( $MAGIC );
			    
		});
	}

	// *****************************************************
	// *      FADE CONTENT
	// *****************************************************

	$.fn.fadeContent = function(off,aff){

		return this.each(function() {

			var $this 	= $( this ),
				$cont = $this.find( $this.attr( 'data-content-fade' ) ),
				offset = parseFloat( ( $this.attr( 'data-content-fade-offset' ) ? $this.attr( 'data-content-fade-offset' ) : 1 )*.01 );

			if( $this.attr( 'data-magic' ) ) return this;
			$this.attr( 'data-magic', 1 );

			if( !$cont.length )
				return this;

			for (var i = 0; i < $cont.length; i++) {
				
				$content = $( $cont[i] ).addClass( 'has-fade' );

				new $.ScrollMagic.Scene({
		        	triggerElement: $content,
			        triggerHook: offset,
			    })
				.setClassToggle( $content, 'current-fade')
				//.addIndicators()
			    .addTo( $MAGIC );
			};			

		});
	}

	// *****************************************************
	// *      TOGGLE
	// *****************************************************

	$.fn.toggleSwipe = function() {
		
		return this.each(function() {

			var $this = $( this );

			if( $this.attr( 'data-toggle' ) == "true" ){

				$this.swipe( {				

			        swipeDown: function( e, direction, distance, duration, fingerCount ) {

			        	var $elem = $( this );
			        	if( $elem.hasClass( 'toggle' ) ? 1 : $elem.parents( 'toggle' ).length ){
			        		e.stopPropagation();
		        			$elem.toggledOn();
		        		}
			        },

			        swipeUp: function( e, direction, distance, duration, fingerCount ) {

			        	var $elem = $( this );
			        	if(  $elem.hasClass( 'toggle' ) ? 1 : $elem.parents( 'toggle' ).length ){
			        		e.stopPropagation();
		        			$elem.toggledOff();
		        		}
			        },

			        threshold: 10,
			        excludedElements: '',
			    });

			    $.consoleDebug( DEBUG, '-- swipe event');
			}
		});
	}

	$.fn.toggledIt = function( event ) {
		
		event.stopPropagation();

		console.log('toggle');

		return this.each(function() {

			var $this = $( this );
			if( !$this.hasClass( 'toggle' ) )
	        	$this = $( this ).parents( '.toggle' );

			if( !$this.hasClass( 'toggled' ) )
				return $this.toggledOn();
			else
				return $this.toggledOff();

		});
	}

	$.fn.toggledOn = function() {

		return this.each(function() {

			var $this = $( this );

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

	$.fn.toggledOff = function() {

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

				if( act.indexOf( data ) >= 0 ){
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
	// *      DETAILS OVERLAY
	// *****************************************************

	$.fn.showDetails = function( id, content ){
		$('body').addClass( 'disabled' );
		this.children().hide();
		var $content = $( '#' + id );
		if( !$content.length )
			$content = ( $.isFunction( content ) ? content().appendTo( this ) : '' );
		else
			$content.show();
		
		this.attr( 'data-content', '#' + id );
		this.addClass( 'opened' );
		this.show();
		
	}
	$.fn.hideDetails = function(){
		this.hide();
		this.attr( 'data-content', '' );
		this.removeClass( 'opened' );
		$('body').removeClass( 'disabled' );
	}
	$.newDetails = function( cls, close, show ){
		
		cls = ( !cls ? '' : ' ' + cls );

		var $details = $( '<div class="details' + cls + '" data-content></div>' );

		if( !show )
			$details.hide();

		if( close ){
			$details.on( 'click', function(e){
				if( $( e.target ).hasClass( 'details' ) ){
					$details.hideDetails();
				}
			} );
		}

		return $details;
	}

	// *****************************************************
	// *      AFFIX IT
	// *****************************************************

	$.getStickyHeight = function( off ){
		return $( '#site-navigation-sticky' ).getHighest() + $( '#site-header.sticky' ).getHighest() - ( off ? off : 1 );
	}

	$.fn.affixIt = function(off,tri,sel){

		return this.each(function() {

			var $this 	= $( this ),
				trig 	= ( tri ? tri : ( $this.attr( 'data-affix' ) ? $this.attr( 'data-affix' ) : 'top' ) ),
				selector 	= ( sel ? sel : ( $this.attr( 'data-affix-selector' ) ? $this.attr( 'data-affix-selector' ) : null ) ),
				offset 	= ( off ? off : ( $this.attr( 'data-affix-offset' ) ? $this.attr( 'data-affix-offset' ) : 0 ) );

			if( $this.attr( 'data-magic' ) ) return this;
			$this.attr( 'data-magic', 1 );

			new $.ScrollMagic.Scene({
				triggerElement: selector,
		        triggerHook: ( trig == 'bottom' ? 1 : ( trig == 'middle' || trig == 'center' ? .5 : ( trig == 'top' ? 0 : parseFloat( trig ) ) ) ),
		        offset: offset,
		    })
		    .setClassToggle( $this, 'affix')
			//.addIndicators()
		    .addTo( $MAGIC );

		});
	}
	
	$.fn.stickyMenu = function(){

		return this.each(function() {

			var $this 			= $( this ),
				sticky 			= $this.data('sticky-type'),
				attach 			= $this.data('sticky-attach'),
				offset 			= parseFloat( $this.data('sticky-offset') ),
				anim 			= $this.data('sticky-anim'),
				menu 			= $this.data('sticky'),
				$menu 			= $( '#' + menu ).addClass( sticky ),
				$trig 			= ( sticky != 'plus' ? $menu : ( attach == 'nav-bottom' ? $this.findNext() : ( attach == 'nav-top' ? $menu : null ) ) );

			if( !$menu.length ) return;

			if( sticky == 'plus' ){
				
				var sh = $this.getBoxShadow();
				switch( anim ){
					case 'opacity':
						$this.css( 'opacity', 0 );
					break;
					case 'left':
						$this.css( 'left', -( $this.outerWidth() + parseFloat(sh.x) + parseFloat(sh.blur) + parseFloat(sh.exp) ) );
					break;
					case 'right':
						$this.css( 'right', -( $this.outerWidth() + parseFloat(sh.x) + parseFloat(sh.blur) + parseFloat(sh.exp) ) );
					break;
					default:
						$this.css( 'top', -( $this.outerHeight() + parseFloat(sh.y) + parseFloat(sh.blur) + parseFloat(sh.exp) ) );
				}
			}

			$this.affixIt( offset, 0, $trig );

		});
	}

	// *****************************************************
	// *      ADD TO CALENDAR
	// *****************************************************

	$.fn.AddToCalendar = function( init ){
		if( !window.ifaddtocalendar ) return this;
		
		this.find( '.disabled' ).removeClass( 'disabled' );
		if( !init ){
			$('.atcb-list').remove();
			addtocalendar.load();
		}

	}

	// *****************************************************
	// *      GOOGLE MAPS
	// *****************************************************

	$.fn.googleMap = function() {

		if( !window.ifgooglemaps ) return this;

		var $body = $( 'body' );
		var countMaps = 0;
		var totMaps = this.length;

		return this.each(function() {

			var $this 		= $( this ),
				markers 	= $this.children( '.marker' ).clone(),
				zoom 		= parseFloat( $this.data( 'zoom' ) ),
				infowidth 	= parseInt( $this.data( 'infowidth' ) ? $this.data( 'infowidth' ) : 0 ),
				color 		= ( $this.data( 'icon-color' ) ? $this.data( 'icon-color' ) : '' ),
				style 		= [],
				args 		= [],
				map 		= [],
				infowindow  = '',
				drag_cont	= ( $this.data( 'control-drag' ) != undefined ? $this.data( 'control-drag' ) : true ),
				zoom_cont	= ( $this.data( 'control-zoom' ) != undefined ? $this.data( 'control-zoom' ) : true ),
				street_cont	= ( $this.data( 'control-streetview' ) != undefined ? $this.data( 'control-streetview' ) : true );

			if( $this.attr( 'data-mapped' ) ){
				$this.empty();
			}else{
				$this.attr( 'data-mapped', 1 );
			}

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
					featureType: 'landscape.natural',
					elementType: 'labels',
					stylers: [
						{ visibility: 'off' }
					]
				},
				{
					featureType: 'landscape.natural.terrain',
					elementType: 'all',
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
					elementType: 'all',
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
				{
					featureType: 'water',
					elementType: 'all',
					stylers: [
						{ lightness: 50 },
					]
				},
	        ];

	        args = {
	        	center: new google.maps.LatLng(0, 0),
				zoom: zoom,
				disableDefaultUI: true,
				draggableCursor 		: 'crosshair',
			    draggingCursor  		: 'crosshair',
			    styles                	: style,
			    draggable 			  	: drag_cont,
			    panControl            	: false,
			    zoomControl           	: zoom_cont,
			    mapTypeControl        	: false,
			    scaleControl          	: false,
			    streetViewControl     	: street_cont,
			    overviewMapControl    	: true,
			    rotateControl         	: true,
			    scrollwheel           	: false,
			    zoomControlOptions    	: {
			        style    				: google.maps.ZoomControlStyle.SMALL,
			        position 				: google.maps.ControlPosition.LEFT_CENTER
			      },							
	        };
			map = new google.maps.Map( this, args );
			$this.append( markers );

			if( infowidth !== 0 ){
				infowidth = infowidth ? infowidth : 500;
				infowindow = new google.maps.InfoWindow({
					content		: '',
					maxWidth	: infowidth
				});
			}

			map.markers = [];
			
			markers.markerMap( map, infowindow, zoom, countMaps );

			var markerCluster = new MarkerClusterer(map, map.markers, {
				imagePath: '',
				//imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
				gridSize: 50,
				styles: [
					{
						url: '',
						textColor: ( color ? color : '#000000' ),
						textSize: 24,
						width: 35,
						height: 35,

					},
					{
						url: '',
						textColor: ( color ? color : '#000000' ),
						textSize: 32,
						width: 50,
						height: 50,

					},
					{
						url: '',
						textColor: ( color ? color : '#000000' ),
						textSize: 40,
						width: 70,
						height: 70,

					}
				]
			});

			//$.centerMap( map, zoom );
			
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
				address 		= $this.data( 'address' );

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
			        	$this.setMarker(map, infowindow, latlng, count, zoom);
			    	}else{
			    		$.consoleDebug( DEBUG,  'Google Maps Marker: ' + status);
			    		if( reg ){
			    			$.consoleDebug( DEBUG,  'Pointing to lat 0 and lng 0');
				    		latlng = new google.maps.LatLng( 0, 0 );
				    		$this.setMarker(map, infowindow, latlng, count, zoom);
				    	}else{
				    		$.consoleDebug( DEBUG,  'Searching address within IT Region');
				    		$this.markerMap( map, infowindow, zoom, count, 'it' );
				    	}
			    	}

			    });
			}else if( lat ){
				latlng = new google.maps.LatLng( lat, lng );
				$this.setMarker(map, infowindow, latlng, count, zoom);
			}else{
				latlng = new google.maps.LatLng( 0, 0 );
				$this.setMarker(map, infowindow, latlng, count, zoom);
			}
		});
	}

	$.centerMap = function( map, zoom ) {

		var bounds = new google.maps.LatLngBounds();

		$.each( map.markers, function( i, marker ){

			var latlng = new google.maps.LatLng( marker.position.lat(), marker.position.lng() );
			bounds.extend( latlng );

		});

		if( map.markers.length == 1 ){

		    map.setCenter( bounds.getCenter() );
		    map.setZoom( zoom );

		}else{

			/*google.maps.event.addListener(map, 'zoom_changed', function() {
			    zoomChangeBoundsListener = 
			        google.maps.event.addListener(map, 'bounds_changed', function( event ) {

			            if ( this.getZoom() > zoom && this.initialZoom == true ) {
			                // Change max/min zoom here
			                this.setZoom( zoom );
			                this.initialZoom = false;
			            }

			        google.maps.event.removeListener( zoomChangeBoundsListener );

			    });
			});*/

			map.initialZoom = true;
			map.fitBounds( bounds );
			map.setZoom( zoom );

		}
	}

	$.fn.focusMarker = function( marker ){
		this.smoothAnchor();
	    google.maps.event.trigger( marker, 'click' );
	    return this;
	}

	$.fn.setMarker = function( map, infowindow, latlng, count, zoom){

		return this.each(function() {

			var $this 			= $( this ),
				marker_img 		= $this.data( 'img' ),
				marker_color	= $this.data( 'icon-color' ),
				marker_icon		= ( $this.data( 'icon' ) && !marker_img ? '<i class="fa ' + $this.data( 'icon' ) + '"' + ( marker_color ? ' style="color:' + marker_color + ';"' : '' ) + '></i>' : '' ),
				classes 		= $this.attr('class') + ' ',
				id 				= classes.substr( classes.indexOf( 'scm-marker marker marker-' ) + 25, classes.substr( 25 ).indexOf( ' ' ) ),
				$map 			= $( '#map-' + count );
			
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

			var marker = new MarkerWithLabel({
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

			var $location = $activator = $('[data-id="' + id + '"]');
			var $action = ( $location.data('open-marker') ? $location.data('open-marker') : false );

			if( $action == false ){
				$activator = $location.children( '[data-open-marker]' );
				if( $activator.length ){
					$action = $activator.data('open-marker');
				}else{
					$action = [];
				}
			}

			if( $this.html() ){

				with( { mark: marker, location: $location, info: infowindow } ){

					google.maps.event.addListener( mark, 'click', function(e) {
						if( info ){
							info.close();
							info.setContent( $this.html() );
							info.open( map, marker );
							$map.eventsInit(1,1);
							$( '.onmap' ).removeClass( 'infowindow' );
							if( location.hasClass( 'onmap' ) )
								location.addClass( 'infowindow' );
						}
					});

				}

				if( $action ){

					$activator.css( 'cursor', 'pointer' );
					$location.addClass( 'onmap' );

					switch( $action ){
						case 'over':

							$activator.mouseenter(function () {
								$map.focusMarker( marker );
							});

						break;

						default:

							$activator.click(function () {
								$map.focusMarker( marker );
							});

						break;
					}
				}
			}

			$.centerMap( map, zoom );

		});
	}
	
	// *****************************************************
	// *      SLIDER
	// *****************************************************

	// +++ todo: passare data a figli (animazioni caption, più livelli, ecc)
	// queste 2 funzioni vengono riviste

	$.fn.captionMoveIn = function( state, slider, speed ){	

		//var $slider = $( slider );
		var $slider = slider;
		
		$slider.disableIt();
		//$slider.css( 'pointer-events', 'none' );

		return this.each( function() {

			var $this = $( this ),
				from = $this.parent().outerWidth();

			$this.css( { left: '100%', opacity: 1 } );
				
				$this.animate({

					'left': '0%'

				}, speed, function(){
					$slider.enableIt();
				} );

		});
	}

	$.fn.captionMoveOut = function( state, slider, speed ){

		//var $slider = $( slider );
		var $slider = slider;

		//$slider.css( 'pointer-events', 'none' );
		$slider.disableIt();
	
		return this.each( function() {

			var $this = $( this ),
				to = - $this.parent().outerWidth();

			$this.css( { left: '0%', opacity: 1 } );

			$this.animate({

				'left': '-200%'

			}, speed, function(){
			} );

		});
	}

	$.fn.initSlider = function() {

		return this.each( function() {

			var slides = $( this ).find( '.slide-image' );

			if( slides.length ){

				slides.css( 'display', 'none' );
				$( slides[0] ).css( 'display', 'inline-block' );

			}

		});
	}

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

			    	$this.find( '.nivo-caption' ).captionMoveOut( 'before', $this, $this.data( 'slider-speed' ) );

			    },
			    afterChange: function( e ){        						// Triggers after a slide transition

			    	$this.find( '.nivo-caption' ).captionMoveIn( 'after', $this, $this.data( 'slider-speed' ) );

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
			    	$this.find( '.nivo-caption' ).addClass( 'responsive float-center box' ).captionMoveIn( 'load', $this, $this.data( 'slider-speed' ) );
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
				popup 			= ( $this.data( 'popup' ) ? $this.data( 'popup' ) : '' ),
				id 				= $this.parent().attr('id');

				if( !popup  || !popup.length )
					return;

			var len 			= popup.length,
				path 			= ( $this.data( 'popup-path' ) ? $this.data( 'popup-path' ) : '' ),
				init 			= ( $this.data( 'popup-init' ) ? $this.data( 'popup-init' ) : 0 ),
				title 			= ( $this.data( 'popup-title' ) ? $this.data( 'popup-title' ) : '' ),
				type 			= ( $this.data( 'popup-type' ) ? $this.data( 'popup-type' ) : 'image' ),
				template 		= ( $this.data( 'popup-template' ) ? $this.data( 'popup-template' ) : '' );
				//content 		= ( $this.data( 'popup-content' ) ? $this.data( 'popup-content' ) : '' );
				
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
				margin 			= [ extra + space, extra, extra + space, extra ],
				dynamic 		= false;

			$this.disableIt();

			for ( i = 0; i < len; i++ ) {

				if( type == 'video' ){

					images.push( '<iframe width="854" height="510" src="' + popup[i] + '" frameborder="0" allowfullscreen></iframe>' );

				}else if( type == 'load' ){

					images.push( '<div class="dynamic"></div>' );
					$this.enableIt();
					dynamic = true;

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

			$this.click( function(e) {

				if( e[ADVANCED] ) return;

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
				   		openSpeed: 150,
				   		closeSpeed: 350,
				   		nextSpeed: 600,
				   		prevSpeed: 600,

				   		keys: {
				   			play   : false,
							toggle : false,
				   		},
				   		
				   		helpers: {
			    			overlay: {
			    				css : {
					                'background-color' : 'rgba(0, 0, 0, .85)',
					                'background-image' : 'none',
					            },
					            closeClick:false,
		                        speedOut:50,
		                        //showEarly:true
			    			},
			    			title: { type: data },
				   		},
				   		tpl: {
				   			wrap 	 : '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
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
							var $wrap = $( '.fancybox-wrap' );//.remove().prependTo( $over );

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
							//$( '.fancybox-wrap' ).bind("contextmenu", function (e) { return false; });

							if( dynamic ){

								var $wrap = $( '.fancybox-wrap' );
								var $dynamic = $wrap.find( '.dynamic' );
								
								var postid = parseInt(popup[0]);
								var posttemp = parseInt(template);

								if( !CONTENTS[id] )
									CONTENTS[id] = { replace: {}, popup: {} };

								if( CONTENTS[id].popup[postid] ){
									$dynamic.find('.scm-loading').fadeOut( 'fast', function(){ $(this).remove() } );
									$( CONTENTS[id].popup[postid] ).appendTo( $dynamic ).eventsInit(1, 1, 1).focus().css( 'opacity', 0 ).animate( { opacity: 1 }, 500 );
								}else{
									var ajaxurl = $('body').data( 'ajax' );
									if( !ajaxurl ) return this;
									var aj_data = {
										action: 'load_single',
										//name: id,
										single: postid,
										template: posttemp,
										//query_vars: ajaxcall.query_vars,
									};

									$wrap.ajaxPost( ajaxurl, aj_data, function ( html ) {
										CONTENTS[id].popup[postid] = html;
										$(html).appendTo( $dynamic ).eventsInit(1, 1, 1).focus().css( 'opacity', 0 ).animate( { opacity: 1 }, 500 );
									}, 'icon', { classes: 'absolute middle triple' } );

								}
							}else{
								$( '.fancybox-wrap' ).bind("contextmenu", function (e) { return false; });
							}

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
	}

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