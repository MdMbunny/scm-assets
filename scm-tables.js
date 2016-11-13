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
						
						$row.append( '<th class="' + cls + '"' + ' data-auto-complete="' + auto + '"' + ' data-column-name="' + key + '" data-column-format="' + format + '" data-column-exception="' + exception + '"' + ' data-column-decimal="' + decimal + '"' + ' data-column-sort="' + !nosort + '"' + ' data-column-edit="' + !noedit + '"' + ' data-cell="' + (row+1)*col + '" data-cell-row="' + row + '" data-cell-column="' + col + '" >' + icon + name + '</th>' );
						
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
		offset: { 'width': 1, 'height': 1 },
	});

	return $table;
}

// *****************************************************
// *	CELLS
// *****************************************************

$.fn.getCell = function( col, row, body ){
	var cls = '.cell' + ( undefined === row || row === false || $.isNumeric( row ) ? '' : '.' + row ) + ( undefined === col || col === false || $.isNumeric( col ) ? '' : '.' + col );
	var data = ( $.isNumeric( row ) ? '[data-cell-row="' + row + '"]' : '') + ( $.isNumeric( col ) ? '[data-cell-column="' + col + '"]' : '');

	return $( $(this).find( ( body ? body : 'tbody ' ) + cls + data ) );
}

$.fn.pushRow = function( row ){
	var $tbody = this.find( 'tbody' ),
		$rows = $tbody.find('tr'),
		n = $rows.length,
		l = n-1,
		i = ( undefined === row ? l : row ),
		$tr = $( $rows[i] ).clone().data( 'table-row', n ).appendTo( $tbody ),
		c = $tr.length;
	$($rows[i]).removeClass('empty');
	$.each( $tr.find('td'), function( j, value ) {
		$(this).data( 'cell', $(this).data( 'cell' ) + c ).data( 'cell-row', n ).text('');
	});
}

/*$.fn.addRow = function( row, opt, head ){
	var defaults = {
		noedit: [],
		auto: [],
		formats: [],
		decimals: [],
	};
	var options = $.extend( defaults, opt ),
		$tbody = this.find( 'tbody' ),
		i = ( undefined === row ? $tbody.find('tr').length : row ),
		$row = $( '<tr data-table-row="' + i + '"></tr>' ).appendTo( $tbody ),
		max = $( $tbody.find('tr')[0] ).find('td').length;

	for (var j = 0; j < max; j++) {
		var ind = ( undefined === head ? j : head[j] );
		var cls = ( $.isNumeric( ind ) ? '' : ind );
		var noedit = ( options.noedit.length && options.noedit[ind] );
		$row.append( '<td class="cell' + ( cls ? ' ' + cls : '' ) + ( noedit ? ' no-edit' : '' ) + '" data-cell="' + (i+1)*j + '" data-cell-row="' + i + '" data-cell-column="' + j + '" data-cell-format="' + ( options.formats[ind] ? options.formats[ind] : 'string' ) + '" data-cell-decimal="' + ( options.decimals[ind] ? options.decimals[ind] : 0 ) + ' data-cell-auto="' + ( options.auto[ind] ? options.auto[ind] : '' ) + '"></th>' );
	}
}*/

$.fn.getRow = function( row, body ){
	return $( $(this).find( ( body ? body : 'tbody ' ) + ( $.isNumeric( row ) ? '[data-table-row="' + row + '"]' : 'tr.' + row ) ) );
}

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

	$.fn.sortColumn = function () {

		return this.each( function() {

			var $this = $(this),
				$table = $this.parent().parent().parent(),
				$tbody = $table.find('tbody'),
				format = ( $this.data('column-format') ? $this.data('column-format') : 'string' ),
				time = ( format == 'date' || format == 'time' || format == 'timer' );
				decimal = ( $this.data('column-decimal') ? $this.data('column-decimal') : 0 ),
				column = ( $this.data('cell-column') ? $this.data('cell-column') : 0 ),
				sort = $this.data('column-sort') !== false,
				evt = $.Event( 'sort' );

			$this.siblings().removeClass( 'sort-down' ).removeClass( 'sort-up' );

			var $cells = $table.find( 'td[data-cell-column="' + column + '"]' );
			
			if( $this.hasClass( 'sort-down' ) ){
				$this.removeClass( 'sort-down' );
				$this.addClass( 'sort-up' );
				var order = $cells.sort(function(a, b) {
					var va = $(a).text();
					var vb = $(b).text();
					if( va === '' ) return 1;
					if( vb === '' ) return -1;
					if( time ) return dateSortAsc(va,vb);
					return sortAsc(va,vb);
					//return (va > vb) ? -1 : (va < vb) ? 1 : 0;
				});

				$.each( order, function( index, row) {
					
					if( !$(row).text() && $(row).text() !== 0 )
						$tbody.find('tr[data-table-row="' + $(row).data('cell-row') + '"]').remove().appendTo($tbody);
					else
						$tbody.find('tr[data-table-row="' + $(row).data('cell-row') + '"]').remove().prependTo($tbody);
				});

			}else if( $this.hasClass( 'sort-up' ) ){
				$this.removeClass( 'sort-up' );
				var order = $cells.sort(function(a, b) {
					var va = $(a).data('cell-row');
					var vb = $(b).data('cell-row');
					
					return sortDesc(va,vb);
				});
				$.each( order, function( index, row) {
					$tbody.find('tr[data-table-row="' + $(row).data('cell-row') + '"]').remove().prependTo($tbody);
				});

			}else{
				$this.addClass( 'sort-down' );
				var order = $cells.sort(function(a, b) {
					var va = $(a).text();
					var vb = $(b).text();
					if( va === '' ) return -1;
					if( vb === '' ) return 1;
					if( time ) return dateSortDesc(va,vb);
					return sortDesc(va,vb);
					//return (va < vb) ? -1 : (va > vb) ? 1 : 0;
				});
				$.each( order, function( index, row) {
					
					if( !$(row).text() && $(row).text() !== 0 )
						$tbody.find('tr[data-table-row="' + $(row).data('cell-row') + '"]').remove().appendTo($tbody);
					else
						$tbody.find('tr[data-table-row="' + $(row).data('cell-row') + '"]').remove().prependTo($tbody);
				});
			}
			$tbody.find('tr.empty').remove().appendTo($tbody);
			$table.trigger( evt );
		});
	}

	$.fn.sortTable = function () {

		return this.each( function() {

			var $this = $(this),
				$heads = $this.find( 'thead tr.row-head th:not( [data-column-sort="false"] )' );

			if( $heads.length > 0 ){
				$heads.css( 'cursor', 'pointer' )
				.on( 'click', function( e ){
					$(this).sortColumn();
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

		return this.each( function() {

			var $input = ( invert ? $(this) : 0 ),
				val = ( invert ? $input.val() : cell ),
				$cell = ( invert ? cell : $(this) ),
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
			
			//if( !correct ){				
				if( evt.result === false || val === false ){
					if( $input ) $input.addClass( 'error' );
					$cell.addClass( 'error' );
				}else{
					if( $input ) $input.removeClass( 'error' );
					$cell.removeClass( 'error' );
				}
			//}

		});
	}


	$.fn.editCell = function ( cell ) {
		if( !cell ) return this;
		var invert = cell instanceof jQuery;
		
		return this.each( function() {
		
			var $input = ( invert ? $(this) : 0 ),
				$cell = ( $input ? cell : $(this) ),
				format = ( $cell.data('cell-format') ? $cell.data('cell-format') : 'string' ),
				exception = ( $cell.data('cell-exception') ? $cell.data('cell-exception') : '' ),
				correct = $cell.data('cell-correct') !== false,
				auto = $cell.data('cell-auto') === true,
				decimal = parseInt( $cell.data( 'cell-decimal' ) ),
				val = ( $input ? $input.val() : cell ),
				evt = $.Event('change'),
				orig;
				//console.log(val);

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
							val = val.replace( exception, '' );
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
		});
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

						$temp.show()
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
						    		if( ui.value ){
							    		$cell.editCell( ui.value );
							    		$temp.hide();
							    	}
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
				value.blur( function(e){
					value.editCell( $cell );
					value.hide();
				}).keydown( function( e ){
					if( e.which === ENTER ){
						value.editCell( $cell );
						value.hide();
						$cell.focus();
						e.preventDefault();
						e.stopPropagation();
					}else if( e.which === ESC ){
						value.val( $cell.text() );
						e.preventDefault();
						e.stopPropagation();
						value.hide();
						$cell.focus();
					}else if( e.which === TAB ){
						$cell.focus();
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
				var prevent = true,
					check = checkCell( $( e.target ), e.which );
				if( check.length > 0 ){
					check.focus();
				}else if( e.which === ENTER ){
					showEditor( true );
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
