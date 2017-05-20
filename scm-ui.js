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
		var $ui = $( '<div></div>' ).attr( 'id', options.id ).addClass( 'scm-ui' ).addClass( options.classes ).css( options.css );

		return $ui.objToData( options.data );
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
				children.length ? this.children( '.scm-ui-content' ).last().before( $content ) : this.prepend( $content );
			else
				children.length ? this.children( '.scm-ui-content' ).first().after( $content ) : this.append( $content );

			return $content;

		}


			// ********************************************** LABEL

			$.UILabel = function( icon, text, tag, cls ){
				cls = ( cls ? cls : ( tag ? tag : 'label' ) );
				tag = ( tag ? tag : 'span' );
				text = ( text ? text : '' );
				
				var html = getIcon( icon ) + text;

				return $( '<' + tag + ' class="scm-ui-label">' + html + '</' + tag + '>' ).addClass( cls ).addClass( text ? ' text' : ' icon' );
			}

			// ********************************************** TEXT INPUT

			$.UITextInput = function( action, icon, text, cls ){

				/*cls = ( cls ? cls : '' );
				text = ( text ? text : '' );

				var html = getIcon( icon );*/
				var $input = $( '<input type="text" name="text-input" value="' + text + '">' );

				//var $button = $( '<button class="scm-ui-button scm-ui-input">' + html + input + '</button>' ).addClass( cls );

				var $button = $.UILabel( icon, '', 'button', 'scm-ui-button scm-ui-input' ).addClass( cls ).append( $input );

				$button.click( action );
				$input.click( function(e){ e.stopPropagation(); } );
				
				return $button;

			}

			// ********************************************** BUTTON

			$.UIButton = function( action, icon, text, cls ){

				var $button = $.UILabel( icon, text, 'button', 'scm-ui-button' ).addClass( cls );

				if( typeof action == 'string' )
					$button.attr( 'data-href', action );
				else
					$button.click( action );
				
				return $button;
			}

				// ********************************************** UPLOAD

				$.UIButtonFile = function( id, action, icon, upload, send, cls ){


					id = ( id ? id : 'file' );
					send = ( send ? send : 'Send' );
					upload = ( upload ? upload : 'Upload' );
					icon = ( icon ? icon : 'fa-file-code-o' );

					var act_input = function(e){

						var $but_upload = $( this ).siblings( '#upload-' + id );
						var $lab_upload = $( this ).siblings( '#upload-' + id + '-button' );

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

					var $send = $.UIButton( action, 'fa-upload', send ).attr( 'id', 'upload-' + id ).addClass( cls ).addClass( 'hidden disabled' ).addClass('scm-ui-button');
					var $file = $( '<input id="upload-' + id + '-input" type="file" name="upload-' + id + '-input" />' ).on( 'change', act_input ).addClass('scm-ui-upload-input');
					var $upload = $.UILabel( icon, upload, 'label' ).attr( 'id', 'upload-' + id + '-button' ).attr( 'for', 'upload-' + id + '-input' ).addClass( cls ).addClass('scm-ui-button');


					return $send.add( $file ).add( $upload );
				};

		// ********************************************** CONTAINER TABS

		$.UITabs = function( id, opt ){

			var defaults = {
				id: ( typeof id == 'string' ? id : 'scm-ui-tabs' ),
				classes: '',
				css: {},
				position:'top',
			};

			opt = ( opt ? opt : ( id && typeof id != 'string' ? id : {} ) );

			var options = $.extend( defaults, opt ),
				$tabs = $.UIContent( opt ).addClass( 'scm-ui-tabs' ).attr( 'data-from', options.position );

			return $tabs;

		}
		$.fn.addUITabs = function( opt, prepend ){

			var $tabs = $.UITabs( opt );

			if( prepend ) return $tabs.prependTo( this );
			return $tabs.appendTo( this );
		}

		// ********************************************** TAB

			$.UITab = function( tab, icon, text, cls ){
				var action = function(e){

					e.preventDefault();
					e.stopPropagation();

					var $tab = $(this);

					if( $tab.hasClass('disabled') ){
						$tab.disableUITab();
					}else{
						$tab.enableUITab();
					}
				}

				return $.UIButton( action, icon, text, cls ).addClass( 'scm-ui-tab' ).attr( 'data-tab', tab );

			}
			$.fn.enableUITab = function( complete ){
				
				var $this = this;
				var $ui = this.parents( '.scm-ui' );

				var $active = this.siblings( '.disabled' );

				if( $active.length ){

					$active.disableUITab( function(){ $this.enableUITab() } );
					return this;

				}				

				var $wrap = $ui.find( '.scm-ui-content#' + this.data('tab') );
				if( $wrap.length ){

					var dir = ( this.parent().data( 'from' ) ? this.parent().data( 'from' ) : 'top' );
					var anim = {};
					anim[dir] = 0;

					$wrap.addClass( 'active' ).show();

					$ui.css( dir, - $wrap.outerHeight() ).animate( anim, 300, 'easeOutSine', function(){
						if( $.isFunction( complete ) ) complete();
					} );

				}

				$this.addClass( 'disabled' );
				
				return this;

			}
			$.fn.disableUITab = function( complete ){
				
				var $this= this;
				var $ui = this.parents( '.scm-ui' );
				var $wrap = $ui.find( '.scm-ui-content.active#' + this.data('tab') );

				if( $wrap.length ){

					var dir = ( this.parent().data( 'from' ) ? this.parent().data( 'from' ) : 'top' );
					var anim = {};
					anim[dir] = - $wrap.outerHeight();
					$ui.animate( anim, 300, 'easeOutSine', function(){
						$wrap.hide().removeClass( 'active' );
						$ui.css( dir, 0 );
						$this.removeClass( 'disabled' );
						if( $.isFunction( complete ) ) complete();
					} );

				}else{

					this.removeClass( 'disabled' );

				}
				
				return this;
			}


} )( jQuery );