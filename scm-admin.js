( function($){

		var $body = jQuery( 'body' );

		// ADMIN MENU

		if( $body.hasClass( 'scm-edit' ) ){

			jQuery( jQuery( '#adminmenu > .wp-has-current-submenu' ).prevAll('.scm-separator')[0] ).addClass('current').addClass('active').nextUntil( '.scm-separator' ).addClass('active');

			jQuery( '#adminmenu' ).on( 'click', '.scm-separator', function(e){
				var $this = jQuery( this );
				//if( $this.hasClass('acf-fc-layout-handle') ){
				if( $this.hasClass( 'active' ) ){
					$this.removeClass( 'active' );
					$this.nextUntil( '.scm-separator' ).removeClass( 'active' );
				}else{
					$this.siblings().removeClass( 'active' );
					$this.addClass('active');
					$this.nextUntil( '.scm-separator' ).addClass('active');
				}
			} );
		}

		// COLLAPSE LAYOUTS

		var $layout = jQuery('.acf-flexible-content .layout' );
		jQuery('.acf-field .acf-label label:empty').addClass('empty');

		$layout.addClass( '-collapsed' );

		$body.on('click', function(e){
			var $this = jQuery( e.target );
			if( $this.hasClass('acf-fc-layout-handle') ){
				$this.parent('.layout').siblings('.layout').addClass('-collapsed');
			}else if( $this.parents('.layout').length == 0 ){
				$body.find('.layout').addClass('-collapsed');
			}
		} );

		// CONTROL MENU

		var $publish = jQuery( '#publishing-action, #edittag p.submit' );
		$publish.prepend( '<i class="fa fa-floppy-o"></i>' );
		$publish.prepend( '<i class="fa fa-spin fa-cog"></i>' );

		jQuery( '#major-publishing-actions' ).append( '<div id="options-action" style="cursor:pointer;"><i class="fa fa-bars"></i><div>' );
		jQuery( 'body:not(.post-new-php):not(.post-php) #options-action' ).css( 'display', 'none' );
		jQuery( 'body.post-php #save-action' ).css( 'display', 'none' );
		
		var $stuff = jQuery( '#poststuff' );

		var $options = jQuery( '#options-action' );
		$options.on( 'click', function(e){
			if( $stuff.hasClass( 'options' ) ){
				$stuff.removeClass( 'options' );
				$options.find( '.fa' ).addClass( 'fa-bars' ).removeClass( 'fa-times' );
			}else{
				$stuff.addClass( 'options' );
				$options.find( '.fa' ).addClass( 'fa-times' ).removeClass( 'fa-bars' );
			}
		} );


		jQuery( '#delete-action a' ).prepend( '<i class="fa fa-trash-o"></i>' );
		jQuery( '#delete-action a' ).prepend( '<i class="fa fa-spin fa-cog"></i>' );


		function htmlEntities(str) {
		    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
		}
	

		var $save = jQuery( '#save-action' );
		if( $save.find( '.button' ).size() > 0 ){
			$save.prepend( '<i class="fa fa-file-o"></i>' );
			$save.prepend( '<i class="fa fa-spin fa-cog"></i>' );
		}

		jQuery( '#preview-action a' ).prepend( '<i class="fa fa-search"></i>' );


		jQuery( '#delete-action .deletion, #save-action .button, #publishing-action .button, #edittag p.submit' ).on( 'click', function(e){
			jQuery( 'div' ).remove( '.acf-error-message' );
			$body.addClass( 'loading' );
			checkDOMChange();
		});

		function checkDOMChange( cdc ){
		    
		    var $error = jQuery( '.acf-error-message' );
		    
		    if( !$error.length ){
			    setTimeout( checkDOMChange, 500 );
			    return;
			}

			$body.removeClass( 'loading' );

		}

		
		// TEMPLATES

		var $open_post = jQuery( '.posts-repeater .acf-row .order' );
		$open_post.on( 'click', function(e){
			var $this = jQuery( this );
			var $next = $this.next( '.acf-fields' );
			var id = $next.find( '[data-name="id"] input' ).val();
			window.location.href = 'post.php?post=' + id + '&action=edit';
		} );

		// ONLY ADVANCED ADMIN

		if( $body.hasClass( 'scm-advanced' ) ){

			// ADVANCED FIELDS
		
			var $adv = jQuery( '.scm-advanced-options' );
			var advanced = false;

			$body.on( 'keydown', function(e){
				if( e.key == 'Alt' ){
					$adv = jQuery( '.scm-advanced-options' );
				}
			} );

			$body.on( 'keyup', function(e){
				if( e.key == 'Alt' ){
					if( advanced ){
						advanced = false;
						$adv.addClass( 'hidden' );
					}else{
						advanced = true;
						$adv.removeClass( 'hidden' );
					}
				}
			} );

			// SHOW FIELD KEY

			$body.on( 'mouseenter', '.acf-field', function(e){
				var $this = jQuery(this);

				if( $this.hasClass( 'acf-field' ) ){
					jQuery( '.show-field-key' ).remove();
					if ( e.altKey ){
						e.stopPropagation();
						$this.append( '<div class="show-field-key">' + $this.attr( 'data-name' ) + '</div>' );
					}else if ( e.shiftKey){
						e.stopPropagation();
						$this.append( '<div class="show-field-key">' + $this.attr( 'data-key' ) + '</div>' );
					}
				}
			} );

			$body.on( 'mouseleave', '.acf-field', function(e){
				var $this = jQuery(this);
				if( $this.hasClass( 'acf-field' ) ){
					jQuery( '.show-field-key' ).remove();
				}
			} );

		    $body.on('click', function(e){
		    	var $this = jQuery( e.target );
				if( e.target.className.indexOf( 'show-field-key' ) > -1 ){
					if ( e.altKey || e.shiftKey ){
						e.stopPropagation();
						e.preventDefault();
				        var path = $this.html();
				        path = path.replace(/ &amp;gt; /g,".");
				        $path.val(path);
				        $wrap.addClass( 'opened' );
				        $path.focus();
				        $path.select();
			    	}else{
			    		$wrap.removeClass( 'opened' );
				    }
				}else{
					if( $this.attr('id') !== 'copypath' )
						$wrap.removeClass( 'opened' );
				}
		    });
			
			var $path = jQuery('<textarea id="copypath"></textarea>'),
				$wrap = jQuery('<div id="toppathwrap"></div>'),
				$fields = jQuery( '.acf-field' );

			$wrap.append( $path );
			$body.append( $wrap );

		}		

		// LOADED

		jQuery(window).load(function() {
			$body.addClass( 'loaded' );
		});


} )( jQuery );