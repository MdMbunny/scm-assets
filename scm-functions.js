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
*	1.0 SELECTORS
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

	if ( !$.fn.minTop ) {

		$.fn.minTop = function() {
			var t = 1493747292;
			this.each( function(){
				t = Math.min( t, $(this).offset().top );
			} );
			return t;
		}
	}

	if ( !$.fn.totalHeight ) {

		$.fn.totalHeight = function() {
			var h = 0;
			this.each( function(){
				h = h + $(this).outerHeight();
			} );
			return h;
		}
	}
	if ( !$.fn.totalWidth ) {

		$.fn.totalWidth = function() {
			var w = 0;
			this.each( function(){
				w = w + $(this).outerWidth();
			} );
			return w;
		}
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

	if ( !$.fn.shadowWidth ) {

		$.fn.shadowWidth = function() {
			var proceed = this.css('box-shadow');
			if( !proceed ) return 0;
			var result = this.css('box-shadow').match(/(-?\d)|(rgba\(.+\))/g);
			if( !result ) return 0;

			return Number(result[1]) + Number(result[3]) + Number(result[4]);
		}
	}

	if ( !$.fn.shadowHeight ) {

		$.fn.shadowHeight = function() {
			var proceed = this.css('box-shadow');
			if( !proceed ) return 0;
			var result = this.css('box-shadow').match(/(-?\d)|(rgba\(.+\))/g);
			if( !result ) return 0;

			return Number(result[2]) + Number(result[3]) + Number(result[4]);
		}
	}

	if ( !$.fn.realWidth ) {

		$.fn.realWidth = function(margin) {
			var sh = this.shadowWidth();
			var out = this.outerWidth();
			var mar = this.outerWidth(margin);
			var dif = mar - out;
			return ( margin ? mar : out ) + ( sh > dif ? sh : 0 );
		}
	}

	if ( !$.fn.realHeight ) {

		$.fn.realHeight = function(margin) {
			var sh = this.shadowHeight();
			var out = this.outerHeight();
			var mar = this.outerHeight(margin);
			var dif = mar - out;
			return ( margin ? mar : out ) + ( sh > dif ? sh : 0 );
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
					maxw 			= $.parsePx( $elem.data( 'max-width' ) ),
					maxh 			= $.parsePx( $elem.data( 'max-height' ) ),
					minw 			= $.parsePx( $elem.data( 'min-width' ) ),
					minh 			= $.parsePx( $elem.data( 'min-height' ) );

				$elems.each( function( i ) {

					var $this 	= $( this ),
						m 		= 0;

					switch( equal ){
						case 'height': m = $.parsePx( $this.css( 'height' ), 10 ); break;
						case 'width': m = $.parsePx( $this.css( 'width' ), 10 ); break;
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

//Invert HTML elements
	if ( !$.fn.invertChildren ) {
		$.fn.invertChildren = function( selector ) {
			var $this = this;
			selector = selector || '';
			$this.children( selector ).slice(1).each(function() {
			    $(this).insertBefore($this.children().eq(0));
			});
			return $this;
		};
	}

	if ( !$.fn.sortChildren ) {
		$.fn.sortChildren = function( attr, selector ) {
			var $this = this;
			selector = selector || '';
			$this.children( selector ).sort(function( a, b ) {
			    return +a.getAttribute( attr ) - +b.getAttribute( attr );
			})
			.appendTo($this);
			return $this;
		};
	}
	if ( !$.fn.sortIt ) {
		$.fn.sortIt = function( attr, selector ) {
			var $this = this;
			selector = selector || '';
			var $temp = $( '<div></div>' );
			$this.sort(function( a, b ) {
			    return +a.getAttribute( attr ) - +b.getAttribute( attr );
			})
			.appendTo($temp);
			return $temp.children().detach();
		};
	}

if ( !$.fn.getText ) {
	$.fn.getText = function() {
		return this
				.clone()
			    .children()
			    .remove()
			    .end()
			    .text();
	};
}

if ( !$.fn.insertText ) {
	$.fn.insertText = function( txt, ind ) {
		var children = this.children();
		if( children.length )
			$( children[ind || 0] ).after( document.createTextNode( txt || '' ) );
		else
			this.append( document.createTextNode( txt || '' ) );
		return this;
	};
}

if ( !$.fn.appendText ) {
	$.fn.appendText = function( txt ) {
		return this.append( document.createTextNode( txt || '' ) );
	};
}

if ( !$.fn.prependText ) {
	$.fn.prependText = function( txt ) {
		return this.prepend( document.createTextNode( txt || '' ) );
	};
}

if ( !$.fn.removeText ) {
	$.fn.removeText = function() {
		return this.contents().filter(function(){
		    return (this.nodeType == 3);
		}).remove();
	};
}

if ( !$.fn.replaceText ) {
	$.fn.replaceText = function( txt ) {
		this.contents().filter(function(){
			if( this.nodeType == 3 ) this.nodeValue = txt;
		    return;
		});
		return this;
	};
}

if ( !$.fn.prevLoop ) {
	$.fn.prevLoop = function() {
		var $prev = this.prev();
		if( !$prev.length )
			$prev = this.siblings().last();
		return $prev;
	};
}
if ( !$.fn.nextLoop ) {
	$.fn.nextLoop = function() {
		var $next = this.next();
		if( !$next.length )
			$next = this.siblings().first();
		return $next;
	};
}

// FA-ICONS

if ( !$.fn.changeIcon ) {
	$.fn.changeIcon = function( icon ) {

		var $this = this;

		if( !$this.hasClass( 'faicon' ) )
			$this = $this.find( '.faicon' );
		if( !$this.length ) $this = this;
		
		var cls = $this.attr('class').split(/\s+/);
		for( var i in cls )
			if( cls[i].indexOf( 'fa-' ) === 0 )				
				$this.removeClass( cls[i] );

		$this.addClass( 'fa' ).addClass( icon ).FAFIX();

		return this;

	};
}

if ( !$.fn.FASolid ) {
	$.fn.FASolid = function() {
		return this.hasClass( 'fas' ) ? this : this.removeClass( 'far fab fal' ).addClass( 'fas' );
	};
}
if ( !$.fn.FARegular ) {
	$.fn.FARegular = function() {
		return this.hasClass( 'far' ) ? this : this.removeClass( 'fab fal fas' ).addClass( 'far' );
	};
}
if ( !$.fn.FALight ) {
	$.fn.FALight = function() {
		return this.hasClass( 'fal' ) ? this : this.removeClass( 'far fab fas' ).addClass( 'fal' );
	};
}
if ( !$.fn.FABrand ) {
	$.fn.FABrand = function() {
		return this.hasClass( 'fab' ) ? this : this.removeClass( 'far fal fas' ).addClass( 'fab' );
	};
}
if ( !$.fn.FAIconWeight ) {
	$.fn.FAIconWeight = function( weight ) {
		switch( weight ){
			case 's': return this.FASolid(); break;
			case 'r': return this.FARegular(); break;
			case 'l': return this.FALight(); break;
			case 'b': return this.FABrand(); break;
			default: return this; break;
		}
		return this;
	};
}
if ( !$.fn.FAIcon ) {
	$.fn.FAIcon = function( icon ) {

		var $this = this;

		if( !$this.hasClass( 'faicon' ) )
			$this = $this.find( '.faicon' );
		if( !$this.length ) return this;
		
		var cls = $this.attr('class').split(/\s+/);
		for( var i in cls )
			if( cls[i].indexOf( 'fa-' ) === 0 )				
				$this.removeClass( cls[i] );

		$this.addClass( icon );

		return this;

	};
}

// SVG

if ( !$.fn.imgSVG ) {
	$.fn.imgSVG = function( ratio, fade ) {
		    
	    var $img = $( this );
	    var imgOpacity = $img.css( 'opacity' ) || 1;
	    var imgID = $img.attr( 'id' ) || '';
	    var imgClass = $img.attr( 'class' ) || '';
	    var imgURL = $img.attr( 'src' );

	    if( !imgURL ) return this;

	    var $svg = $();

	    $.get( imgURL, function( data ){
	        
	        $svg = $( data ).find( 'svg' );

	        if( imgID )
	            $svg = $svg.attr('id', imgID );

	        if( imgClass ) 
	            $svg = $svg.attr( 'class', imgClass + ' replaced-svg' );
	        
	        $svg = $svg.removeAttr( 'xmlns:a' ).attr( 'preserveAspectRatio', ratio || 'none' );

	        if(!$svg.attr('viewBox')){
				$svg.attr('viewBox', ('0 0 '
				+ $svg.attr('width').match(/[0-9]+\.[0-9]*/) + ' '
				+ $svg.attr('height').match(/[0-9]+\.[0-9]*/)));
			}

	        if( fade ) $svg.css( 'opacity', '0' );
	        $img.replaceWith( $svg );
	        if( fade ) $svg.animate({ 'opacity': imgOpacity }, fade );

	    }, 'xml' );

	    return $svg;

	}
}
if ( !$.fn.imgsSVG ) {
	$.fn.imgsSVG = function( fade ) {

		return this.each(function(){
		    
		    var $img = $( this );
		    return $img.imgSVG( fade );

		});
	}
}

/*
*****************************************************
*	2.0 FUNCTIONS
*****************************************************
*/

	$.functionExists = function( str ){
		return undefined !== $.fn[str] && undefined !== typeof $.fn[str] && $.isFunction($.fn[str]);
	}
	
	$.funExists = function( str ){
		return undefined !== $[str] && undefined !== typeof $[str] && $.isFunction($[str]);
	}
	
	$.consoleDebug = function( db, lg ){
		if (db)
			console.log( lg );
	}	

	$.getAttributes = function( sel ) {
		var obj = {};
		$.each( sel.attributes, function( i, a ){
    		obj[a.name] = a.value;
    	});
    	return obj;
	}   

	$.EmToPx = function( input ) {
	    var emSize = parseFloat($("body").css("font-size"));
	    return (emSize * parseFloat(input) );
	}

	$.PxToEm = function( input ) {
	    var emSize = parseFloat($("body").css("font-size"));
	    return ( parseFloat(input) / emSize);
	}

	$.parsePx = function( val ){
	    val = ( val ? val.toString() : '0' );
	    if( val.indexOf( 'em' ) >= 0 )
	        return $.EmToPx( val );
	    return parseFloat( val );
	}

	// INPUTS

	$.fn.getCursorPosition = function() {
        var input = this.get(0);
        if (!input) return; // No (input) element found
        if ('selectionStart' in input) {
            // Standard-compliant browsers
            return { start: input.selectionStart, end: input.selectionEnd };
        } else if (document.selection) {
            // IE
            input.focus();
            var sel = document.selection.createRange();
            var selLen = document.selection.createRange().text.length;
            sel.moveStart('character', -input.value.length);
            return sel.text.length - selLen;
        }
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
	    var keys = [];
	    for(var key in obj) keys.push(key);
	    return keys.sort(function(a,b){return obj[a]-obj[b]});
	}

	$.rsortKeys = function( obj ) {
	    var keys = [];
	    for(var key in obj) keys.push(key);
	    return keys.sort(function(a,b){return obj[b]-obj[a]});
	}
	$.fn.objToData = function( obj ){
		for( var key in obj ){
			this.attr( 'data-' + key, obj[key] );
		}
		return this;
	}


	// NUMBER

	$.stringDecimal = function( num ) {
		if( typeof num == 'string' && $.isNumber( parseFloat( num ) ) )
			return num.replace(',','.');
	    return num;
	}

	$.isNumber = function( num ) {
	    return !isNaN( $.stringDecimal(num) );
	}

	$.Numeric = function( num ) {
	    return ( $.isNumber( num ) ? +$.stringDecimal(num) : false );
	}

	// STRINGS

	$.decodeEmail = function( str ){
		return str.replace( /,/g, '.' ).replace( '()', '@' );
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
	
	$.replaceUrlParameter = function( param, newval, search ) {
    	var regex = new RegExp("([?;&])" + param + "[^&;]*[;&]?");
    	var query = search.replace(regex, "$1").replace(/&$/, '');

    	return (query.length > 2 ? query + "&" : "?") + (newval ? param + "=" + newval : '');
	}

	// SCRIPTS

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

	$.actionButton = function( args ) {

		args = $.extend(
			{
				classes: '',
				icon: 'cog',
				text: '',
				attr: '',
			},
			( args ? args : {} )
		);
		
		return '<button class="action UI' + args.classes + '"' + ( args.attr ? ' ' + args.attr : '' ) + '><i class="fa fa-' + args.icon + '"></i>' + args.text + '</button>';
	}

	$.closeButton = function( args ) {

		args = $.extend(
			{
				classes: '',
				icon: 'times',
				text: '',
				attr: '',
			},
			( args ? args : {} )
		);
		
		return '<button class="close UI' + args.classes + '"' + ( args.attr ? ' ' + args.attr : '' ) + '><i class="fa fa-' + args.icon + '"></i>' + args.text + '</button>';
	}

	$.barLoading = function( args ) {

		args = $.extend(
			{
				classes: 'absolute middle full-width',
				attr: '',
			},
			( args ? args : {} )
		);
		
		return '<div' + ( args.id ? ' id="' + args.id + '"' : '' ) + ' class="scm-loading loading-bar ' + args.classes + '"' + ( args.attr ? ' ' + args.attr : '' ) + '></div>';
	}

	$.iconLoading = function( args ) {

		args = $.extend(
			{
				classes: 'absolute middle double',
				icon: 'spinner',
				attr: '',
			},
			( args ? args : {} )
		);

		return '<div' + ( args.id ? ' id="' + args.id + '"' : '' ) + ' class="scm-loading loading-icon ' + args.classes + '"' + ( args.attr ? ' ' + args.attr : '' ) + '><i class="fa fa-pulse fa-' + args.icon + '"></i></div>';
	}

	$.circleLoading = function( args ) {

		args = $.extend(
			{
				classes: 'absolute middle double',
				icon: 'circle',
				attr: '',
			},
			( args ? args : {} )
		);

		return '<div' + ( args.id ? ' id="' + args.id + '"' : '' ) + ' class="scm-loading loading-circle ' + args.classes + '"' + ( args.attr ? ' ' + args.attr : '' ) + '><i class="fa fa-spin fa-' + args.icon + ' absolute middle"></i></div>';
	}

})( jQuery );
