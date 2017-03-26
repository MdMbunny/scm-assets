/*
*****************************************************
* SCM TABLES
*****************************************************
*/

(function($) {

/*
*****************************************************
*	TABLE
*****************************************************
*/

	$.fn.addTable = function( opt ){

		var defaults = {
			id: 'scm-table',
			classes: '',
			css: {},
			sortable: false,
			editable: false,
			autocomplete: false,
			head: 0,
			header: [],
			columns: 3,
			rows: 3,
			prepend: false,
			emptyrow: false,
		};

		var options = $.extend( defaults, opt ),
			$this = this;
			$table = $( '<table class="scm-table"></table>' ).attr( 'id', options.id ).addClass( options.classes ).css( options.css );

		if( options.prepend )
			$this.prepend( $table );
		else
			$this.append( $table );

		var	columns = [];

		var Head = function(){
			
			var $thead = $( '<thead></thead>' ).appendTo( $table ),
				cols = options.header,
				rows = ( options.head ? options.head : cols.length );

			for (var row = 0; row < rows; row++) {
				
				var main = ( row == rows-1 ? 'class="row-head" ' : '' ),
					$row = $( '<tr ' + main + 'data-table-row="' + row + '"></tr>' ).appendTo( $thead ),
					col = 0;

				if( cols[row] ){

					$.each( cols[row], function( key, value ) {
						var cls = ( $.isNumeric( key ) ? '' : key );
						if( main ){
							
							var name = value.name,
								fa = ( value.icon ? value.icon.startsWith('fa-') : false ),
								icon = ( value.icon ? '<i class="fa ' + ( !fa ? 'text' : value.icon ) + '">' + ( !fa ? value.icon : '' ) + '</i> ' : '' ),
								format = ( value.format ? value.format : 'string' ),
								exception = ( value.exception ? value.exception : '' ),
								decimal = ( value.decimal ? value.decimal : 0 ),
								auto = ( options.autocomplete && !value.noauto && format != 'date' ),
								sort = ( value.sort ? value.sort : '' ),
								nosort = ( value.nosort ? true : !options.sortable ),
								noedit = ( value.noedit ? true : !options.editable );

							cls = ( value.icon ? ' pin' : '' ) + ( value.color ? ' ' + value.color : '' ) + ( nosort ? ' no-sort' : ' sort' ) + ( noedit ? ' no-edit' : ' edit' );

							columns[col] = {
								slug: key,
								format: format,
								exception: exception,
								decimal: decimal,
								noedit: noedit,
								auto: auto,
							};						
							
							$row.append( '<th class="' + cls + '"' + ' data-auto-complete="' + auto + '"' + ' data-column-name="' + key + '" data-column-format="' + format + '" data-column-exception="' + exception + '"' + ' data-column-decimal="' + decimal + '"' + ' data-column-sort="' + !nosort + '"' + ' data-column-sortby="' + sort + '"' + ' data-column-edit="' + !noedit + '"' + ' data-cell="' + (row+1)*col + '" data-cell-row="' + row + '" data-cell-column="' + col + '" >' + icon + name + '</th>' );
							
						}else{
							$row.append( '<th' ( cls ? ' class="' + cls + '"' : '' ) + ' data-column-name="' + key + ' data-cell="' + (row+1)*col + '" data-cell-row="' + row + '" data-cell-column="' + col + '" >' + value + '</th>' );
						}

						col++;
					});

				}
			}
		}

		var Body = function(){
			var $tbody = $( '<tbody></tbody>' ).appendTo( $table );
			
			for (var row = 0; row < options.rows + ( options.emptyrow ? 1 : 0 ); row++) {
				var $row = $( '<tr ' + ( options.emptyrow && row == options.rows ? ' class="empty"' : '' ) + 'data-table-row="' + row + '"></tr>' ).appendTo( $tbody );
				for (var col = 0; col < options.columns; col++) {
					var column = columns[col];
					$row.append( '<td class="cell' + ( column.slug ? ' ' + column.slug : '' ) + ( column.noedit ? ' no-edit' : '' ) + '" data-column-name="' + column.slug + '" data-cell="' + (row+1)*col + '" data-cell-row="' + row + '" data-cell-column="' + col + '" data-cell-format="' + ( column.format ? column.format : 'string' ) + '" data-cell-exception="' + ( column.exception ? column.exception : '' ) + '" data-cell-decimal="' + ( column.decimal ? column.decimals : 0 ) + '" data-cell-auto="' + ( column.auto ? column.auto : false ) + '"></th>' );
				}
			}
		}	

		if( options.header.length ) Head();
		Body();

		if( options.sortable ) $table.addClass( 'sortable' ).sortTable();
		if( options.editable ) $table.addClass( 'editable' ).editTable({
			editor: $('<input class="editable-input">'),
			picker: $('<input class="color-picker editable-input">'),
			calendar: $('<input class="date-picker editable-input">'),
			offset: { 'width': 0, 'height': 0 },
		});

		$table.find( 'tr > th:first-child, tr > td:first-child' ).addClass( 'first' );
		$table.find( 'tr > th:last-child, tr > td:last-child' ).addClass( 'last' );

		return $table;
	}

// *****************************************************
// *	TABLE UTILITIES
// *****************************************************

	$.fn.getCell = function( col, row, body ){
		var cls = '.cell' + ( undefined === row || row === false || $.isNumeric( row ) ? '' : '.' + row ) + ( undefined === col || col === false || $.isNumeric( col ) ? '' : '.' + col );
		var data = ( $.isNumeric( row ) ? '[data-cell-row="' + row + '"]' : '') + ( $.isNumeric( col ) ? '[data-cell-column="' + col + '"]' : '');

		return $( $(this).find( ( body ? body : 'tbody ' ) + cls + data ) );
	}

	$.fn.pushRow = function( row, events ){
		var $tbody = this.find( 'tbody' ),
			$rows = $tbody.find('tr'),
			n = $rows.length,
			l = n-1,
			i = ( undefined === row || row < 0 ? l : row ),
			$tr = $( $rows[i] ).clone().data( 'table-row', n ).appendTo( $tbody ),
			c = $tr.length;
		$($rows[i]).removeClass('empty');
		$.each( $tr.find('td'), function( j, value ) {
			var $cell = $(this);
			$cell.data( 'cell', $cell.data( 'cell' ) + c ).data( 'cell-row', n ).text('');
			if( undefined !== events ){
				$.each( events, function( k, val ) {
					$cell.on( k, val );
				});
			}
		});
		return $tr;
	}

	$.fn.getRow = function( row, body ){
		return $( $(this).find( ( body ? body : 'tbody' ) + ( $.isNumeric( row ) ? ' [data-table-row="' + row + '"]' : ' tr.' + row ) ) );
	}


// *****************************************************
// *****************************************************


// *****************************************************
// *	SORTABLE TABLE
// *****************************************************

	var sortAsc = function (a, b) {
		if (a > b) return 1;
		if (a < b) return -1;
		return 0;
	};

	var sortDesc = function (a, b) {
		if (a > b) return -1;
		if (a < b) return 1;
		return 0;
	};

	var dateSortAsc = function (a, b) {
		var date1 = toDate(a);
		var date2 = toDate(b);
		return sortAsc( date1, date2 );
	};

	var dateSortDesc = function (a, b) {
		var date1 = toDate(a);
		var date2 = toDate(b);
		return sortDesc( date1, date2 );
	};

	var toDate = function(val) {
	    var date = val.split('-');
	    return new Date(date[2], date[1] - 1, date[0]).getTime();
	}

	$.fn.sortCells = function( format, opt ){
		var $cells = $(this),
			$tbody = $cells.parents('tbody'),
			time = ( format == 'date' || format == 'time' || format == 'timer' ),
			orig = !opt || opt === 'orig' || opt === 'original',
			order = $cells.sort(function(a, b) {
				var va = '';
				var vb = '';
				if( orig ){
					va = $(a).data('cell-row');
					vb = $(b).data('cell-row');
				}else{
					va = $(a).text();
					vb = $(b).text();
					if( va === '' ) return -1;
					if( vb === '' ) return 1;
					if( time ){
						if( opt != 'asc' ) return dateSortDesc(va,vb);
						return dateSortAsc(va,vb);
					}
				}

				if( format == 'int' || orig ){
					va = parseInt( va );
					vb = parseInt( vb );
				}else if( format == 'number' || format == 'float' ){
					va = parseFloat( va );
					vb = parseFloat( vb );
				}
				if( opt != 'asc' ) return sortDesc(va,vb);
				return sortAsc(va,vb);
			});

		$.each( order, function( index, row) {
			$tbody.find('tr[data-table-row="' + $(row).data('cell-row') + '"]').detach().prependTo($tbody);
		});
	}

	$.fn.sortColumn = function( head, by ){

		return this.each( function(){

			var $table = $(this),
				$column = head,
				format = ( by && by.length && by.data('column-format') ? by.data('column-format') : ( $column.data('column-format') ? $column.data('column-format') : 'string' ) ),
				column = ( by && by.length && by.data('cell-column') ? by.data('cell-column') : ( $column.data('cell-column') ? $column.data('cell-column') : 0 ) ),
				evt = $.Event( 'sort' );

			$column.siblings().removeClass( 'sort-down' ).removeClass( 'sort-up' );

			var $cells = $table.find( 'td[data-cell-column="' + column + '"]' );

			if( $column.hasClass( 'sort-up' ) ){

				$column.removeClass( 'sort-up' );
				$column.addClass( 'sort-down' );
				$cells.sortCells( format, 'desc' );

			}else if( $column.hasClass( 'sort-down' ) ){

				$column.removeClass( 'sort-down' );
				$cells.sortCells( format, 'orig' );

			}else{

				$column.addClass( 'sort-up' );
				$cells.sortCells( format, 'asc' );
			}

			$table.trigger( evt );
		});
	}

	$.fn.sortTable = function () {

		return this.each( function() {

			var $table = $(this),
				$heads = $table.find( 'thead tr.row-head th:not( [data-column-sort="false"] )' );

			if( $heads.length > 0 ){
				$heads.css( 'cursor', 'pointer' )
				.on( 'click', function( e ){
					var $head = $(this);
					
					var by = $head.data('column-sortby');
					if( by ) by = $table.find( 'th[data-column-name="' + by + '"]' );
					$table.sortColumn( $head, by );
				} );
			}
		});
	}

// *****************************************************
// *	EDITABLE TABLE
// *****************************************************


	var isValidDate = function( value, format ){
		var format = format || 'mm-dd-yyyy',
			delimiter = /[^mdy]/.exec(format)[0],
			theFormat = format.split(delimiter),
			theDate = value.split(delimiter),

		isDate = function (date, format) {
			var m, d, y
			for (var i = 0, len = format.length; i < len; i++) {
				if (/m/.test(format[i])) m = date[i]
				if (/d/.test(format[i])) d = date[i]
				if (/y/.test(format[i])) y = date[i]
			}
			return (
			m > 0 && m < 13 &&
			y && y.length === 4 &&
			d > 0 && d <= (new Date(y, m, 0)).getDate()
			);
		}

		return isDate(theDate, theFormat)

	}

	var validDate = function( val ){
		var curyear = (new Date).getFullYear().toString();
		var arr = val.split( '-' );

		if( arr.length < 2 ) return false;

		if( arr.length < 3 ){
			if( arr[1].length < 2 ) return false;
			arr.push( curyear );
		}

		if( arr.length == 3 ){
			if( !arr[2] ) arr[2] = curyear;
		}

		if( arr[2].length < 4 ) return false;
	
		if( $.Numeric( arr[0] ) > 31 ) arr[0] = '31';
		if( $.Numeric( arr[1] ) > 12 ) arr[1] = '12';
		if( arr[0].length < 2 ) arr[0] = '0' + arr[0];
		if( arr[1].length < 2 ) arr[1] = '0' + arr[1];
		if( arr[0].length > 2  ) arr[0] = arr[0].substring( 0, 2 );
		if( arr[1].length > 2  ) arr[1] = arr[1].substring( 0, 2 );
		if( arr[2].length > 4  ) arr[2] = arr[2].substring( 0, 4 );
		
		val = arr[0] + '-' + arr[1] + '-' + arr[2];
		if( !isValidDate( val, 'dd-mm-yyyy' ) ) return false;
		return val;
	}


	$.fn.validCell = function ( cell ) { // Add Format Validation
		if( !cell ) return this;
		var invert = cell instanceof jQuery;

		var $input = ( invert ? this : 0 ),
			val = ( invert ? $input.val() : cell ),
			$cell = ( invert ? cell : this ),
			format = ( $cell.data('cell-format') ? $cell.data('cell-format') : 'string' ),
			exception = ( $cell.data('cell-exception') ? $cell.data('cell-exception') : '' ),
			correct = $cell.data('cell-correct') !== false,
			decimal = parseInt( $cell.data( 'cell-decimal' ) ),
			evt = $.Event( 'validate' );

		switch( format ){
			case 'int':
			case 'number':
			case 'float':
				val = val.replace( exception, '' );
				val = $.Numeric( val );
			break;
			case 'date':
				val = validDate( val );
				if( correct ){
					if( val && $input ) $input.datepicker( 'setDate', val );
				}
			break;
		}

		$cell.trigger( evt, val );
	
		if( evt.result === false || val === false ){
			if( $input ) $input.addClass( 'error' );
			$cell.addClass( 'error' );
		}else{
			if( $input ) $input.removeClass( 'error' );
			$cell.removeClass( 'error' );
		}
		
		return this;
	}


	$.fn.editCell = function ( cell ) {
		if( !cell && cell !== 0 ) return this;
		var invert = cell instanceof jQuery;
		
		var $input = ( invert ? this : 0 ),
			$cell = ( $input ? cell : this ),
			format = ( $cell.data('cell-format') ? $cell.data('cell-format') : 'string' ),
			exception = ( $cell.data('cell-exception') ? $cell.data('cell-exception') : '' ),
			correct = $cell.data('cell-correct') !== false,
			auto = $cell.data('cell-auto') === true,
			decimal = parseInt( $cell.data( 'cell-decimal' ) ),
			val = ( $input ? $input.val() : cell.toString() ),
			evt = $.Event('change'),
			orig;

		// Text is the same || Validate Event returned Error = keeps original text
		if( $cell.text() === val.toString() || ( !correct && $cell.hasClass('error') ) ){
			if( $input ) $input.removeClass('error');
			return true;
		}

		// Autocorrect > Format = corrects value by format
		if( correct ){
			if( $input ) $input.removeClass('error');
			$cell.removeClass('error');
			if( auto || ( !auto && val !== '' ) ){
				switch( format ){
					case 'int':
					case 'number':
					case 'float':
						orig = val;
						val = val.substring(0, val.indexOf(exception));
						val = $.Numeric( val );
						if( val === false ) return true;
						val = parseFloat( val );
						if( format == 'int' ) val = Math.round( val );
						else if( decimal ) val = val.toFixed( decimal );
						val = orig;
					break;
					case 'date':
						val = validDate( val );
						if( !val ) return true;
					break;
				}
			}
		}
		
		// Change Event = back to original text if Event returned false
		orig = $cell.html();
		$cell.text( val.toString() ).trigger( evt, val );
		if( evt.result === false )
			$cell.html( orig );

		return this;
	}

	$.fn.editTable = function( opt ){

		'use strict';
		return this.each( function(){

			var defaultOptions = function () {
					var opts = $.extend({}, $.fn.editTable.defaults);
					opts.editor = opts.editor.clone();
					return opts;
				},
				options = $.extend( defaultOptions(), opt );
			
			var ARROW_LEFT = 37, ARROW_UP = 38, ARROW_RIGHT = 39, ARROW_DOWN = 40, ENTER = 13, ESC = 27, TAB = 9;

			var $this = $(this),
				$parent = $this.parent(),
				$input = options.editor.css( 'position', 'absolute' ).hide().appendTo( $parent ),
				$picker = options.picker.css( 'position', 'absolute' ).hide().appendTo( $parent ).iris(),
				$calendar = options.calendar
							.css( 'position', 'absolute' )
							.hide().appendTo( $parent )
							.datepicker({
								dateFormat: 'dd-mm-yy',
								constrainInput: false,
								onSelect: function(dateText) { $cell.editCell( dateText ); }
							}),
				inputs = [ $input, $picker, $calendar ],
				offset = options.offset,
				width = ( 'width' in offset ? offset.width : 0 ),
				height = ( 'height' in offset ? offset.height : 0 ),
				$cell, $temp,
				cmdKey = false,
				format = '';

			var hideEditor = function( input, cell, value ) {
				if( input && input.hasClass( 'active' ) ){
					if( cell ){
						if( undefined !== value )
							cell.editCell( value );
						else
							input.editCell( cell );
					}
					
					input.removeClass('active').hide();
				}
			}

			var showEditor = function( select ) {
					$cell = $this.find( 'td.edit:focus' );
					if( $cell.length ){
						$cell.removeClass('error');
						format = $cell.data( 'cell-format' );
						var name = $cell.data( 'column-name' );
						var list = ( $this.find( 'th[data-column-name="' + name + '"]' ).data( 'auto-complete' ) );
						
						$temp = ( format == 'color' ? $picker : ( format == 'date' ? $calendar : $input ) );
						if( format == 'date' )
							$temp.datepicker( 'setDate', $cell.text() );
						else
							$temp.val( $cell.text() );

						$temp
							.addClass('active')
							.show()
							.offset( $cell.offset() )
							.css( $cell.css( options.props ) )
							.width( $cell.width() + width )
							.height( $cell.height() + height );

						if( list ){
							
							var $cells = $this.find( 'td[data-column-name="' + name + '"]' ).not( $cell );
							var arr = [];
						    $cells.each(function() {
						        if ($.inArray($(this).text(), arr) == -1)
						            arr.push($(this).text());
						    });

						    $temp.autocomplete( {
						    	source: arr.sort(),
						    	appendTo: $parent,
						    	minLength: 0,
						    	select: function( event, ui ){
						    		if( ui.value )
							    		hideEditor( $temp, $cell, ui.value );
						    	},
							});
							$('.ui-autocomplete').css({'min-width':$temp.outerWidth()});
							$temp.autocomplete('enable');
							$temp.autocomplete( 'search', '' );
						}else if( $temp.autocomplete( 'instance' ) ){
							$temp.autocomplete('disable');
						}

						$temp.focus();

						if( select )
							$temp.select();

						var caret = $temp.getCursorPosition();
						$temp.data( 'caret-start', caret.start );
						$temp.data( 'caret-end', caret.end );

					}
				},
				checkCell = function( cell, keycode ){
					var arr = [];
					if( keycode ){
						if( keycode === ARROW_RIGHT )
							arr = ( !cmdKey ? cell.nextAll( 'td.edit:first' ) : cell.nextAll( 'td.edit:last' ) );
						else if(keycode === ARROW_LEFT)
							arr = ( !cmdKey ? cell.prevAll( 'td.edit:first' ) : cell.prevAll( 'td.edit:last' ) );
						else if(keycode === ARROW_UP)
							arr = ( !cmdKey ? cell.parent().prev().children().eq( cell.index() ) : cell.parent().prevAll( 'tr:last' ).children().eq( cell.index() ) );
						else if(keycode === ARROW_DOWN)
							arr = ( !cmdKey ? cell.parent().next().children().eq( cell.index() ) : cell.parent().nextAll( 'tr:last' ).children().eq( cell.index() ) );
						else if(keycode === true)
							arr = cell.filter( '.edit' );
						else
							return arr;
						return arr.filter( '.edit' );
					}

					return arr;
				};

			$.each( inputs, function( key, value ) {
				value
					.blur( function(e){
						hideEditor( value, $cell );
					})
					.keydown( function( e ){
						var caret = $temp.getCursorPosition();
						if( caret.start !== caret.end )
							value.data( 'caret-sel', 1 );
						else
							value.data( 'caret-sel', 0 );

						if( e.which === ENTER ){
							hideEditor( value, $cell );
							$cell.focus();
							e.preventDefault();
							e.stopPropagation();
						}else if( e.which === ESC ){
							value.val( $cell.text() );
							e.preventDefault();
							e.stopPropagation();
							hideEditor( value );
							$cell.focus();
						}else if( e.which === TAB ){
							$cell.focus();
						}
					})
					.keyup( function( e ){
						var old = value.data( 'caret-start' );
						
						var caret = $temp.getCursorPosition();
						value.data( 'caret-start', caret.start );
						value.data( 'caret-end', caret.end );
												
						if( !value.data( 'caret-sel' ) && ( old === caret.start || !value.val() ) ){
							var check = checkCell( $cell, e.which );
							if( check.length > 0 ){
								hideEditor( value, $cell );
								check.focus();
								e.preventDefault();
								e.stopPropagation();
							}
						}
					})
					.on( 'input paste', function(){
						value.validCell( $cell );
					});
			});

			$this.find( 'td' ).prop( 'tabindex', 1 ).addClass('edit');
			$this.find( '.no-edit' ).removeClass('edit');
			$this.on( 'click keypress dblclick', function( e ){
				showEditor( true );
			})
			.keydown( function( e ){
				if( e.which == 93 ) cmdKey = true;
				var prevent = true;
				var check = checkCell( $( e.target ), e.which );
				if( check.length > 0 ){
					check.focus();
				}else if( e.which === ENTER ){
					showEditor( true );
				}else if( e.keyCode == 46 || e.keyCode == 8 ){
					$this.find( 'td.edit:focus' ).text( '' );
				}else{
					prevent = false;
				}
				if( prevent ){
					e.stopPropagation();
					e.preventDefault();
				}
			}).keyup( function( e ){
				if( e.which == 93 ) cmdKey = false;
			});

			$( window ).on( 'resize', function () {
				$.each( inputs, function( key, value ) {
					if( value.is(':visible') ) {
						value.offset( $cell.offset() )
						.width( $cell.width() + width )
						.height( $cell.height() + height );
					}
				});
				
			});
		});

	};
	$.fn.editTable.defaults = {
		props: ['padding', 'padding-top', 'padding-bottom', 'padding-left', 'padding-right',
						  'text-align', 'font', 'font-size', 'font-family', 'font-weight',
						  'border-radius', 'border', 'border-top', 'border-bottom', 'border-left', 'border-right'],
		editor: $('<input>'),
		picker: $('<input class="color-picker">'),
		calendar: $('<input class="date-picker">'),
		offset: { 'width': 0, 'height': 0 },
	};


})( jQuery );
