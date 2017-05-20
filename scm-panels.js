( function($){

	// **********************************************
	// GET Details Panels
	// **********************************************

	$.fn.showPanel = function( id, cls, content, dir ){

		var dir = ( dir ? dir : 'top' );
		var mov = ( dir == 'top' ? 'bottom' : ( dir == 'bottom' ? 'top' : ( dir == 'left' ? 'right' : 'left' ) ) );
		var cls = ( cls ? ' ' + cls : '' );

		var first = !this.hasClass( 'opened' );
		if( first ){

			this.children().hide();
			this.addClass( 'opened' ).enableIt();
		
		}else{

			this.children( '.panel-content' ).last().addClass( 'prev' ).disableIt( true );

		}
		
		var $content = this.find( '#' + id );
		if( !$content.length ){
			$content = $( '<div id="' + id + '" class="panel-content' + cls + '"></div>' );
			$content = ( $.isFunction( content ) ? content( $content ) : $content );
		}
		if( !$content ) return;
		$content.hide().detach().appendTo( this );		

		this.attr( 'data-content', '#' + id );
		
		//$content.find('img.preload').hide().imagesLoaded().progress( function( instance, image ) {
		$content.find('img.preload').hide().eventImages().on( 'imgLoaded', function( instance, image ) {
			
			var $img = $(this);
			var time = ( $img.data( 'preload' ) ? parseInt( $img.data( 'preload' ) ) : 500 );
			$img.removeClass('preload').css({'margin-top':'-5em', 'margin-bottom':'5em', 'opacity':'0'}).show().animate({'opacity':'1', 'margin-top':'0em', 'margin-bottom':'0em'}, time ).siblings('.scm-loading').remove();
			
		});

		if( first ){
			$( 'body' ).addClass( 'panels-opened' ).trigger( 'openpanels', [ $content ] );
		}

		this.show();

		$content.disableIt().trigger( 'showingpanel' );

		var movein = function(){
			$content.enableIt( true );
			if( first ) $( 'html, body' ).disableIt( true );
			$content.enableIt().trigger( 'showpanel' );
		}

		if( $content.hasClass( 'img' ) )
			$content.moveIn( movein, mov, '', 600 );
		else
			$content.openIn( movein, dir, '0', 600 );

		/*var anim = {};
		anim[dir] = '0';
		var css = {};
		css[dir] = '100%';

		$content.css( css ).show().animate( anim, 600, 'easeOutSine', function(){
			$content.enableIt( true );
			if( first ) $( 'html, body' ).disableIt( true );
			$content.trigger( 'showpanel' );
		} );*/

		return $content;
		
	}

	$.fn.hidePanel = function( dir ){

		var dir = ( dir ? dir : 'top' );
		var mov = ( dir == 'top' ? 'bottom' : ( dir == 'bottom' ? 'top' : ( dir == 'left' ? 'right' : 'left' ) ) );

		var $prev = this.children( '.prev' );
		var prev = $prev.length;
		var $content = this.children( '.panel-content' ).last().disableIt( true );
		var $this= this;

		if( !prev ){
			$('html, body').enableIt( true )
			$('body').removeClass( 'panels-opened' ).trigger( 'closepanels' );
		}else{
			$prev.last().removeClass( 'prev' );
		}

		$content.trigger( 'hidingpanel' );

		var moveout = function(){
			$content.hide();
			if( prev ){
				$prev.last().enableIt( true );
				$content.detach().prependTo( $this );//insertBefore( $prev.last().removeClass( 'prev' ).enableIt( true ) );
				$this.attr( 'data-content', '#' + $prev.last().attr( 'id' ) );
			}else{
				$this.hide().attr( 'data-content', '' ).disableIt().removeClass( 'opened' );
				$this.children().disableIt( true );
			}
			$content.trigger( 'hidepanel' );

		}
		if( $content.hasClass( 'img' ) )
			$content.moveOut( moveout, mov, 600 );
		else
			$content.openOut( moveout, dir, 600 );

		/*var anim = {};
		anim[dir] = '100%';

		$last.animate( anim, 600, 'easeInSine', function(){
			$last.hide();
			if( prev ){
				$prev.last().enableIt( true );
				$last.detach().prependTo( $this );//insertBefore( $prev.last().removeClass( 'prev' ).enableIt( true ) );
				$this.attr( 'data-content', '#' + $prev.last().attr( 'id' ) );
			}else{
				$this.hide().attr( 'data-content', '' ).disableIt().removeClass( 'opened' );
				$this.children().disableIt( true );
			}
			$last.trigger( 'hidepanel' );

		} );*/

		return $content;
		
	}
	$.Panels = function( cls, noclose ){
		
		cls = ( !cls ? '' : ' ' + cls );

		var $panel = $( '<div id="scm-panels" class="scm-panels' + cls + ' disabled" data-content></div>' ).hide();
		
		if( !noclose ){
			$panel.addClass('click').click( function(e){

				if( $( e.target ).hasClass( 'scm-panels' ) ){

					$( e.target ).hidePanel();
					e.preventDefault();
					e.stopPropagation();
				}
				
			} );
		}


		return $panel;
	}



} )( jQuery );