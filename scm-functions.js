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
				top : 0,
				height : 0,
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

	if ( !$.fn.closestChild ) {

		// Get Nearest Child
		$.fn.closestChild = function( filter ) {

	        var $found = $(),
	            $currentSet = this;

	        while ($currentSet.length) {
	            $found = $currentSet.filter(filter);
	            if ($found.length) break;
	            
	            $currentSet = $currentSet.children();
	        }

	        return $found.first();
	    };

	}

//Back Page Link
	if ( !$.fn.goBack ) {
		$.fn.goBack = function( e ) { window.history.back(); };
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
			console.log( new Date().getTime() - performance.timing.navigationStart + 'ms' );
			console.log( message );
			console.log('---');
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

	$.getUrlData = function( str ) {

	    str = str.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");

	    var regex = new RegExp("[\\?&]" + str + "=([^&#]*)"),
	        results = regex.exec(location.search);

	    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	    
	}

	$.getUrlParameter = function( param, url ) {

		if( !url )
	    	url = window.location.search.substring( 1 );
	    
	    var sURLVariables = url.split( '?' );

	    for ( var i = 1; i < sURLVariables.length; i++ ) {

	        var sParameterName = sURLVariables[i].split( '=' );

	        var name = sParameterName[0];
	        var num = sParameterName[1].split( '#' )[0];

	        if ( name == param ) {

	            return num;

	        }
	    }

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

	$.iconLoading = function( dimension, classes, icon ) {

		dimension = ( dimension ? dimension : 'quadruple' );
		classes = ( classes ? classes : 'relative middle' );
		icon = ( icon ? icon : 'spinner' );

		return '<div class="scm-loading loading ' + dimension + ' ' + classes + '""><i class="fa fa-spin fa-' + icon + '""></i></div>';

	}

})( jQuery );