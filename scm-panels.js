var PANELS = false;

( function($){

	// **********************************************
	// GET Details Panels
	// **********************************************

	$.fn.overPanel = function( id, cls, content, dir ){

		return this.showPanel( id, cls, content, dir, true );
		
	}

	$.fn.showPanel = function( id, cls, content, dir, prev ){

		var dir = ( dir ? dir : 'bottom' );
		//var opp = oppositePos( dir );
		//var mov = ( dir == 'top' ? 'bottom' : ( dir == 'bottom' ? 'top' : ( dir == 'left' ? 'right' : 'left' ) ) );
		var cls = ( cls ? ' ' + cls : '' );

		var $content = this.find( '.panel-content#' + id ).removeClass( 'prev' );
		var first = false;
		//var open = !this.hasClass( 'opened' );

		var $prev = this.children( '.panel-content.enabled' ).last();
		var open = !$prev.length;

		/*if( $content.hasClass( 'prev' ) && $content.next().is( $prev ) ){
			return this.hidePanel( dir );
		}*/

		if( !$content.length ){
			//if( this.data( 'panels' )[id] ){
			//	$content = $( this.data( 'panels' )[id] );
			//}else{
				first = true;
				$content = $( '<div id="' + id + '" class="panel-content' + cls + '"></div>' );
				$content = ( $.isFunction( content ) ? content( $content ) : $content );
				$content.addClass( 'anim-' + dir );
				//this.data( 'panels' )[id] = $('<div>').append( $content.clone() ).html();
			//}
		}
		if( !$content ) return;

		this.attr( 'data-content', '#' + id );

		if( open ){

			this.children().hide();
			this.addClass( 'opened' ).enableIt();
			$( '#site-page' ).addClass( 'panels-opened' );

			this.trigger( 'openpanels', [ first ] );
			if( PANELS ) console.log( 'Open Panels: ' + this.attr( 'id' ) );
		
		}else{

			if( prev )
				$prev.addClass( 'prev' ).disableIt( true ).trigger( 'coveringpanel', [ first, open ] );
			else
				$prev.addClass( 'prev' ).disableIt( true ).trigger( 'hidingpanel', [ first, open ] );

		}
		
		$content.hide().detach().appendTo( this );
		
		// Questa va levata da qua
		$content.find('img.preload').hide().eventImages().on( 'imgLoaded', function( instance, image ) {
			
			var $img = $(this);
			var time = ( $img.data( 'preload' ) ? parseInt( $img.data( 'preload' ) ) : 500 );
			$img.removeClass('preload').css({'margin-top':'-5em', 'margin-bottom':'5em', 'opacity':'0'}).delay(100).show().animate({'opacity':'1', 'margin-top':'0em', 'margin-bottom':'0em'}, time ).siblings('.scm-loading').remove();
			
		});

		this.show();

		$content.disableIt().trigger( 'showingpanel', [ first, open ] );

		var movein = function(){
			$content.enableIt( true );
			if( open ){
				$( 'html, body' ).disableIt( true );
			}else if( $prev.length ){
				if( prev ){
					$prev.trigger( 'coverpanel', [ first, open ] );
					if( PANELS ) console.log( 'Cover Panel: ' + $prev.attr( 'id' ) );
				}else{
					$prev.trigger( 'hidepanel', [ first, open ] );
					$prev.remove();
				}
			}
			$content.enableIt().trigger( 'showpanel', [ first, open ] );
			if( first )
				if( PANELS ) console.log( 'First Panel: ' + $content.attr( 'id' ) );
			else
				if( PANELS ) console.log( 'Show Panel: ' + $content.attr( 'id' ) );
		}

		if( dir.startsWith( 'slide-' ) )
			$content.slideIn( $prev, movein, dir.substring( 6 ), '', 600, 'inout' );
		else if( dir.startsWith( 'open-' ) )
			$content.openIn( movein, dir.substring( 5 ), '0', 600 );
		else
			$content.moveIn( movein, dir, '', 600 );

		return $content;
		
	}

	$.fn.hidePanel = function( dir ){

		var dir = ( dir ? dir : 'bottom' );
		//var mov = oppositePos( dir );

		var $prev = this.children( '.prev' ).last();
		var close = !$prev.length;
		var $content = this.children( '.panel-content' ).last().disableIt( true );
		var $this= this;

		if( close ){
			$( 'html, body' ).enableIt( true )
			$( '#site-page' ).removeClass( 'panels-opened' );

			this.trigger( 'closepanels' );
			if( PANELS ) console.log( 'Close Panels: ' + this.attr( 'id' ) );

		}else{
			$prev.removeClass( 'prev' ).trigger( 'uncoveringpanel', [ close ] );
		}

		$content.trigger( 'hidingpanel', [ close ] );

		var moveout = function(){
			$content.hide();
			if( !close ){
				
				//$content.detach().prependTo( $this );
				$this.attr( 'data-content', '#' + $prev.attr( 'id' ) );

				$prev.enableIt( true ).trigger( 'uncoverpanel', [ close ] );
				if( PANELS ) console.log( 'Uncover Panel: ' + $prev.attr( 'id' ) );

			}else{

				$this.hide().attr( 'data-content', '' ).disableIt().removeClass( 'opened' );
				$this.children().disableIt( true );

			}
			$content.trigger( 'hidepanel', [ close ] );
			if( PANELS ) console.log( 'Hide Panel: ' + $content.attr( 'id' ) );

			$content.remove();

		}
		//if( $content.hasClass( 'img' ) )
			$content.moveOut( moveout, dir, 600 );
		//else
			//$content.openOut( moveout, dir, 600 );

		return $content;
		
	}
	
	$.Panels = function( cls, noclose ){
		
		cls = ( !cls ? '' : ' ' + cls );

		var $panels = $( '<div id="scm-panels" class="scm-panels' + cls + ' disabled" data-content></div>' )
			.hide();
			//.data( 'panels', {} );
		
		if( !noclose ){
			$panels.addClass('click').click( function(e){

				if( $( e.target ).hasClass( 'scm-panels' ) ){

					$( e.target ).hidePanel();
					e.preventDefault();
					e.stopPropagation();
				}
				
			} );
		}


		return $panels;
	}



} )( jQuery );