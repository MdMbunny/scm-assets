/*
*****************************************************
*
*	1.0 PLUGINS
*	2.0 FUNCTIONS
*	3.0 PRESETS
*
*****************************************************
*/


(function($) {

/*
*****************************************************
*	1.0 PLUGINS
*****************************************************
*/

	if ( !$.fn.style ) {
	
		// For those who need them (< IE 9), add support for CSS functions
		var isStyleFuncSupported = !!CSSStyleDeclaration.prototype.getPropertyValue;
		if (!isStyleFuncSupported) {

			CSSStyleDeclaration.prototype.getPropertyValue = function(a) {
				return this.getAttribute(a);
			};
		
			CSSStyleDeclaration.prototype.setProperty = function(styleName, value, priority) {
				this.setAttribute(styleName, value);
				var priority = typeof priority != 'undefined' ? priority : '';
				if (priority != '') {
					// Add priority manually
					var rule = new RegExp($.escapeBS(styleName) + '\\s*:\\s*' + $.escapeBS(value) +
					'(\\s*;)?', 'gmi');
					this.cssText =
					this.cssText.replace(rule, styleName + ': ' + value + ' !' + priority + ';');
				}
			};
			
			CSSStyleDeclaration.prototype.removeProperty = function(a) {
				return this.removeAttribute(a);
			};
		
			CSSStyleDeclaration.prototype.getPropertyPriority = function(styleName) {
				var rule = new RegExp($.escapeBS(styleName) + '\\s*:\\s*[^\\s]*\\s*!important(\\s*;)?', 'gmi');
				return rule.test(this.cssText) ? 'important' : '';
			}

		}

		// The style function
		$.fn.style = function(styleName, value, priority) {
			// DOM node
			var node = this.get(0);
			// Ensure we have a DOM node
			if (typeof node == 'undefined') {
				return this;
			}
			// CSSStyleDeclaration
			var style = this.get(0).style;
			// Getter/Setter
			if (typeof styleName != 'undefined') {
				if (typeof value != 'undefined') {
					// Set style property
					priority = typeof priority != 'undefined' ? priority : '';
					style.setProperty(styleName, value, priority);
					return this;
				} else {
					// Get style property
					return style.getPropertyValue(styleName);
				}
			} else {
				// Get CSSStyleDeclaration
				return style;
			}
		};
	}

	if ( !$.fn.actualHeight ) {

		$.fn.actualHeight = function() {

			var top = this.css( 'top' ),
				overflow = this.css( 'overflow' ),
				height = this.css( 'height' );
			
			this.css( {
				//top : 0,
				//height : 0,
				overflow : 'scroll'
			} );

			var actual = this.prop( 'scrollHeight' );

			this.css( {
				//top : top,
				//height : height,
				overflow : overflow
			} );

			return actual;

		}
	}

	if ( !$.fn.getBoxShadow ) {

		$.fn.getBoxShadow = function() {
			var proceed = this.css('box-shadow');
			if( !proceed )
				return { color: 0, x: 0, y: 0, blur: 0, exp: 0 };
			var result = this.css('box-shadow').match(/(-?\d)|(rgba\(.+\))/g);
			if( !result )
				return { color: 0, x: 0, y: 0, blur: 0, exp: 0 };

			return { color: result[0], x: result[1], y: result[2], blur: result[3], exp: result[4] };
		}
	}

	if ( !$.fn.getHighest ) {

		$.fn.getHighest = function( elem ) {

			var t_height = 0;
			var t_elem;

			if( !this.length )
				return 0;

			this.each( function () {

			    $this = $(this);

			    if ( $this.outerHeight() > t_height ) {

			        t_elem=this;
			        t_height = $this.outerHeight();
			    }

			} );

			if ( elem )
				return t_elem;

			return t_height;

		};

	}

	if ( !$.fn.equalChildrenSize ) {

		$.fn.equalChildrenSize = function() {



			return this.each( function() {

				var elem 		= this,
					$elem 		= $( this ),
					elems 		= ( $elem.data( 'equal' ) ? $elem.data( 'equal' ) : '' ),
					$elems 		= $elem.children( elems ),
					equal_max 	= $elem.data( 'equal-max' ),
					equal_min 	= ( $elem.data( 'equal-min' ) ? $elem.data( 'equal-min' ) : 'height' );

				if( !$elems.length )
					return this;

				var equal 			= ( !equal_max ? equal_min : equal_max ),
					current 	 	= ( !equal_max ? 0 : 9999999 ),
					max 			= !current,
					maxw 			= parseInt( $elem.data( 'max-width' ), 10 ),
					maxh 			= parseInt( $elem.data( 'max-height' ), 10 ),
					minw 			= parseInt( $elem.data( 'min-width' ), 10 ),
					minh 			= parseInt( $elem.data( 'min-height' ), 10 );

				$($elems).each( function( i ) {

					var $this 	= $( this ),
						m 		= 0;

					switch( equal ){
						case 'height': m = parseInt( $this.css( 'height' ), 10 ); break;
						case 'width': m = parseInt( $this.css( 'width' ), 10 ); break;
					}					

					if( !max )
						current = ( m < current ? m : current );
					else
						current = ( m > current ? m : current );
				
				});
				
				switch( equal ){
					case 'height':

						if( $.browser.msie && $.browser.version == 6.0 )
							$elem.css( 'height', current );
						
						if( !max ){
							if( !maxh || maxh > current ){
								$elem.css( 'height', current );
								$elem.css( 'max-height', current );
							}else{
								$elem.css( 'height', maxh );
								$elem.css( 'max-height', maxh );
							}
						}else{
							if( !minh || minh < current ){
								$elem.css( 'min-height', current );
							}else{
								$elem.css( 'min-height', minh );
							}
						}
						
					break;
					case 'width':
						
						if( $.browser.msie && $.browser.version == 6.0 )
							$elem.css( 'width', current );
						
						if( !max ){
							if( !maxw || maxw > current ){
								$elem.css( 'width', current );
								$elem.css( 'max-width', current );
							}else{
								$elem.css( 'width', maxw );
								$elem.css( 'max-width', maxw );
							}
						}else{
							if( !minw || minw < current ){
								$elem.css( 'min-width', current );
							}else{
								$elem.css( 'min-width', minw );
							}
						}
						
					break;
				}

			});
		};

	}

//Back Page Link
	if ( !$.fn.goBack ) {
		$.fn.goBack = function( e ) { window.history.back(); };
	}

//Find next selector, inside or outside parent
	if ( !$.fn.findNext ) {
		$.fn.findNext = function( selector ) {
			var $next = this.next( selector );
			if( $next.length )
				return $next;
			var $parent = this.parent();
			if( !$parent.length )
				return {};
			return $parent.findNext( selector );
		};
	}

/*
*****************************************************
*	2.0 FUNCTIONS
*****************************************************
*/

	$.functionExists = function( str ){
		return typeof $.fn[str] !== undefined && $.isFunction($.fn[str]);
	}
	
	$.funExists = function( str ){
		return typeof $[str] !== undefined && $.isFunction($[str]);
	}
	
	$.consoleDebug = function( db, lg ){
		if (db)
			console.log( lg );
	}

	$.EmToPx = function( input ) {
	    var emSize = parseFloat($("body").css("font-size"));
	    return (emSize * input);
	}

	$.PxToEm = function( input ) {
	    var emSize = parseFloat($("body").css("font-size"));
	    return (input / emSize);
	}

	// ARRAY

	$.getByValue = function( arr, val ) {
		for (var i = 0; i < arr.length; i++) {
			if( val === arr[i] ) return i;
		};
		return -1;
	}

	$.objSize = function(obj) {
	    var size = 0, key;
	    for (key in obj) {
	        if (obj.hasOwnProperty(key)) size++;
	    }
	    return size;
	};

	// OBJECT

	$.sortKeys = function( obj ) {
	    var keys = []; for(var key in obj) keys.push(key);
	    return keys.sort(function(a,b){return obj[a]-obj[b]});
	}

	$.rsortKeys = function( obj ) {
	    var keys = []; for(var key in obj) keys.push(key);
	    return keys.sort(function(a,b){return obj[b]-obj[a]});
	}

	// NUMBER

	$.stringDecimal = function( num ) {
		if( typeof num == 'string' && $.isNumeric( parseFloat( num ) ) )
			return num.replace(',','.');
	    return num;
	}

	$.isNumeric = function( num ) {
	    return !isNaN( $.stringDecimal(num) );
	}

	$.Numeric = function( num ) {
	    return ( $.isNumeric( num ) ? +$.stringDecimal(num) : false );
	}

	// STRING

	$.decodeEmail = function( str ){
		return str.replace( '()', '@' ).replace( ',', '.' );
	}

	$.startsWith = function( str, arr ){
		for (var i = 0; i < arr.length; i++) {
			if( str.indexOf( arr[i] ) === 0 )
				return true;
		};

		return false;
	}

	$.log = function( message, touch ) {
		if ( !touch && window.console ) {
			var time = new Date().getTime() - performance.timing.navigationStart;
			console.log( message + ' > ' + time + 'ms' );
		}
	} 

	// Escape regex chars with \
	$.escapeBS = function( text ) {
		return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
	}

	$.removeSlash = function( text ) {
		return text.replace( /\//g, '' );
	}

	$.trailingSlash = function( str ) {

	    if( str.substr( -1 ) == '/')
	        return str.substr( 0, str.length - 1 );

	    return str;

	}

	$.replaceState = function( url, state, title ) {
		if ( typeof window.history.replaceState == 'function' )
			history.replaceState( state, title, url );
	}

	$.pushState = function( url, state, title ) {
		if ( typeof window.history.pushState == 'function' )
			history.pushState( state, title, url );
	}

	$.getUrlData = function( str ) {

	    str = str.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");

	    var regex = new RegExp("[\\?&]" + str + "=([^&#]*)"),
	        results = regex.exec(location.search);

	    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	    
	}

	$.getCleanUrl = function( url, just ) {

		if( !url )
	    	url = window.location.href;

		var anchor = url.indexOf('#');
		if( anchor != -1 )
			url = url.substring(0, anchor);

		if( !just ){
			var params = url.indexOf('?');
			if( params != -1 )
			    url = url.substring(0, params);
		}

		return url;
	}

	$.getUrlHash = function( url, fallback ) {

		if( !url )
	    	url = window.location.href;

	    if( typeof fallback === 'undefined' )
	    	fallback = '';

	    var split = url.split('#');
		if( split.length > 1 )
			return '#' + split[1];

		return fallback;		
	}

	$.getUrlAnchor = function( url, fallback ) {

		if( !url )
	    	url = window.location.href;

	    if( typeof fallback === 'undefined' )
	    	fallback = '';

	    var split = url.split('#');
		if( split.length > 1 )
			return split[1];

		return fallback;		
	}

	$.getUrlSearch = function( url, fallback ) {
		if( !url )
	    	url = window.location.href;

	    if( typeof fallback === 'undefined' )
	    	fallback = '';
		
		url = url.split( '?' );
		if( url.length > 1 )
			return '?' + url[1];

		return fallback;
	}

	$.urlParameters = function( url, fallback ) {
		if( !url )
	    	url = window.location.href;

	    if( typeof fallback === 'undefined' )
	    	fallback = '';
		
		url = url.split( '?' );
		if( url.length > 1 )
			return url[1];

		return fallback;
	}

	$.getUrlParameters = function( url, fallback ) {

		if( !url )
	    	url = window.location.href;

	    if( typeof fallback === 'undefined' )
	    	fallback = {};

	    url = $.urlParameters( url, '' );

		return url?JSON.parse('{"' + url.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) }):{};
	}

	$.getUrlParameter = function( name, url, fallback ) {

		if( !url )
	    	url = window.location.href;

	    if( typeof fallback === 'undefined' )
	    	fallback = '';

	    if( !name )
			return fallback;

		var params = $.getUrlParameters( $.getCleanUrl( url, 1 ) );
		if( typeof params[name] !== 'undefined' )
			return params[name];
		
		return fallback;

	}

	$.getScripts = function(arr, path) {

		if( typeof( arr ) == 'string' ){
			arr = [ arr ];
		}
	    var _arr = $.map(arr, function(scr) {
	        return $.getScript( (path||"") + scr );
	    });

	    _arr.push($.Deferred(function( deferred ){
	        $( deferred.resolve );
	    }));

	    return $.when.apply($, _arr);
	}

/*
*****************************************************
*	3.0 PRESETS
*****************************************************
*/

	/*$.progressBar = function( element, percent, html, time ) {
	    element.find('div')
	    	.animate( {
	    		width: parseFloat(percent) * element.width() / 100
	    	}, time ? time : 500 )
	    	.html( html ? percent + '% ' : '' );
	}

	$.progressBarLoading = function( args ) {

		args = $.extend(
			{
				classes: 'absolute middle full-width',
			},
			( args ? args : {} )
		);
		
		return '<div class="scm-loading loading-bar ' + args.classes + '"></div>';
	}*/

	$.barLoading = function( args ) {

		args = $.extend(
			{
				classes: 'absolute middle full-width',
			},
			( args ? args : {} )
		);
		
		return '<div class="scm-loading loading-bar ' + args.classes + '"></div>';
	}

	$.iconLoading = function( args ) {

		args = $.extend(
			{
				classes: 'absolute middle double',
				icon: 'circle',
			},
			( args ? args : {} )
		);

		return '<div class="scm-loading loading-icon ' + args.classes + '"><i class="fa fa-spin fa-' + args.icon + '"></i></div>';
	}

	$.circleLoading = function( args ) {

		args = $.extend(
			{
				classes: 'absolute middle double',
				icon: 'spinner',
			},
			( args ? args : {} )
		);

		return '<div class="scm-loading loading-circle ' + args.classes + '"><i class="fa fa-spin fa-' + args.icon + ' absolute middle"></i></div>';
	}

})( jQuery );
