( function($){

	// **********************************************
	// GET UI Controls
	// **********************************************

	$.UI = function( id, opt ){

		var defaults = {
				id: ( typeof id == 'string' ? id : 'scm-ui' ),
				classes: '',
				css: {},
				data: {},
			};

		opt = ( opt ? opt : ( id && typeof id != 'string' ? id : {} ) );

		var options = $.extend( defaults, opt );
		
		var $ui = $( '#' + options.id );
		if( !$ui.length )
			$ui = $( '<div></div>' ).attr( 'id', options.id ).addClass( 'scm-ui' ).addClass( options.classes ).css( options.css ).objToData( options.data );
		else
			$ui.empty();

		return $ui;
	}
	$.fn.addUI = function( opt, prepend ){

		var $ui = $.UI( opt );

		if( prepend ) return $ui.prependTo( this );
		return $ui.appendTo( this );
	}

	// ********************************************** CONTAINER

		$.UIContent = function( id, opt ){

			var defaults = {
					id: ( typeof id == 'string' ? id : 'scm-ui-content' ),
					classes: '',
					css: {},
					data: {},
				};
			
			opt = ( opt ? opt : ( id && typeof id != 'string' ? id : {} ) );

			var options = $.extend( defaults, opt );
			var $content = $( '<div></div>' ).attr( 'id', options.id ).addClass( 'scm-ui-content' ).addClass( options.classes ).css( options.css );

			return $content.objToData( options.data );

		}
		$.fn.addUIContent = function( opt, prepend ){

			var children = this.children( '.scm-ui-content' ),
				defaults = {
					id: ( typeof opt == 'string' ? opt : 'scm-ui-content-' + children.length ),
				};

			opt = ( typeof opt == 'string' ? {} : opt );
			
			var options = $.extend( defaults, opt ),
				$content = $.UIContent( options );

			if( prepend )
				this.prepend( $content );
			else
				this.append( $content );

			return $content;

		}

			// ********************************************** LABEL

			$.UILabel = function( icon, text, tag, cls ){
				cls = ( cls ? cls : ( tag ? tag : 'label' ) );
				tag = ( tag ? tag : 'span' );
				text = ( text ? text : '' );

				icon = ( icon == 'none' ? '' : icon );
				
				var html = getIcon( icon ) + text;

				return $( '<' + tag + ' class="scm-ui-label">' + html + '</' + tag + '>' ).addClass( cls ).addClass( text ? ' text' : ( icon ? ' icon' : ' noicon' ) );
			}
			$.fn.UILabelText = function( txt ){
				return this.each( function(){

					var $this = $(this);
					$this.removeText();
					if( txt )
						$this
							.appendText( txt )
							.addClass( 'text' )
							.removeClass( 'icon' )
							.removeClass( 'noicon' );
					else
						$this
							.addClass( $this.children( '.faicon' ).length ? 'icon' : 'noicon' )
							.removeClass( 'text' );

				} );
			}

			// ********************************************** TEXT INPUT

			$.UIInput = function( action, icon, text, cls, min, max, before ){

				var type = 'text';
				if( typeof text == 'number' ){
					type = 'number'
					min = ( undefined !== min ? min : 0 );
				}

				var $input = $( '<input type="' + type + '" name="' + type + '-input" class="' + type + '-input" value="' + text + '"' + ( undefined !== min && $.isNumeric( min ) ? ' min="' + min + '"' : '' ) + ( undefined !== max && $.isNumeric( max ) ? ' max="' + max + '"' : '' ) + '>' );

				var $button = $.UILabel( icon, '', 'button', 'scm-ui-button scm-ui-input scm-ui-comp' ).addClass( cls );
				if( before )
					$button.append( $input.addClass('before') );
				else
					$button.prepend( $input.addClass('after') );

				//if( icon ){
					$button.on( 'click', action );
					$button.on( 'focusout', function(e){
						$button.removeClass( 'focus' );
					});
					$input.on( 'focus', function(e){
						$button.addClass( 'focus' );
					});
					$input.on( 'focusout', function(e){
						if( !icon )
							$button.trigger( 'click' );
					});
					$input.on( 'click keyup', function(e){
						e.stopPropagation();
						//e.preventDefault();
						if( e.key == 'Enter' ){
							$button.trigger( 'click' ).next().focus();
						}else if ( e.key ){
							$button.trigger( 'change', [ $input.val() ] );
						}
					} );
					//$input.on( 'change', function(){  } );
				//}else{
					//$input.on( 'change', action );
				//}
				
				return $button;

			}
			$.fn.UIInput = function(){
				return this.children( 'input' );
			}
			$.fn.UIInputValue = function( val, trigger ){
				if( undefined === val ){
					val = $(this).UIInput().val();
					if( $(this).UIInput().attr( 'type' ) == 'number' ) val = parseFloat( val );
					return val;
				}

				$(this).UIInput().val( val );
				if( trigger )
					$(this).trigger( 'click' );
				
				return $(this);

			}

			// ********************************************** SELECT INPUT

			$.UISelect = function( action, icon, val, cls, opts, create ){

				var $select = $( '<select></select>' );

				var $button = $.UILabel( icon, '', 'button', 'scm-ui-button scm-ui-select scm-ui-comp' ).addClass( cls ).prepend( $select );

				$button.UISelectOptions( opts );

				$select.off( 'change' ).on( 'change', action );
				$button.on( 'focusout', function(e){
					$button.removeClass( 'focus' );
				});
				$select.on( 'focus', function(e){
					$button.addClass( 'focus' );
				});

				if( val )
					$select.val( val );
				if( create )
					$select.trigger( 'change' );

				return $button;

			}
			$.fn.UISelect = function(){
				return this.children( 'select' );
			}
			$.UISelectOption = function( value, text, id ){

				return $( '<option value="' + value + '" id="' + ( id || value ) + '">' + ( text || value ) + '</option>' );

			}
			
			$.fn.UISelectOptions = function( opts, keep ){
				return this.each( function(){
					var $select = $(this).children( 'select' );
					if( keep ) $select.children().not(':first').remove();
					else $select.empty();
					if( opts ){
				
						for(var k in opts) {
							$select.append( $.UISelectOption( opts[k].value, opts[k].label, opts[k].id ) );
						};
					}
				});

			}
			$.fn.UISelectValue = function( val, trigger ){
				if( undefined === val )
					return $(this).UISelect().val();
				
				$(this).UISelect().val( val );
				if( trigger )
					$(this).UISelect().trigger( 'change' );

				return $(this);
				
			}

			// ********************************************** BUTTON

			$.UIButton = function( action, icon, text, cls ){

				var $button = $.UILabel( icon, text, 'button', 'scm-ui-button' ).addClass( cls );

				if( typeof action == 'string' )
					$button.attr( 'data-href', action );
				else if( action )
					$button.on( 'click', action );
				
				return $button;
			}

				// ********************************************** UPLOAD

				$.UIButtonFile = function( id, action, icon, upload, send, cls, both ){


					id = ( id ? id : 'file' );
					send = ( send ? send : '' );
					upload = ( upload ? upload : '' );
					icon = ( icon ? icon : 'fa-file-code-o' );

					var act_input = function(e){

						var $but_upload = $( this ).siblings( '#' + id );
						var $lab_upload = $( this ).siblings( '#' + id + '-button' );

						var cache = $upload.children();

						if( $(this).val() ){
							$but_upload.removeClass('disabled');
							$but_upload.removeClass('hidden');
							$lab_upload.removeClass('scm-ui-button').addClass('is-file').text( $(this).val().split( '\\' ).pop() ).prepend( cache );
						}else{
							$but_upload.addClass('disabled');
							$but_upload.addClass('hidden');
							$lab_upload.addClass('scm-ui-button').removeClass('is-file').text( upload ).prepend( cache );
						}
					
					}

					var $send = $.UIButton( action, 'fa-upload', send ).attr( 'id', id ).addClass( both ).addClass( cls ).addClass( 'hidden disabled' ).addClass('scm-ui-button');
					var $file = $( '<input id="' + id + '-input" type="file" name="' + id + '-input" />' ).on( 'change', act_input ).addClass( both ).addClass('scm-ui-upload-input');
					var $upload = $.UILabel( icon, upload, 'label' ).attr( 'id', id + '-button' ).attr( 'for', id + '-input' ).addClass( both ).addClass( cls ).addClass('scm-ui-button');


					return $send.add( $file ).add( $upload );
				};

		// ********************************************** TOGGLE

			$.UIToggle = function( action, active, icona, iconb, texta, textb, cls ){

				active = active === true;

				var fun = 'UIToggle';
				if( action && typeof action == 'string' ){
					fun = fun + capitalizeFirstLetter( action );
					action = false;
				}

				return $.UIButton( action, ( active || !iconb ? icona : iconb ), ( active || !textb ? texta : textb ), cls )
					.addClass( 'scm-ui-toggle' )
					.toggleClass( 'off', !active )
					.toggleClass( 'on', active )
					.data( 'icon-on', icona )
					.data( 'icon-off', iconb || icona )
					.data( 'text-on', texta )
					.data( 'text-off', textb || texta )
					.on( 'click', function( e ){
						if( !$(this).hasClass('disabled') ){

							$(this)
								[fun]()
								.trigger( 'toggle', [ $(this).hasClass( 'on' ) ] );
						}
					} );

			}
			$.UIToggleButtonOn = function( group, action, active, icona, iconb, texta, textb, cls ){
				var $toggle = $.UIToggle( action, active, icona, iconb, texta, textb, cls ).data( 'toggle-group', group ).data( 'toggle-group-type', 'on' );
				group.each( function(){
					$(this).on( 'toggled', function(e,on){
						if( !on ) $toggle.UIToggle( false, true )
					});
				});
				return $toggle;
			}

			$.fn.UIToggleGroup = function( gr, ty ){

				var $group = gr || $( this.data( 'toggle-group' ) ).not( '.no-toggle' );
				if( $group.length ){
					var $act = $group.filter( '.' + ( ( ty || this.data( 'toggle-group-type' ) ) == 'on' ? 'off' : 'on' ) );
					
					if( $act.length ){
						$act.each( function(){ $(this).UIToggle() } );
						this.UIToggle( true, false );
					}else{
						$group.each( function(){ $(this).UIToggle() } );
						this.UIToggle( false, true );
					}

				}

				return this;

			}
			$.fn.UIToggleGroups = function( gr, ty ){

				var $group = gr || $( this.data( 'toggle-group' ) ).not( '.no-toggle' );
				if( $group.length ){
					var $act = $group.filter( '.' + ( ( ty || this.data( 'toggle-group-type' ) ) == 'on' ? 'off' : 'on' ) );

					var $off = $group.siblings( '.off' ).not( '.no-toggle' ).not( $group ).not( this );
					var $on = $group.siblings( '.on' ).not( '.no-toggle' ).not( $group ).not( this );
					
					if( $act.length ){
						$act.each( function(){ $(this).UIToggle() } );
						$on.UIToggle();
					}else if( $off.length ){
						$off.UIToggle();
					}else if( $on.length ){
						$on.UIToggle();
					}
					this.UIToggle( true, false );

				}

				return this;

			}
			$.fn.UIToggleUnique = function(){

				this.siblings( '.on' ).not( '.no-toggle' ).UIToggle();
				this.UIToggle();

				return this;
			}
			$.fn.UIToggleSiblings = function(){

				var $off = this.siblings( '.off' ).not( '.no-toggle' );
				var $on = this.siblings( '.on' ).not( '.no-toggle' );

				if( this.hasClass('on') ){
					if( $off.length && !$on.length )
						$off.UIToggle();
					else
						$on.UIToggle();
				}else{
					$on.UIToggle();
					this.UIToggle();
				}

				return this;
			}
			$.fn.UIToggle = function( on, off ){
				
				on = ( undefined !== on ? on : this.hasClass( 'off' ) );
				off = ( undefined !== off ? off : this.hasClass( 'on' ) );
				this
					.toggleClass( 'off', off )
					.toggleClass( 'on', on );

				if( this.data( 'text-on' ) != this.data( 'text-off' ) ){
					this.removeText();
					this.appendText( !on && this.data( 'text-off' ) ? this.data( 'text-off' ) : this.data( 'text-on' ) );
				}

				if( this.data( 'icon-on' ) != this.data( 'icon-off' ) ){
					this
						.find( '.faicon' )
						.removeClass()
						.addClass( 'fa ' + ( !on && this.data( 'icon-off' ) ? this.data( 'icon-off' ) : this.data( 'icon-on' ) ) )
						.FAFIX();
				}

				this.trigger( 'toggled', [ this.hasClass( 'on' ) ] );
				
				return this;
			}
			$.fn.UIToggleValue = function( val ){
				if( undefined !== val )
					return $(this).UIToggle( val, !val );
				return this.hasClass( 'on' );
			}


		// ********************************************** CHECKBOX INPUT

		$.UICheckbox = function( action, active, icona, iconb, texta, textb, cls, append ){

			var $input = $( '<input type="checkbox" name="checkbox-input" class="checkbox-input" value="' + ( !active ? 'checked' : '' ) + '"' + ( !active ? ' checked' : '' ) + '>' );
			
			var $button = $.UIToggle( action, active, icona, iconb, texta, textb, cls )
				.addClass( 'scm-ui-input' );
				//.addClass( 'scm-ui-comp' );
			
			if( append )
				$button.append( $input.addClass( 'append' ) ).addClass( 'input-append' );
			else
				$button.prepend( $input.addClass( 'prepend' ) ).addClass( 'input-prepend' );

			$button.on( 'toggle', function(e,on){

				$input.attr( 'checked', on );
				$input.attr( 'value', ( on ? 'checked' : '' ) );

			});
			/*$input.on( 'change click keyup', function(e){
				e.stopPropagation();
				e.preventDefault();
			});*/

			return $button;
		}
		$.fn.UICheckbox = function(){
			return this.children( 'input' );
		}

		// ********************************************** CONTAINER TABS

		$.UITabs = function( id, opt ){

			var defaults = {
				id: ( typeof id == 'string' ? id : 'scm-ui-tabs' ),
				classes: '',
				css: {},
				//position:'top',
			};

			opt = opt || ( id && typeof id != 'string' ? id : {} );

			var options = $.extend( defaults, opt );

			return $tabs = $.UIContent( options ).addClass( 'scm-ui-tabs' );//.attr( 'data-from', options.position );

		}
		$.fn.addUITabs = function( opt, prepend ){

			var $tabs = $.UITabs( opt );

			if( prepend ) return $tabs.prependTo( this );
			return $tabs.appendTo( this );
		}

		// ********************************************** TAB

			$.UITab = function( tab, act, icon, text, cls ){
				var action = function(e){

					var $tab = $(this);

					if( $tab.hasClass('off') ){
						$tab.disableUITab();
					}else{
						$tab.enableUITab();
					}
				}
				return $.UIToggle( action, act || false, icon, '', text, '', cls ).addClass( 'scm-ui-tab' ).attr( 'data-tab', tab );

			}
			$.fn.enableUITab = function( complete ){
				
				var $this = this;
				var $ui = this.parents( '.scm-ui' ).addClass( 'force-show' );

				var $active = this.siblings( '.scm-ui-tab.off' );

				if( $active.length ){

					$active.disableUITab( function(){ $this.enableUITab() } );
					return this;

				}				

				var $wrap = $ui.find( '.scm-ui-content#' + this.data('tab') );
				if( $wrap.length ){

					var dir = ( this.parent().data( 'from' ) || 'top' );
					var anim = {};
					anim[dir] = 0;

					if( dir == 'top' ) $wrap.detach().prependTo( $ui );
					else if( dir == 'bottom' ) $wrap.detach().appendTo( $ui );

					$wrap.addClass( 'active' ).show();

					$ui.css( dir, - $wrap.outerHeight() ).animate( anim, 300, 'easeOutSine', function(){
						if( $.isFunction( complete ) ) complete();
					} );

				}

				//$this.addClass( 'off' );
				
				return this;

			}
			$.fn.disableUITab = function( complete ){
				
				var $this= this;
				var $ui = this.parents( '.scm-ui' ).removeClass( 'force-show' );
				var $wrap = $ui.find( '.scm-ui-content.active#' + this.data('tab') );

				if( $wrap.length ){

					var dir = ( this.parent().data( 'from' ) || 'top' );
					var anim = {};
					anim[dir] = - $wrap.outerHeight();
					$ui.animate( anim, 300, 'easeOutSine', function(){
						$wrap.hide().removeClass( 'active' );
						$ui.css( dir, 0 );
						$this.removeClass( 'off' ).addClass( 'on' );
						if( $.isFunction( complete ) ) complete();
					} );

				}else{

					this.removeClass( 'off' ).addClass( 'on' );

				}
				
				return this;
			}

	// ********************************************** SLIDER

	$.UISlider = function( id, minStep, maxStep, ruler, fun, values, step ){

		if( !$.functionExists( 'slider' ) )
			return '';

		var defaults = {
			id: ( typeof id == 'string' ? id : 'scm-ui-slider' ),
			classes: '',
			css: {},
			data: {},
		};

		var options = $.extend( defaults, ( id && typeof id != 'string' ? id : {} ) );

		var $slider = $.UIContent( options )
			.addClass( 'scm-ui-slider' )
			.data( 'start', minStep )
			.data( 'end', maxStep );

		var $slide = $( '<div class="scm-ui-slide"></div>' )
			.slider({
		        min: minStep,
		        max: maxStep,
		        animate: true,
		        range: true,
		        step: ( step || .1 ),
		        values: values || [ minStep, maxStep ],
		        stop: fun,
		    });

		$slider.append( $slide );

		if( ruler ){
			var $ruler = $( '<div class="ui-ruler"></div>' );
			for (var i = minStep-1 || 0; i < maxStep; i++) {
				if( ruler == 'mini' && i )
					for (var j = 0; j < 4; j++) 
						$ruler.append( '<span class="ruler mini"></span>' );
	            var num = i+1-(i*.5);
	            $ruler.append( '<span class="ruler ' + ( (i+1) % 2 ? 'odd' : 'even' ) +'">' + num + '</span>' );
	        }
			$slider.append( $ruler );
		}

		return $slider;
	}
	$.fn.UISliderReset = function( val ){
		return this.setUISliderValues( [ this.data('start'), this.data('end') ] );
	}

	$.fn.isUISliderReset = function(){
		var values = this.getUISliderValues();
		return values[0] == this.data( 'start' ) && values[1] == this.data( 'end' );
	}

	$.fn.getUISliderValues = function(){
		var $slide = this.children( '.scm-ui-slide' );
		return $slide.slider( 'values' );
	}
	$.fn.setUISliderValues = function( val ){
		var $slide = this.children( '.scm-ui-slide' );
		$slide.slider( 'values', val )
		return this;
	}

	// **********************************************
	// GET UI Tools
	// **********************************************

	// ********************************************** SORTABLE

	$.fn.UISortableOrderAdjust = function(){
        return this.each( function(){
            $(this).attr( 'data-order', $(this).index() + 1 );
        });
    }
    $.fn.UISortableOrder = function(){
        return this.each( function(){
            if( !$(this).attr( 'data-order' ) )
                $(this).attr( 'data-order', $(this).index() + 1 );
        });
    }
    $.fn.UISortable = function( action, off ){

    	if( !$.functionExists( 'sortable' ) )
			return this;

        var $active = $(this).children().UISortableOrder().end().sortChildren( 'data-order' );
        var $inactive = off;

        //$active.children().UISortableOrderAdjust();

        if( action ) $active.on( 'sorted', action );

        $active.sortable({
            connectWith: $inactive || false,
            cancel: '',
            containment: $active.parent(),
            scroll: false,
            revert: true,
            over: function(e,ui){
                $(this).addClass( 'sortover' );
            },
            out: function(e,ui){
                $(this).removeClass( 'sortover' );
            },
            start: function(e,ui){
                $('.tooltip').css( 'visibility', 'hidden' );
                ui.item.parents('.scm-ui').addClass( 'sorting' );
            },
            stop: function(e,ui){
                ui.item.parents('.scm-ui').removeClass( 'sorting' );
                if( !ui.item.parent().is( $active ) ){
                    ui.item.addClass( 'off' );
                    ui.item.attr( 'data-order', 0 );
                }else{
                    ui.item.siblings().andSelf().UISortableOrderAdjust();
                }
                $active.trigger( 'sorted' );
            }
        });
                
        if( $inactive )
            $inactive.sortable({
                connectWith: $active,
                cancel: '',
                containment: $active.parent(),
                scroll: false,
                revert: true,
                over: function(e,ui){
                    $(this).addClass( 'sortover' );
                },
                out: function(e,ui){
                    $(this).removeClass( 'sortover' );
                },
                start: function(e,ui){
                    $('.tooltip').css( 'visibility', 'hidden' );
                    ui.item.parents('.scm-ui').addClass( 'sorting' );
                },
                stop: function(e,ui){
                    ui.item.parents('.scm-ui').removeClass( 'sorting' );
                    if( ui.item.parent().is( $active ) ){
                        ui.item.removeClass( 'off' );
                        ui.item.siblings().andSelf().UISortableOrderAdjust();
                    }
                    $active.trigger( 'sorted' );
                }
            });
        
        return this;
    }

} )( jQuery );