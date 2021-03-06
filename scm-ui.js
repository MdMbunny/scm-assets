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

			$.UILabel = function( icon, text, tag, cls, icls ){
				cls = ( cls ? cls : ( tag ? tag : 'label' ) );
				tag = ( tag ? tag : 'span' );
				text = ( text ? text : '' );

				icon = ( icon == 'none' ? '' : icon );
				
				var html = getIcon( icon, icls ) + text;

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

				var $input = $( '<input type="' + type + '" name="' + type + '-input" class="' + type + '-input" value="' + text + '"' + ( undefined !== min && $.isNumeric( min ) ? ' min' + ( type == 'number' ? 'length' : '' ) + '="' + min + '"' : '' ) + ( undefined !== max && $.isNumeric( max ) ? ' max' + ( type == 'number' ? 'length' : '' ) + '="' + max + '"' : '' ) + '>' );

				var $button = $.UILabel( icon, '', 'div', 'scm-ui-button scm-ui-input scm-ui-comp' ).addClass( cls );
				if( before )
					$button.append( $input.addClass('before') );
				else
					$button.prepend( $input.addClass('after') );

				$button
					.on( 'click', action )
					.on( 'focusout', function(e){
						$button.removeClass( 'focus' );
					});
				$input
					.on( 'focus', function(e){
						$button.addClass( 'focus' );
					})
					.on( 'focusout', function(e){
						if( !icon )
							$button.trigger( 'click' );
					})
					.on( 'click keyup', function(e){
						e.stopPropagation();
						//e.preventDefault();
						if( e.key == 'Enter' )
							$button.UIInput().blur();//.end().next().focus();
						else if ( e.key )
							$button.trigger( 'change', [ $input.val() ] );
					});

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

			$.fn.UIInputError = function( msg, cls, mouse, ico ){
	    		if( !$(this).hasClass( 'error' ) )
					$(this).addClass( 'error' ).append( $.getIcon( ico || 'fa-exclamation-circle-s', 'input-icon error-icon appended' ).addClass( cls ).addTooltip( '<span class="tip ' + cls + '">' + ( msg || 'Entry is not valid' ) + '</span>', mouse, ( mouse ? 'mouse' : '' ), 'nw' ).setTooltip() );
			}
			$.fn.UIInputSuccess = function( cls, ico ){
	    		if( !$(this).hasClass( 'success' ) )
					$(this).addClass( 'success' ).append( $.getIcon( ico || 'fa-check-circle-s', 'input-icon success-icon appended' ).addClass( cls ) );
			}
			$.fn.UIInputValid = function(){
				if( $(this).hasClass( 'success' ) )
					$(this).removeClass( 'success' ).children( '.success-icon' ).remove();
				if( $(this).hasClass( 'error' ) )
					$(this).removeClass( 'error' ).children( '.error-icon' ).remove();
			}


			// ********************************************** AUTOCOMPLETE

			$.fn.addUIAutocomplete = function( arr, list, events, parent ){

				var $this = $( this );

				var split = function( val ){
			    	return val.split( /,\s*/ );
			    };
			    
			    var extractLast = function( term ){
			    	return split( term ).pop();
    			};

				var open = function( event, ui ){
					if( events && events.open ) events.open(event,ui);
		    	};
		    	var change = function( event, ui ){
		    		if( events && events.change ) events.change(event,ui);
		    	};
				
				var focus = function( event, ui ){
					if( list == 'multi' ) return false;
			    	if( events && events.focus ) events.focus(event,ui);
			    };

			    var select = function( event, ui ){
				    if( list == 'multi' ){
				    	var terms = split( this.value );
				    	if( inArray( terms, ui.item.value ) ) return false;
				    	terms.pop();
						terms.push( ui.item.value );
						this.value = terms.join( ', ' );
						return false;
					}
			    	if( events && events.select ) events.select(event,ui);
		    	};

			    $this.autocomplete( {
			    	appendTo: parent || $this,
			    	minLength: 0,
			    	source: list != 'multi' ? arr : function( request, response ) {
			        	response( $.ui.autocomplete.filter( arr, extractLast( request.term ) ) );
			        },
			    	select: select,
			    	open: open,
			    	change: change,
			    	focus: focus,
				} );

				$this.off( 'focusin' ).on( 'focusin', function(e){
					$( '.ui-autocomplete' ).css( { 'min-width': $this.outerWidth() } );
					$this.autocomplete( 'enable' );
					$this.autocomplete( 'search', '' );
				} )

				return $this;
			}
			$.fn.disableUIAutocomplete = function(){

				var $this = $( this );
				$this.autocomplete( 'disable' );
				$this.off( 'focusin' );

				return $this;

			}

			// ********************************************** CALENDAR INPUT

			$.UICalendar = function( action, icon, text, cls, min, max, before ){

				var $button = $.UIInput( action, icon, text, 'date-picker scm-ui-calendar', min, max, before ).addClass( cls )
					.UIInput()
					.off( 'keyup' ).on( 'keyup', function(e){
						e.stopPropagation();
						if ( e.key && e.key != 'Enter' )
							$button.trigger( 'change', [ $(this).val() ] );
					})
					.datepicker({
						dateFormat: 'dd-mm-yy',
						constrainInput: true,
						onSelect: function(d){ $button.trigger( 'click', [ d ] ) },
					})
					.end().on( 'click', function(e){
						$button.datepicker( 'setDate', $button.UIInputValue() ).datepicker( 'hide' );
					});

				return $button;
			}

			// ********************************************** TIMER INPUT

			$.UITimer = function( action, icon, text, sep, cls, mh, mm, before ){
				var $hours = $( '<input type="number" name="number-input" class="number-input hours" value="0" min="0"' + ( undefined !== mh && $.isNumeric( mh ) ? ' max="' + mh + '"' : '' ) + '>' );
				var $mins = $( '<input type="number" name="number-input" class="number-input mins" value="0" min="0"' + ( undefined !== mm && $.isNumeric( mm ) ? ' max="' + mm + '"' : '' ) + '>' );

				var $sep = $( '<span class="separator">' + ( sep || ':' ) + '</span>' );

				var $button = $.UILabel( icon, '', 'div', 'scm-ui-timer scm-ui-button scm-ui-input scm-ui-comp' ).addClass( cls );
				if( before )
					$button.append( $hours.addClass('square') ).append( $sep ).append( $mins.addClass('before') );
				else
					$button.prepend( $mins.addClass('after') ).prepend( $sep ).prepend( $hours.addClass('square') );

				$button.UITimerValue( text );

				$button
					.on( 'click', action )
					.on( 'focusout', function(e){
						$button.removeClass( 'focus' );
					})
				.UITimer()
					.on( 'focus', function(e){
						$button.addClass( 'focus' );
					})
					.on( 'focusout', function(e){
						if( !icon )
							$button.trigger( 'click' );
					})
					.on( 'change', function(e){
						$(this).val( parseInt( $(this).val() ) );
					})
					.on( 'click keyup', function(e){
						e.stopPropagation();

						if( e.key == 'Enter' )
							$button.trigger( 'click' ).UIInput();//.focusout().end().next().focus();
						else if ( e.key )
							$button.trigger( 'change', [ $(this).val() ] );
					});

				return $button;

			}
			$.fn.UITimer = function(){
				return this.children( 'input' );
			}
			$.fn.UITimerHours = function(){
				return this.children( 'input.hours' );
			}
			$.fn.UITimerMins = function(){
				return this.children( 'input.mins' );
			}
			$.fn.UITimerSeparator = function(){
				return this.children( 'span.separator' );
			}
			$.fn.UITimerValue = function( val, trigger ){
				var sep = this.UITimerSeparator().text()
				if( undefined === val )
					return parseInt( this.UITimerHours().val() ) + sep + parseInt( this.UITimerMins().val() );
				
				val = val ? val.split( sep || ':' ) : [ 0, 0 ];
				this.UITimerHours().val( parseInt( val[0] ) );
				this.UITimerMins().val( parseInt( val[1] ) );
				if( trigger )
					this.trigger( 'click' );
				
				return this;

			}

			// ********************************************** SELECT INPUT

			$.UISelect = function( action, icon, val, cls, opts, create ){

				var $select = $( '<select></select>' );

				var $button = $.UILabel( icon, '', 'div', 'scm-ui-button scm-ui-select scm-ui-comp', 'appended' ).addClass( cls ).prepend( $select );

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
			$.fn.UISelectOption = function(){
				return $(this).UISelect().find( 'option:selected' ).text();
			}
			
			$.fn.UISelectValue = function( val, trigger ){
				if( undefined === val )
					return $(this).UISelect().val();
				
				$(this).UISelect().val( val );
				if( trigger )
					$(this).UISelect().trigger( 'change' );

				return $(this);
				
			}

			// ********************************************** LINK

			$.UILink = function( href, target, icon, text, cls ){

				var $button = $.UILabel( icon, text, 'a', 'scm-ui-link scm-ui-button' ).addClass( cls );

				$button.attr( 'href', href || '' );
				$button.attr( 'target', target || '_self' );
				
				return $button;
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

				$.UIButtonFile = function( id, action, icon, upload, cls, both ){

					id = ( id ? id : 'file' );
					upload = ( upload ? upload : '' );
					icon = ( icon ? icon : 'fa-file-code-o' );

					var $file = $( '<input id="' + id + '-input" type="file" name="' + id + '-input" />' ).on( 'change', action ).addClass( both ).addClass('scm-ui-upload-input');
					var $upload = $.UILabel( icon, upload, 'label' ).attr( 'id', id + '-button' ).attr( 'for', id + '-input' ).addClass( both ).addClass( cls ).addClass('scm-ui-button');

					return $file.add( $upload );
				};

				$.UIButtonFiles = function( id, action, icon, upload, send, cls, both ){

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
							$but_upload.trigger( 'file', [$(this).val()] );
						}else{
							$but_upload.addClass('disabled');
							$but_upload.addClass('hidden');
							$lab_upload.addClass('scm-ui-button').removeClass('is-file').text( upload ).prepend( cache );
							$but_upload.trigger( 'file', [false] );
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
				var plus = false;
				if( action && typeof action == 'string' ){
					if( action == 'plus' ){
						plus = 'plus';
						action = 'siblings';
					}else if( action == 'add' ){
						plus = 'add';
						action = 'siblings';
					}
					if( action != 'normal' ){
						fun = fun + capitalizeFirstLetter( action );
					}
					action = false;
				}

				var $but = $.UIButton( action, ( active || !iconb ? icona : iconb ), ( active || !textb ? texta : textb ), cls )
					.addClass( 'scm-ui-toggle' )
					.toggleClass( 'off', !active )
					.toggleClass( 'on', active )
					.data( 'icon-on', icona )
					.data( 'icon-off', iconb || icona )
					.data( 'text-on', texta )
					.data( 'text-off', textb || texta )
					.on( 'click', function( e ){
						if( !$(this).hasClass('disabled') ){

							if( !plus )
								$(this)[fun]();
							else
								$(this)[fun]( $(e.target).hasClass( 'toggle-plus' ) ? plus : false );
							
							$(this).trigger( 'toggle', [ $(this).hasClass( 'on' ) ] );
						}
					} );

				if( plus )
					$but.addClass( 'scm-ui-toggle-plus' ).prepend( getIcon( ( !active ? 'fa-plus' : 'fa-minus' ), 'fal faicon prepend toggle-plus' ) );

				return $but;

			}
			$.UIToggleButtonOn = function( group, action, active, icona, iconb, texta, textb, cls ){
				var $toggle = $.UIToggle( action, active, icona, iconb, texta, textb, cls ).data( 'toggle-group', group ).data( 'toggle-group-type', 'on' );
				group.each( function(){
					$(this).on( 'toggled', function(e,on){
						if( !on ) $toggle.UIToggle( false, true )
						else if( !$(this).siblings('.filter.off').length ) $toggle.UIToggle( true, false )
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
			
			// ************

			$.fn.UIToggleUnique = function( opt ){

				this.siblings( '.on' ).not( '.no-toggle' ).UIToggle();
				this.UIToggle();

				return this;
			}
			$.fn.UIToggleSiblings = function( opt ){

				var $off = this.siblings( '.off' ).not( '.no-toggle' );
				var $on = this.siblings( '.on' ).not( '.no-toggle' );

				if( this.hasClass('on') ){
					if( opt == 'add' )
						this.UIToggle();
					else if( $off.length && !$on.length )
						$off.UIToggle();//.find( '.toggle-plus' ).addClass( 'hidden' );
					else if( opt == 'plus' )
						this.UIToggle();
					else
						$on.UIToggle();//.find( '.toggle-plus' ).removeClass( 'hidden' );
				}else{
					if( !opt ) $on.UIToggle();//.find( '.toggle-plus' ).removeClass( 'hidden' );
					this.UIToggle();//.find( '.toggle-plus' ).addClass( 'hidden' );
				}

				return this;
			}

			// ************

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
						.find( '.faicon:not(.toggle-plus)' )
						.removeClass()
						.addClass( 'fa ' + ( !on && this.data( 'icon-off' ) ? this.data( 'icon-off' ) : this.data( 'icon-on' ) ) )
						.FAFIX();
				}

				this.find( '.toggle-plus' ).toggleClass( 'fa-minus' ).toggleClass( 'fa-plus' );

				this.trigger( 'toggled', [ this.hasClass( 'on' ) ] );
				
				return this;
			}
			$.fn.UIToggleValue = function( val ){
				if( undefined !== val )
					return $(this).UIToggle( val, !val );
				return this.hasClass( 'on' );
			}

		// ********************************************** CONTAINER RADIOS

		$.UIRadios = function( action, id, cls ){

			var $list = $( '<div' + ( id ? ' id="' + id + '"' : '' ) + ( cls ? ' class="' + cls + '"' : '' ) + '></div>' )
				.addClass( 'scm-ui-radios' )
				.addClass( 'scm-ui-comp' );

			$list.on( 'select', action );

			return $list;

		}
		$.fn.UIRadiosValue = function( val, trigger ){
			if( undefined !== val ){
				var $input = this.find( '.scm-ui-radio[value="' + val + '"]' );
				if( $input.length ){
					if( trigger )
						$input.trigger( 'click' );
					else
						$input.UIToggle();
				}
				return this;
			}
			return this.find( '.scm-ui-radio.off' ).attr( 'value' );
		}

			// ********************************************** RADIO INPUT

			$.UIRadio = function( action, value, active, icona, iconb, texta, textb, cls ){
				
				var $button = $.UIToggle( action, !active, iconb, icona, texta, textb, cls )
					.addClass( 'scm-ui-radio' )
					.attr( 'value', value );

				$button
					.off( 'click' )
					.on( 'click', function( e ){
						if( !$(this).hasClass('disabled') && !$(this).hasClass('off') ){

							$(this)
								.UIToggle()
								.trigger( 'toggle', [ $(this).attr( 'value' ) ] )
								.siblings( '.off' ).not( '.no-toggle' ).UIToggle();
								

							var $parent = $(this).parents( '.scm-ui-radios' );
							if( $parent.length )
								$parent.trigger( 'select', [ $(this).attr( 'value' ) ] );
						}
					} );

				return $button;
			}
			$.fn.UIRadioValue = function( val ){
				return this.UIToggleValue( val );
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
			
			return $.UIContent( options ).addClass( 'scm-ui-tabs' );

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
				var $ui = this.parents( '.scm-ui' );

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

			if( on ) $input.attr( 'checked', '' );
			else $input.removeAttr( 'checked' );
			$input.attr( 'value', ( on ? 'checked' : '' ) );

		});

		return $button;
	}
	$.fn.UICheckbox = function(){
		return this.children( 'input' );
	}

	// ********************************************** RADIO BUTTONS INPUT
	
	$.UIRadioButtons = function( action, id, opt ){

		var $list = $.UIContent( id, opt )
			.addClass( 'scm-ui-radiolist' )
			.addClass( 'scm-ui-comp' );

		$list.on( 'select', action );

		return $list;

	}
	$.UIRadioButton = function( action, name, value, active, icon, text, cls, append ){

		var $input = $( '<input type="radio" name="' + ( name || 'radio-input' ) + '" class="radio-input" value="' + ( value || '' ) + '"' + ( active ? ' checked' : '' ) + '>' )
			.addClass( cls );
		
		var $button = $.UILabel( icon, text, 'div', cls )
			.addClass( 'scm-ui-input' );
		
		if( append )
			$button.append( $input.addClass( 'append' ) ).addClass( 'input-append' );
		else
			$button.prepend( $input.addClass( 'prepend' ) ).addClass( 'input-prepend' );

		$input.on( 'change', function(e){
			$input.attr( 'checked', '' );
			var $parent = $input.parents( '.scm-ui-radiolist' );
			if( $parent.length ){
				var $sib = $parent.find( '.radio-input[name="' + ( name || 'radio-input' ) + '"]' ).not( $input );
				if( $sib.length ) $sib.removeAttr( 'checked' );
				$parent.trigger( 'select', [ $input.attr( 'value' ) ] );
			}
		});

		return $input;
	}
	$.fn.UIRadioButton = function(){
		return this.children( 'input' );
	}

	

} )( jQuery );